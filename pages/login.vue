<template>
  <div>
    <section class="section">
      <h2 class="title has-text-grey">
        Login
      </h2>
    </section>
    <section>
      <form>
        <b-field label="Email">
          <b-input v-model="login.identifier" type="email" maxlength="30">
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input v-model="login.password" type="password" password-reveal>
          </b-input>
        </b-field>
        <div class="buttons">
          <b-button
            tag="input"
            type="is-success"
            value="Login"
            expanded
            :loading="loading"
            @click="userLogin"
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
