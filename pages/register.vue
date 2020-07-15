<template>
  <div>
    <PageTitle title="Register" sub-title="Let's introduce yourself" />
    <section class="section">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- username -->
          <ValidationProvider v-slot="{ errors }" rules="min:8|max:30|required">
            <b-field
              label="Username"
              :type="{
                'is-danger': errors[0] || usernameErrorMesssage,
                'is-success': errors.length,
              }"
              :message="errors[0] || usernameErrorMesssage"
            >
              <b-input
                v-model="registration.username"
                maxlength="30"
                @input="usernameErrorMesssage = ''"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <!-- Email field -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="email|min:8|max:30|required"
          >
            <b-field
              label="Email"
              :type="{
                'is-danger': errors[0] || emailErrorMessage,
                'is-success': errors.length,
              }"
              :message="errors[0] || emailErrorMessage"
            >
              <b-input
                v-model="registration.email"
                type="email"
                maxlength="30"
                @input="emailErrorMessage = ''"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Password field -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="min:8|max:30|required"
            vid="password"
          >
            <b-field
              label="Password"
              :type="{
                'is-danger': errors[0],
                'is-success': errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="registration.password"
                type="password"
                password-reveal
                maxlength="30"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Confirm field -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="min:8|max:30|required|confirmed:password"
          >
            <b-field
              label="Confirm password"
              :type="{
                'is-danger': errors[0],
                'is-success': errors.length,
              }"
              :message="errors[0]"
            >
              <b-input
                v-model="passwordConfirmation"
                type="password"
                password-reveal
                maxlength="30"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- register button -->
          <div class="buttons">
            <b-button
              tag="input"
              value="Register"
              expanded
              :type="{
                'is-danger': invalid,
                'is-success': !invalid,
              }"
              :disabled="invalid"
              :loading="loading"
              @click="register"
            />
          </div>
        </form>
      </ValidationObserver>
    </section>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import axios from 'axios'

export default {
  auth: 'guest',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      registration: {
        username: 'username',
        email: 'mail@provider.com',
        password: 'yourPassword',
      },
      passwordConfirmation: 'yourPassword',
      usernameErrorMesssage: '',
      emailErrorMessage: '',
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    async register() {
      this.loading = true
      try {
        delete this.$axios.defaults.headers.common.Authorization
        const response = await this.$axios.post(
          '/auth/local/register',
          this.registration
        )
        const user = response.data.user
        const token = response.data.jwt
        this.$auth.setToken('local', `Bearer ${token}`)
        this.$auth.setUser(user)
      } catch (error) {
        if (error.response.status === 400) {
          switch (this.getMessagefromError(error).id) {
            case 'Auth.form.error.username.taken':
              this.usernameErrorMesssage = this.getMessagefromError(
                error
              ).message
              break
            case 'Auth.form.error.email.taken':
              this.emailErrorMessage = this.getMessagefromError(error).message
              break
          }
        } else {
          this.errorMesssage = 'unknow registration problem :c'
        }
      }
      this.loading = false
    },
    getMessagefromError(error) {
      return error.response.data.message[0].messages[0]
    },
  },
}
</script>
