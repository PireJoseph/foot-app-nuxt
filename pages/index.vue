<template>
  <div>
    <PageTitle title="Home" sub-title="Welcome bud" />

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h3 class="subtitle is-5">
            The app that help you find players and organize epic football game
          </h3>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="columns is-desktop">
        <card title="Free" icon="currency-eur">
          Completely free
        </card>

        <card title="Responsive" icon="cellphone-link">
          Works on
          <b class="has-text-grey">
            Every
          </b>
          platform
        </card>

        <card title="Modern" icon="robot">
          Cutting edge web technologies
        </card>

        <card title="Lightweight" icon="feather">
          Wont burn your 3G data
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
