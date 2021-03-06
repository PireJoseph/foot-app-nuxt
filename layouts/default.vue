<template>
  <div class="page-container">
    <section class="nav-container">
      <nav
        class="navbar header has-shadow is-black"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <div class="navbar-item">
            <h2>FoorApp</h2>
          </div>
          <div class="navbar-burger" @click="toggleMenu">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="mobile-navbar-menu"
          class="navbar-menu"
          :class="{ 'is-active': mobileMenuOpen }"
          @click="closeMenu"
        >
          <div class="navbar-start">
            <nuxt-link
              v-for="(item, key) of itemShown"
              :key="key"
              :to="item.to"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" />
              <span class="ml-2">{{ item.title }}</span>
            </nuxt-link>
          </div>
          <div v-if="$auth.loggedIn" class="navbar-end">
            <a class="navbar-item" @click="logout">
              <b-icon :icon="'logout'" />
              <span class="ml-2">Logout</span>
            </a>
          </div>
          <div v-if="!$auth.loggedIn" class="navbar-end">
            <nuxt-link
              :to="'register'"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon :icon="'account-plus-outline'" />
              <span class="ml-2">Register</span>
            </nuxt-link>
            <nuxt-link
              :to="'login'"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon :icon="'login'" />
              <span class="ml-2">Login</span>
            </nuxt-link>
          </div>
        </div>
      </nav>
    </section>

    <section class="main-content main-container">
      <main class="container">
        <nuxt />
      </main>
    </section>

    <section class="footer-container">
      <FooterPartial />
    </section>
  </div>
</template>

<script>
import FooterPartial from '~/layouts/partials/FooterPartial'

export default {
  components: {
    FooterPartial,
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
          guest: true,
        },
        {
          title: 'Profile',
          icon: 'card-account-details',
          to: { name: 'profile' },
          guest: false,
        },
        {
          title: 'Community',
          icon: 'account-group',
          to: { name: 'community' },
          guest: false,
        },
        {
          title: 'Matchs',
          icon: 'soccer',
          to: { name: 'matchs' },
          guest: false,
        },
      ],
      mobileMenuOpen: false,
    }
  },
  computed: {
    itemShown() {
      const userIsLogged = this.$auth.loggedIn
      function filterGuestItems(userIsLogged) {
        return function (e) {
          return e.guest || userIsLogged
        }
      }
      return this.items.filter(filterGuestItems(userIsLogged))
    },
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMenu() {
      this.mobileMenuOpen = false
    },
    logout() {
      this.$auth.logout()
      delete this.$axios.defaults.headers.common.Authorization
    },
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;

  .main-container {
    flex-grow: 1;
  }
}
.is-active {
  color: #7957d5 !important;
}
</style>
