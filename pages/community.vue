<template>
  <div>
    <PageTitle title="Community" sub-title="Only the bests" />
    <section class="section">
      <b-tabs
        v-model="activeTab"
        :multiline="true"
        :expanded="true"
        :destroy-on-hide="true"
      >
        <!-- Mine -->
        <b-tab-item label="Mine">
          <MyGroupTab />
        </b-tab-item>

        <!-- Create -->
        <b-tab-item label="Create">
          <CreateGroupTab />
        </b-tab-item>

        <!-- Join -->
        <b-tab-item label="Join">
          <JoinGroupTab />
        </b-tab-item>

        <!-- Invitations -->
        <b-tab-item label="Invitations">
          <InvitationsGroupTab />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
// import axios from 'axios'
import MyGroupTab from '~/components/community/MyGroupTab'
import CreateGroupTab from '~/components/community/CreateGroupTab'
import JoinGroupTab from '~/components/community/JoinGroupTab'
import InvitationsGroupTab from '~/components/community/InvitationsGroupTab'

export default {
  components: {
    MyGroupTab,
    CreateGroupTab,
    JoinGroupTab,
    InvitationsGroupTab,
  },
  async asyncData(context) {
    // const token = context.app.$auth.getToken('local')
    // axios.defaults.headers.common = { Authorization: `${token}` }
    // const { data } = await axios.get(context.env.API_BASE_URL + '/groups/me')
    // context.store.commit('community/setGroups', data)
  },
  data() {
    return {
      activeTab: 0,
    }
  },
}
</script>
