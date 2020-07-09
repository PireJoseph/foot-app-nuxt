<template>
  <div>
    <section class="section">
      <h2 class="title has-text-grey">
        Register
      </h2>
    </section>
    <section>
      <form>
        <b-field label="Username">
          <b-input v-model="registration.username" maxlength="30"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input v-model="registration.email" type="email" maxlength="30">
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            v-model="registration.password"
            type="password"
            password-reveal
          >
          </b-input>
        </b-field>
        <div class="buttons">
          <b-button
            tag="input"
            value="Register"
            type="is-success"
            expanded
            :loading="loading"
            @click="register"
          />
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  auth: 'guest',
  // page component definitions
  data() {
    return {
      registration: {
        username: 'username',
        email: 'mail@provider.com',
        password: 'yourPassword',
      },
      errorMesssage: String,
      loading: false,
    }
  },
  methods: {
    async register() {
      this.loading = true
      try {
        delete axios.defaults.headers.common.Authorization
        const response = await axios.post(
          'http://localhost:1337/auth/local/register',
          this.registration
        )
        const user = response.data.user
        const token = response.data.jwt
        this.$auth.setToken('local', `Bearer ${token}`)
        this.$auth.setUser(user)
      } catch (err) {
        this.errorMesssage = 'registration failed'
      }
      this.loading = false
    },
  },
}
</script>
