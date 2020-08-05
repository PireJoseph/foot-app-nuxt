<template>
  <div>
    <div class="content">Check invitations addressed to you</div>
    <ul v-if="invitations.length">
      <li v-for="invitation in notAnsweredInvitation" :key="invitation.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-grey">
              {{ invitation.group.name }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p><strong>Author </strong>: {{ invitation.source.username }}</p>
              <p v-if="invitation.message">
                <strong>Message</strong>: {{ invitation.message }}
              </p>
            </div>
            <div class="content">
              <b-button
                class="is-success"
                @click="acceptInvitation(invitation.id)"
                >Accept</b-button
              >
              <b-button
                class="is-danger"
                @click="declineInvitation(invitation.id)"
                >Decline</b-button
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="!notAnsweredInvitation.length">
      <b-message type="is-info" has-icon>
        Your have no pending group invitation
      </b-message>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invitations: [],
    }
  },
  computed: {
    notAnsweredInvitation() {
      return this.invitations.filter(
        (invitation) => invitation.isAnswered !== true
      )
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('group-invitations/received/')
    this.invitations = data
  },
  methods: {
    async acceptInvitation(invitationId) {
      const { data } = await this.$axios.put(
        'group-invitations/' + invitationId + '/accept/'
      )
      // remove the old invitation
      this.invitations = this.invitations.filter(
        (invitation) => invitation.id !== data.id
      )
      // replace by the update one
      this.invitations = [...this.invitations, data]
      this.$buefy.toast.open({
        message: 'invitation accepted successfuly',
        type: 'is-success',
      })
    },
    async declineInvitation(invitationId) {
      const { data } = await this.$axios.put(
        'group-invitations/' + invitationId + '/decline/'
      )
      // remove the old invitation
      this.invitations = this.invitations.filter(
        (invitation) => invitation.id !== data.id
      )
      // replace by the update one
      this.invitations = [...this.invitations, data]
      this.$buefy.toast.open({
        message: 'invitation declined successfuly',
        type: 'is-success',
      })
    },
  },
}
</script>
