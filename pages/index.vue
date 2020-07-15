<template>
  <div>
    <PageTitle title="Home" :sub-title="getGreetingMessage()" />
    <section class="section">
      <div class="columns is-desktop">
        <card title="Free" icon="github">
          Open source on
          <a href="https://github.com/buefy/buefy">
            GitHub
          </a>
        </card>

        <card title="Responsive" icon="cellphone-link">
          <b class="has-text-grey">
            Every
          </b>
          component is responsive
        </card>

        <card title="Modern" icon="alert-decagram">
          Built with
          <a href="https://vuejs.org/">
            Vue.js
          </a>
          and
          <a href="http://bulma.io/">
            Bulma
          </a>
        </card>

        <card title="Lightweight" icon="arrange-bring-to-front">
          No other internal dependency
        </card>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '~/components/Card'
import PageTitle from '~/components/PageTitle'

export default {
  auth: 'guest',
  name: 'HomePage',

  components: {
    Card,
    PageTitle,
  },
  methods: {
    getGreetingMessage() {
      const usernameOrNull = this.$auth?.user?.username
      return usernameOrNull
        ? 'Welcome ' +
            usernameOrNull.charAt(0).toUpperCase() +
            usernameOrNull.slice(1) +
            ' !'
        : usernameOrNull
    },
  },
}
</script>
