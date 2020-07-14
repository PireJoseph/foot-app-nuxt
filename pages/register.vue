<template>
  <div>
    <PageTitle title="Register" />
    <section class="section">
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
        delete this.$axios.defaults.headers.common.Authorization
        const response = await this.$axios.post(
          '/auth/local/register',
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
