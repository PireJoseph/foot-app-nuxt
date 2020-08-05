<template>
  <!-- Invite modal -->
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Invite someone
      </p>
    </header>
    <div class="modal-card-body">
      <!-- username -->
      <b-field
        label="User"
        :type="{
          'is-danger': !!usernameErrorMessage,
          'is-success': !usernameErrorMessage && userSelected,
        }"
        :message="usernameErrorMessage"
      >
        <b-autocomplete
          id="invite-username-group-autocomplete"
          :data="users"
          placeholder="enter a username"
          field="username"
          :loading="usersAreFetching"
          @input="usernameErrorMessage = ''"
          @typing="getUsersData"
          @select="(option) => (userSelected = option)"
        >
        </b-autocomplete>
      </b-field>
      <b-field label="Message">
        <b-input v-model="message" maxlength="200" type="textarea"></b-input>
      </b-field>
      <div class="buttons">
        <b-button
          :disabled="!userSelected || !!usernameErrorMessage"
          type="is-primary"
          @click="sendInvitation"
          >Invite</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    group: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      users: [],
      usersAreFetching: false,
      userSelected: null,
      message: '',
      usernameErrorMessage: '',
    }
  },
  methods: {
    // get users data on autocomplete input
    getUsersData: debounce(function (username) {
      if (!username.length) {
        this.users = []
        return
      }
      this.usersAreFetching = true
      this.$axios
        .get('/users?username_contains=' + username)
        .then(({ data }) => {
          const currentUserId = this.$auth.user.id
          this.users = data.filter(this.filterOutUserById(currentUserId))
        })
        .catch((error) => {
          this.users = []
          throw error
        })
        .finally(() => {
          this.usersAreFetching = false
        })
    }, 500),
    // send a group invitation to a user
    async sendInvitation() {
      try {
        await this.$axios.post('/group-invitations', {
          group: this.group.id,
          recipient: this.userSelected.id,
          message: this.message,
        })
        this.$buefy.toast.open({
          message: 'Invitation sent successfully',
          type: 'is-success',
        })
        this.users = []
        this.userSelected = null
        document.getElementById('invite-username-group-autocomplete').value = ''
        this.message = ''
        this.usernameErrorMessage = ''
      } catch (error) {
        if (error.response.status !== 500) {
          this.usernameErrorMessage = this.getMessagefromError(error)
          this.$buefy.toast.open({
            message: this.getMessagefromError(error),
            type: 'is-danger',
          })
        }
      }
    },
    getMessagefromError(error) {
      if (error.response.status)
        return error.response.data.message[0].messages[0].id
    },
    // used to filter out current user from users array
    filterOutUserById(id) {
      return function (user) {
        return user.id !== id
      }
    },
  },
}
</script>
