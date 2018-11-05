<template>
  <v-layout 
    column 
    justify-center 
    align-center>
  
    <v-flex 
      class="registrationForm"
      xs12 
      sm8 
      md6>
      <transition name="fading">
        <p v-if="consultant.name">
          Привет, {{ consultant.name }}! 
          <span v-if="isRegistered && registrationStep !== 3">
            {{ consultant.name }}, у вас уже есть аккаунт. Мы можем напомнить вам пароль, либо переходите к форме авторизации;).
          </span>
          <span v-else>
            {{ consultant.name }}, осталось совсем немного и мы зарегистрируем вас;).
          </span>
        </p>
      </transition>

      <transition name="fading">
        <section v-if="isRegistered && registrationStep === 3">
          <h2><strong>{{ consultant.name }}, вы зарегистрировались!</strong></h2>
          <p>
            Теперь вы можете зайти в свой аккаунт с помощью вашего email адреса 
            <strong>({{ consultant.email }})</strong> или имени пользователя <strong>({{ username }})</strong>
          </p>

          <p><strong>{{ secondsUntilLogining }} секунд</strong> &mdash; время, через которое <strong>вы войдёте</strong> в свой аккаунт</p>
        </section>

        <form 
          v-else
          class="form" 
          @submit.prevent="submit">
  
          <v-text-field 
            v-model="consultantNumber" 
            :error-messages="consultantNumberErrors" 
            label="Номер консультанта" 
            required 
            @input="$v.consultantNumber.$touch()" 
            @blur="$v.consultantNumber.$touch()" />

          <transition name="fading">
            <div v-if="isPasswordShown && !isRegistered">
              <v-text-field 
                v-model="username" 
                :error-messages="usernameErrors"
                label="Имя пользователя" 
                required 
                @input="$v.username.$touch()" 
                @blur="$v.username.$touch()" />

              <v-text-field 
                v-model="password" 
                :error-messages="passwordsErrors"
                label="Пароль" 
                type="password"
                required 
                @input="$v.password.$touch()" 
                @blur="$v.password.$touch()" />
  
  
              <v-text-field
                v-model="repeatedPassword" 
                :error-messages="passwordsErrors"
                label="Повторите пароль" 
                type="password"
                required 
                @input="$v.repeatedPassword.$touch()" 
                @blur="$v.repeatedPassword.$touch()" />
  
            </div>
          </transition>
        
          <transition name="fading">
            <p 
              v-if="response.message" 
              :class="{
                'responseMessage': true,
                'error--text': response.message && (response.isError || !response.isSuccess),
                'info--text': response.message && response.isSuccess
            }">
              {{ response.message }}
            </p>
          </transition>
  
          <transition name="fading">
            <v-btn
              v-if="!isRegistered"
              :color="isPasswordShown ? 'success' : 'primary'"
              type="submit" 
              class="topOffset"
            >
              {{ isPasswordShown ? 'Зарегистрироваться' : 'Продолжить' }}
            </v-btn>

            <v-btn 
              v-else
              color="primary" 
              class="topOffset"
              flat
              to="/recover-password">Напомнить пароль</v-btn>
          </transition>

          <v-btn 
            flat 
            class="topOffset"
            color="primary" 
            to="/login">Войти</v-btn>
  
        </form>
      </transition>
  
    </v-flex>
  
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between, sameAs, maxLength } from "vuelidate/lib/validators";
import {
  defaultResponse,
  handleRequest,
  DEFAULT_ERROR_MESSAGE
} from "~/constants/response";
import { isSolidNumber } from "~/constants/validation";

export default {
  name: "RecoverPassword",

  mixins: [validationMixin],

  data: () => ({
    consultantNumber: "",
    password: "",
    username: "",
    repeatedPassword: "",
    registrationStep: 1,
    isPasswordShown: false,

    response: {
      ...defaultResponse
    },

    quantityAttemtsToCheckConsultantNumber: 0,
    isRegistered: false,
    secondsUntilLogining: 8,

    consultant: {
      isConsultantExists: false,
      name: ""
    }
  }),

  validations: {
    consultantNumber: {
      required,
      between: between(1, 25),
      isSolidNumber
    },
    username: { required, maxLength: maxLength(21) },
    password: { required, between: between(8, 25) },
    repeatedPassword: { sameAsPassword: sameAs("password") }
  },

  computed: {
    usernameErrors() {
      const errors = [];

      if (!this.$v.username.$dirty) return errors;

      !this.$v.username.maxLength &&
        errors.push("Логин не может превышать 21 символ");
      !this.$v.username.required &&
        errors.push("Нам необходимо ваше имя пользователя");

      return errors;
    },

    passwordsErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.required &&
        errors.push("Нужен пароль, чтобы защитить ваши данные.");

      return errors;
    },

    repeatedPasswordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.repeatedPassword.required &&
        errors.push("Проверьте, парвильный пароль");

      return errors;
    },

    consultantNumberErrors() {
      const errors = [];

      if (!this.$v.consultantNumber.$dirty) return errors;

      !this.$v.consultantNumber.isSolidNumber &&
        errors.push("Ваш номер должен состоять из огромного числа!");
      this.$v.consultantNumber.between &&
        errors.push("Ваш номер должен быть от 1 до 25 символов!");

      return errors;
    }
  },

  watch: {
    consultantNumber() {
      this.isPasswordShown = false;
      this.response = {
        ...defaultResponse
      };

      this.clearQuantityAttemts();
      this.clearResponseMessage();
    },

    registrationStep(nextStep) {
      if (nextStep === 2) {
        this.isPasswordShown = true;
      } else {
        this.isPasswordShown = false;
      }
    }
  },

  methods: {
    submit() {
      switch (this.registrationStep) {
        case 1: {
          this.submitConsultantNumber();
          break;
        }

        case 2: {
          this.registerConsultant();
          break;
        }
      }
    },

    submitConsultantNumber() {
      if (this.consultantNumber) {
        this.checkConsultantNumber();
      } else {
        this.setResponseMessage(
          "Нам нужен ваш номер, чтобы идентифицировать вас."
        );
      }
    },

    checkConsultantNumber() {
      this.$http
        .get(`consultant/${this.consultantNumber}`)
        .then(({ body }) => handleRequest(body))
        .then(({ payload, message }) => {
          this.increaseQunatityAttemts();

          const { isConsultantExists, isConsultantNotRegistered } =
            payload || {};
          if (!isConsultantExists) {
            const responseText = this.getResoponseText();
            this.setResponseMessage(responseText || message);
          } else {
            this.registrationStep = 2;
            this.setConsultantInformation(payload);

            if (!isConsultantNotRegistered) {
              this.notifyAboutExistedAccount();
            }
          }
        })
        .catch(() => this.showRequestError(DEFAULT_ERROR_MESSAGE));
    },

    setConsultantInformation(information) {
      this.consultant = {
        ...this.consultant,
        ...information
      };
    },

    notifyAboutExistedAccount() {
      this.isRegistered = true;
    },

    getResoponseText() {
      let responseText;

      switch (this.quantityAttemtsToCheckConsultantNumber) {
        case 1: {
          responseText = "Упс. Мы не смогли найти ваш номер.";
          break;
        }

        case 2: {
          responseText = "Вы точно уверенны, что такой номер существует?";
          break;
        }

        case 3: {
          responseText = "Возможно, вам стоит обратиться к вашему споснору?";
          break;
        }

        case 4: {
          responseText = "Вам определённо стоит сделать это!";
          break;
        }

        default:
      }

      return responseText;
    },

    increaseQunatityAttemts() {
      this.quantityAttemtsToCheckConsultantNumber += 1;
    },

    clearQuantityAttemts() {
      this.quantityAttemtsToCheckConsultantNumber = 0;
    },

    setResponseMessage(message) {
      this.response.message = message;
    },

    clearResponseMessage() {
      if (this.response.message) {
        this.setResponseMessage("");
      }
    },

    showRequestError(message = "При выполнение оперции произошла ошибка") {
      this.response.isError = true;
      this.setResponseMessage(message);
    },

    registerConsultant() {
      const { password, username, consultantNumber } = this;
      const payload = {
        password,
        username
      };

      this.$http
        .post(`register/${consultantNumber}/`, payload)
        .then(
          ({ body: { meta, data } }) =>
            meta.status === 200 ? data : this.showRequestError(meta.message)
        )
        .then(consultantInformation => {
          if (!consultantInformation) {
            this.showRequestError();
          } else {
            this.finishRegistration(consultantInformation);
          }
        })
        .catch(() => {
          this.showRequestError();
        });
    },

    finishRegistration(consultantInformation) {
      const { email } = consultantInformation;

      this.$set(this, "consultant", {
        ...this.consultant,
        email
      });
      this.isRegistered = true;
      this.registrationStep = 3;
      this.startTimerUntilLogining();
      this.login();
    },

    startTimerUntilLogining() {
      const delay = 1000;
      const maxSeconds = this.secondsUntilLogining;
      let lastTime;
      let passedSeconds = 0;
      const timer = () => {
        const delta = Date.now() - lastTime;
        if (delta >= delay || !lastTime) {
          if (passedSeconds < maxSeconds) {
            lastTime = Date.now();
            passedSeconds += 1;
            this.secondsUntilLogining -= 1;
          } else {
            this.$router.push({ path: "/" });
            return;
          }
        }

        requestAnimationFrame(timer);
      };

      requestAnimationFrame(timer);
    },

    login() {
      const { username, password } = this;

      this.$http
        .post("user/login", { username, password })
        .then(({ body }) => handleRequest(body))
        .then(({ payload, message }) => {
          if (payload) {
            this.$store.dispatch("user/login", payload);
          } else {
            this.showRequestError(message);
          }
        })
        .catch(() => this.showRequestError(DEFAULT_ERROR_MESSAGE));
    }
  }
};
</script>

<style lang="sass" scoped>
.registrationForm
  width: 400px

.topOffset
  margin-top: 2rem

.responseMessage
  margin-top: -1rem
</style>
