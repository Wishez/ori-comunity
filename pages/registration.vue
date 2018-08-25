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
          <span v-if="isRegistered">
            {{ consultant.name }}, у тебя уже есть аккаунт. Мы можем напомнить тебе пароль, либо переходи к форме авторизации;).
          </span>
          <span v-else>
            {{ consultant.name }}, осталось совсем немного и мы зарегистрируем тебя;).
          </span>
        </p>
      </transition>
  
      <form 
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
              v-if="isPasswordShown" 
              v-model="password" 
              :error-messages="passwordsErrors"
              label="Пароль" 
              required 
              @input="$v.password.$touch()" 
              @blur="$v.password.$touch()" />
  
  
            <v-text-field 
              v-if="isPasswordShown" 
              v-model="repeatedPassword" 
              :error-messages="passwordsErrors"
              label="Повторите пароль" 
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
  
    </v-flex>
  
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between, sameAs } from "vuelidate/lib/validators";
import { defaultResponse } from "~/constants/response";
import { isSolidNumber } from "~/constants/validation";

export default {
  name: "RecoverPassword",

  mixins: [validationMixin],

  data: () => ({
    consultantNumber: "",

    password: "",

    repeatedPassword: "",

    registrationStep: 1,

    isPasswordShown: false,

    response: {
      ...defaultResponse
    },

    quantityAttemtsToCheckConsultantNumber: 0,
    isRegistered: false,

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

    password: {
      required,

      between: between(8, 25)
    },

    repeatedPassword: {
      sameAsPassword: sameAs("password")
    }
  },

  computed: {
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
        .then(data => data.body)
        .then(consultantInformation => {
          this.increaseQunatityAttemts();

          if (!consultantInformation.isConsultantExists) {
            const responseText = this.getResoponseText();
            this.setResponseMessage(responseText);
          } else {
            this.registrationStep = 2;
            this.setConsultantInformation(consultantInformation);

            if (!consultantInformation.isConsultantNotRegistered) {
              this.notifyAboutExistedAccount();
            }
          }
        });
    },

    setConsultantInformation(information) {
      this.consultant = {
        ...this.consultant,
        ...information
      };
      console.log(this.consultant.name, information.name);
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
