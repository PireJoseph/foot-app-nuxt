<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Profile"
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author:
      <a href="https://github.com/anteriovieira">
        {{ user }}
      </a>
    </h3>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData(context) {
    const token = context.app.$auth.getToken('local')
    axios.defaults.headers.common = { Authorization: `${token}` }
    const { data } = await axios.get(`http://localhost:1337/users/me`)
    return { user: data }
  },
}
</script>
