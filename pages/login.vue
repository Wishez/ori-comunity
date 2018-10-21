<template>
  <v-layout 
    column 
    justify-center 
    align-center>    
    <v-flex 
      xs12 
      sm8 
      md6>
      <form 
        class="form baseVerticalOffsets" 
        @submit.prevent="submit">
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

        <div class="parent wrap row h-between margin-top_11">
          <v-btn 
            type="submit"
            color="success"
          >
            Войти
          </v-btn>

          <v-btn 
            color="primary"
            flat
            to="/registration"
          >
            Первый раз на сайте
          </v-btn>
          
          <v-btn 
            class="margin_centered"
            flat 
            to="/recover-password"
          >
            Напомнить пароль
          </v-btn>
        </div>
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
import { setPageTitle } from "@/constants/helpers";

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
        errors.push("Нам необходимо ваше имя пользователя");

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

  created() {
    setPageTitle("Страница входа");
  },

  methods: {
    submit() {
      const { username, password } = this;

      this.$http
        .post("user/login", { username, password })
        .then(
          ({ body: { meta, data } }) => (meta.status === "OK" ? data : false)
        )
        .then(userData => {
          if (userData) {
            console.log(userData);
            this.$store.dispatch("user/login", userData);
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          console.log(`Not logged. ${error}`);
        });
    }
  }
};
</script>
