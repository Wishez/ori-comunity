<template>
  <v-layout column justify-center align-center>    
    <v-flex xs12 sm8 md12>
      <h2 v-if="currentUsername" class="mb-5">Добро пожаловать, {{ currentUsername }}!</h2>

      <form>
        <v-text-field
          :value="userId"
          readonly
          label="Номер консультанта"
          type="text"
        />

        <v-subheader>
          Изменить имя пользователя
        </v-subheader>

        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Новый логин"
          autocomplete="username"
          autofocus
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        />

        <v-subheader>
          Изменить почту
        </v-subheader>

        <v-text-field
          v-model="email"
          :error-messages="usernameErrors"
          label="Новый email"
          autocomplete="email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />

        <v-subheader>
          Изменить пароль
        </v-subheader>
        <v-text-field
          v-model="oldPassword"
          :error-messages="passwordErrors"
          :counter="50"
          label="Старый пароль"
          type="password"
          required
          @input="$v.oldPassword.$touch()"
          @blur="$v.oldPassword.$touch()"
        />
        <v-text-field
          v-model="newPassword"
          :error-messages="passwordErrors"
          :counter="50"
          label="Новый пароль"
          type="password"
          @input="$v.newPassword.$touch()"
          @blur="$v.newPassword.$touch()"
        />
        <v-text-field
          v-model="repeatedPassword"
          :error-messages="passwordErrors"
          :counter="50"
          label="Повторите пароль"
          type="password"
          @input="$v.repeatedPassword.$touch()"
          @blur="$v.repeatedPassword.$touch()"
        />
        

        <v-btn @click="submit">Сохранить</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate"
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators"

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    newPassword: "",
    oldPassword: "",
    repeatedPassword: "",
    username: "",
    email: "",
    avatar: ""
  }),
  validations: {
    username: { required, maxLength: maxLength(90), email },
    newPassword: { required, minLength: minLength(6) },
    repeatPassword: {
      sameAsPassword: sameAs("newPassword")
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    userId() {
      return this.user.userId
    },
    currentUsername() {
      return this.user.username
    },

    usernameErrors() {
      const errors = []

      if (!this.$v.username.$dirty) return errors

      !this.$v.username.maxLength &&
        errors.push("Логин или e-mail не могут превышать 90 символов")
      !this.$v.username.required &&
        errors.push("Нам необходим ваше имя пользователя")

      return errors
    },
    passwordErrors() {
      const errors = []

      if (!this.$v.newPassword.$dirty) return errors

      !this.$v.newPassword.required &&
        errors.push("Пароль - это ключ к вашему аккаунту")

      return errors
    }
  },

  beforeMount() {
    this.$nextTick(() => {
      this.email = this.user.email
    })
  },

  methods: {
    submit() {
      this.$store.commit("user/setLoginState", true)
      console.log("Submit")
    }
  }
}
</script>
