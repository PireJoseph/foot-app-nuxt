<template>
  <div>
    <PageTitle title="Login" sub-title="Let's give us your credentials" />
    <section class="section">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- Email field -->
          <ValidationProvider
            v-slot="{ errors }"
            immediate
            rules="email|min:8|max:30|required"
          >
            <b-field
              label="Email"
              :type="{
                'is-danger': errors.length || loginErrorMessage,
                'is-success': !errors.length && !loginErrorMessage,
              }"
              :message="errors[0]"
            >
              <b-input v-model="login.identifier" type="email" maxlength="30">
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- Password field -->
          <ValidationProvider
            v-slot="{ errors }"
            immediate
            rules="min:8|max:30|required"
            vid="password"
          >
            <b-field
              label="Password"
              :type="{
                'is-danger': errors.length || loginErrorMessage,
                'is-success': !errors.length && !loginErrorMessage,
              }"
              :message="errors[0] || loginErrorMessage"
            >
              <b-input
                v-model="login.password"
                type="password"
                password-reveal
                maxlength="30"
                @input="loginErrorMessage = ''"
              >
              </b-input>
            </b-field>
          </ValidationProvider>

          <!-- login button -->
          <div class="buttons">
            <b-button
              tag="input"
              expanded
              :type="{
                'is-danger': invalid || loginErrorMessage,
                'is-success': !invalid && !loginErrorMessage,
              }"
              value="Login"
              :disabled="invalid"
              :loading="loading"
              @click="userLogin"
            />
          </div>
        </form>
      </ValidationObserver>
    </section>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  auth: 'guest',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      login: {
        identifier: '',
        password: '',
      },
      errorMesssage: '',
      loginErrorMessage: '',
      loading: false,
    }
  },
  methods: {
    async userLogin() {
      this.loading = true
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        const user = response.data.user
        const token = response.data.jwt
        this.$auth.setUser(user)
        this.$auth.setToken('local', `Bearer ${token}`)
      } catch (err) {
        if (err.response.status === 400) {
          this.loginErrorMessage = 'Incorrect credentials'
        }
        this.errorMesssage = 'login failed'
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 2em;
}
</style>
