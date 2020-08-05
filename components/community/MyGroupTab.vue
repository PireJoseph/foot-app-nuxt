<template>
  <div>
    <div class="content">See and manage groups you are member of</div>
    <ul v-if="groups.length">
      <li v-for="group in groups" :key="group.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-grey">
              {{ group.name }}
            </p>
          </header>
          <div class="card-content">
            <div class="buttons">
              <b-button @click="openShowMembersModal(group.id)"
                >Show members</b-button
              >
              <b-button @click="openInvitationModal(group.id)"
                >Invite someone</b-button
              >
              <b-button class="is-danger" @click="leave(group.id)"
                >Leave</b-button
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <b-message type="is-danger" has-icon>
        Your are not listed in any group yet
      </b-message>
    </div>

    <!-- Members modal -->
    <b-modal
      :active.sync="isMemberModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <showMembersModal :group="memberModalSelectedGroup" />
    </b-modal>

    <!-- Invite modal -->
    <b-modal
      :active.sync="isInviteModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <inviteByUsernameModal :group="inviteModalSelectedGroup" />
    </b-modal>
  </div>
</template>

<script>
import showMembersModal from '~/components/community/modal/showMembersModal'
import inviteByUsernameModal from '~/components/community/modal/inviteByUsernameModal'

export default {
  components: {
    showMembersModal,
    inviteByUsernameModal,
  },
  data() {
    return {
      // user groups
      groups: [],
      // member modal
      isMemberModalActive: false,
      memberModalSelectedGroup: null,
      // invite modal
      isInviteModalActive: false,
      inviteModalSelectedGroup: null,
    }
  },
  computed: {
    // user that belongs in the invite autocomplete
    inviteUserAutocompleteData() {
      return this.invitableUsers.filter((user) => {
        // filter username not matching autocomplete
        return user.username
          .toLowerCase()
          .includes(this.invitationUsername.toLowerCase())
      })
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('/groups/me')
    this.groups = data
  },
  methods: {
    // open show members modal
    openShowMembersModal(id) {
      this.memberModalSelectedGroup = this.groups.filter(
        this.filterGroupById(id)
      )[0]
      this.isMemberModalActive = true
    },
    // open invitation modal
    openInvitationModal(id) {
      // select the group
      this.inviteModalSelectedGroup = this.groups.filter(
        this.filterGroupById(id)
      )[0]
      this.isInviteModalActive = true
    },
    // leave a group
    async leave(id) {
      const { data } = await this.$axios.put('/groups/' + id + '/leave')
      this.groups = this.groups.filter(this.filterOutGroupById(data.id))
      this.$buefy.toast.open({
        message: 'Group left successfully',
        type: 'is-success',
      })
    },
    // used to filter get group on the collection based on its id
    filterGroupById(id) {
      return function (group) {
        return group.id === id
      }
    },
    filterOutGroupById(id) {
      return function (group) {
        return group.id !== id
      }
    },
  },
}
</script>
