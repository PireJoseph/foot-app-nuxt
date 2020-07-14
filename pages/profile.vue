<template>
  <div>
    <PageTitle title="Profile" sub-title="Manage your account" />
    <section class="section">
      {{ user }}
    </section>
  </div>
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
