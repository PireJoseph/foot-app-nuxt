<template>
  <!-- Invite modal -->
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Invite by group
      </p>
    </header>
    <div class="modal-card-body">
      <!-- group name autocomplete -->
      <b-field label="Group">
        <b-autocomplete
          :data="groups"
          placeholder="group name"
          field="name"
          :loading="groupsAreFetching"
          @typing="getGroupsData"
          @select="(option) => (selectedGroup = option)"
        >
        </b-autocomplete>
      </b-field>

      <b-field v-if="selectedGroup" label="members">
        <b-table
          :data="selectedGroup.members"
          :columns="selectedGroupMembersColumns"
          :checked-rows.sync="selectedMembers"
          checkable
          :is-row-checkable="(row) => true"
        ></b-table>
      </b-field>

      <b-field v-if="selectedGroup">
        <button
          class="button field is-danger is-small"
          :disabled="!selectedMembers.length"
          @click="selectedMembers = []"
        >
          <b-icon icon="close"></b-icon>
          <span>Clear checked</span>
        </button>
      </b-field>

      <b-field label="Message">
        <b-input
          v-model="message"
          :disabled="!selectedGroup"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>

      <div class="buttons">
        <b-button
          type="is-primary"
          :disabled="!selectedMembers.length"
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
    game: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      groups: [],
      groupsAreFetching: false,
      selectedGroup: null,
      selectedGroupMembersColumns: [
        {
          field: 'username',
          label: 'user name',
        },
        {
          field: 'firstName',
          label: 'first name',
        },
        {
          field: 'lastName',
          label: 'last name',
        },
      ],
      selectedMembers: [],
      message: '',
    }
  },
  computed: {
    selectedMembersIds() {
      return this.selectedMembers.lenght
        ? this.selectedMembers.map((user) => user.id)
        : []
    },
  },
  methods: {
    // get groups data on input
    getGroupsData: debounce(function (name) {
      if (!name.length) {
        this.groups = []
        return
      }
      this.groupsAreFetching = true
      this.$axios
        .get('/groups?name_contains=' + name)
        .then(({ data }) => {
          this.groups = data
        })
        .catch((error) => {
          this.groups = []
          throw error
        })
        .finally(() => {
          this.groupsAreFetching = false
        })
    }, 500),
    // send a game invitation to a user
    async sendInvitation() {
      try {
        await this.$axios.post('/game-invitations/', {
          game: this.game.id,
          recipients: this.selectedMembersIds,
          message: this.message,
        })
        this.$buefy.toast.open({
          message: 'Invitation sent successfully',
          type: 'is-success',
        })
        this.selectedMembers = []
        this.message = ''
      } catch (error) {
        console.log(error)
        if (error.response.status !== 500) {
          this.$buefy.toast.open({
            message: error.response.data.message[0].messages[0].id,
            type: 'is-danger',
          })
        }
      }
    },
  },
}
</script>
