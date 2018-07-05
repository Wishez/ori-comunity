<template>
  <v-layout column justify-center align-center>    
    <v-flex xs12 sm8 md6>
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Email"
          autocomplete="email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />

        <v-btn @click="submit">Восстановить</v-btn>
        <v-btn flat to="/login">Войти</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"

export default {
  name: "RecoverPassword",
  mixins: [validationMixin],
  data: () => ({
    email: ""
  }),
  validations: {
    email: { required, email }
  },

  computed: {
    emailErrors() {
      const errors = []

      if (!this.$v.email.$dirty) return errors

      !this.$v.email.email && errors.push("Введите E-mail правильного формата")
      !this.$v.email.required &&
        errors.push("E-mail требуется для восстановления пароля")

      return errors
    }
  },

  methods: {
    submit() {
      console.log("Submit")
    }
  }
}
</script>
