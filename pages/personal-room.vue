<template>
  <v-layout 
    column 
    justify-center 
    align-center>    
    <v-flex 
      xs12 
      sm8 
      md12>
      <h2 
        v-if="currentUsername" 
        class="mb-5">Добро пожаловать, {{ currentUsername }}!</h2>

      <form>
        <v-text-field
          :value="user.consultant_number"
          readonly
          label="Номер консультанта"
          type="text"
        />

        <v-text-field
          v-model="currentUsername"
          label="Ваш логин"
          readonly
        />

        <v-subheader>
          Изменить почту
        </v-subheader>

        <v-text-field
          v-model="user.email"
          label="Текущий Email"
          autocomplete="email"
          readonly=""
        />

        <v-text-field
          v-model="newEmail"
          :error-messages="newEmailErrors"
          label="Новый Email"
          autocomplete="email"
          required
          @input="touchNewEmail"
          @blur="$v.newEmail.$touch()"
        />

        <v-subheader>
          Изменить пароль
        </v-subheader>

        <v-text-field
          v-model="newPassword"
          :error-messages="passwordErrors"
          :counter="50"
          label="Новый пароль"
          type="password"
          @input="touchNewPassword"
          @blur="$v.newPassword.$touch()"
        />
        <v-text-field
          v-model="repeatedPassword"
          :error-messages="repeatedPasswordErrors"
          :counter="50"
          label="Повторите пароль"
          type="password"
          @input="touchRepeatedPassword"
          @blur="$v.repeatedPassword.$touch()"
        />
        
        <v-subheader>
          Введите ваш текущий пароль, чтобы принять изменения
        </v-subheader>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :counter="50"
          label="Ваш пароль"
          type="password"
          required
          @input="touchNewPassword"
          @blur="$v.newPassword.$touch()"
        />

        <v-btn 
          color="success" 
          class="mt-4 ml-0" 
          @click="submit">Сохранить</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import { setPageTitle } from "@/constants/helpers";
import { emailErrors } from "@/constants/validation";
import { handleRequest } from "@/constants/response";
const debounceDelay = 500;

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    newPassword: "",
    password: "",
    repeatedPassword: "",
    username: "",
    newEmail: "",
    avatar: ""
  }),
  validations: {
    newEmail: { required, email },
    username: { required, maxLength: maxLength(90) },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    repeatedPassword: {
      sameAsPassword: sameAs("newPassword")
    }
  },
  computed: {
    touchRepeatedPassword() {
      return this.$_.debounce(this.$v.repeatedPassword.$touch, debounceDelay);
    },

    touchNewPassword() {
      return this.$_.debounce(this.$v.newPassword.$touch, debounceDelay);
    },

    touchNewEmail() {
      return this.$_.debounce(this.$v.newEmail.$touch, debounceDelay);
    },

    user() {
      return this.$store.state.user;
    },
    userId() {
      return this.user.userId;
    },
    currentUsername() {
      return this.user.username;
    },

    passwordErrors() {
      const errors = [];

      if (!this.$v.newPassword.$dirty) return errors;

      if (this.newPassword === this.user.password) {
        errors.push("Новый пароль не может быть подобен текущему");
      }
      !this.$v.newPassword.required &&
        errors.push("Пароль - это ключ к вашему аккаунту");

      return errors;
    },

    repeatedPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatedPassword.$dirty) return errors;

      !this.$v.repeatedPassword.sameAsPassword &&
        errors.push("Пароли не совпадают");

      return errors;
    },

    newEmailErrors: emailErrors("newEmail")
  },

  beforeMount() {
    this.$nextTick(() => {
      this.email = this.user.email;
    });
  },
  created() {
    setPageTitle("Личный кабинет");
  },

  methods: {
    submit() {
      this.$store.commit("user/setLoginState", true);
    }
  }
};
</script>

<style lang="sass" scoped>
.v-subheader
  margin: 1em 0 -0.25em -5px
  padding: 0
</style>
