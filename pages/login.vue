<template>
  <v-layout 
    column 
    justify-center 
    align-center>    
    <v-flex 
      xs12 
      sm8 
      md6>
      <form>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Логин или e-mail"
          autocomplete="email"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        />
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :counter="50"
          label="Пароль"
          type="password"
          autocomplete="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />

        <v-btn @click="submit">Войти</v-btn>

        <v-btn 
          flat 
          to="/recover-password">Напомнить пароль</v-btn>
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
  email
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    username: "",
    password: ""
  }),
  validations: {
    username: { required, maxLength: maxLength(90), email },
    password: { required, minLength: minLength(6) }
  },
  computed: {
    usernameErrors() {
      const errors = [];

      if (!this.$v.username.$dirty) return errors;

      !this.$v.username.maxLength &&
        errors.push("Логин или e-mail не могут превышать 90 символов");
      !this.$v.username.required &&
        errors.push("Нам необходим ваше имя пользователя");

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.required &&
        errors.push("Пароль - это ключ к вашему аккаунту");

      return errors;
    }
  },

  methods: {
    submit() {
      if (this.username) {
        this.$store.state.user.userId = "1234";
        this.$store.state.user.username = this.username;
        this.$store.commit("user/setLoginState", true);
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
