<template>
  <div>
    <PageTitle title="Login" sub-title="Let's give us your credentials" />
    <section class="section">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <!-- Email field -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="email|min:8|max:30|required"
          >
            <b-field
              label="Email"
              :type="{
                'is-danger': errors[0],
                'is-success': errors.length,
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
                v-model="login.password"
                type="password"
                password-reveal
                maxlength="30"
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
                'is-danger': invalid,
                'is-success': !invalid,
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
        identifier: 'josephpire.dev@gmail.com',
        password: 'zryt2465',
      },
      errorMesssage: String,
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
