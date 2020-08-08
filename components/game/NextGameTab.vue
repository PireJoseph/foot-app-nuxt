<template>
  <div>
    <div class="content">Check your next matchs</div>
    <ul v-if="nextGames.length">
      <li v-for="game in nextGames" :key="game.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-grey">
              {{ game.startAt }}
            </p>
          </header>
          <div class="card-content">
            <div class="buttons">
              <b-button @click="openShowMembersModal(game.id)"
                >Show players</b-button
              >
              <b-button @click="openInviteByUsernameModal(game.id)"
                >Invite by username</b-button
              >
              <b-button @click="openInviteByGroupModal(game.id)"
                >Invite by group</b-button
              >
              <b-button class="is-danger" @click="leave(game.id)"
                >Leave</b-button
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <b-message type="is-danger" has-icon>
        You have no match planned yet
      </b-message>
    </div>

    <!-- Players modal -->
    <b-modal
      :active.sync="isMemberModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <showPlayersModal :game="memberModalSelectedGame" />
    </b-modal>

    <!-- Invite by username modal -->
    <b-modal
      :active.sync="isInviteByUsernameModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <inviteByUsernameModal :game="inviteByUsernameModalSelectedGame" />
    </b-modal>

    <!-- Invite by group modal -->
    <b-modal
      :active.sync="isInviteByGroupModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <inviteByGroupModal :game="inviteByGroupModalSelectedGame" />
    </b-modal>
  </div>
</template>

<script>
import showPlayersModal from '~/components/game/modal/showPlayersModal'
import inviteByUsernameModal from '~/components/game/modal/inviteByUsernameModal'
import inviteByGroupModal from '~/components/game/modal/inviteByGroupModal'

export default {
  components: {
    showPlayersModal,
    inviteByUsernameModal,
    inviteByGroupModal,
  },
  data() {
    return {
      // next
      nextGames: [],
      // member modal
      isMemberModalActive: false,
      memberModalSelectedGame: null,
      // invite by username modal
      isInviteByUsernameModalActive: false,
      inviteByUsernameModalSelectedGame: null,
      // invite by group modal
      isInviteByGroupModalActive: false,
      inviteByGroupModalSelectedGame: null,
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('/games/me/next')
    this.nextGames = data
  },
  methods: {
    // open show members modal
    openShowMembersModal(id) {
      this.memberModalSelectedGame = this.nextGames.filter(
        this.filterGameById(id)
      )[0]

      this.isMemberModalActive = true
    },
    // open invitation by username modal
    openInviteByUsernameModal(id) {
      // select the group
      const gameSelected = this.nextGames.filter(this.filterGameById(id))[0]
      this.inviteByUsernameModalSelectedGame = gameSelected
      this.isInviteByUsernameModalActive = true
    },
    // open invitation by group modal
    openInviteByGroupModal(id) {
      // select the group
      const gameSelected = this.nextGames.filter(this.filterGameById(id))[0]
      this.inviteByGroupModalSelectedGame = gameSelected
      this.isInviteByGroupModalActive = true
    },
    // leave the selected game
    async leave(id) {
      const gameSelected = this.nextGames.filter(this.filterGameById(id))[0]
      const { data } = await this.$axios.put(
        '/games/' + gameSelected.id + '/leave'
      )
      this.nextGames = this.nextGames.filter(this.filterOutGameById(data.id))
      this.$buefy.toast.open({
        message: 'Game left successfully',
        type: 'is-success',
      })
    },
    // used to filter game collection based on id
    filterGameById(id) {
      return function (game) {
        return game.id === id
      }
    },
    // used to filter out a game from a game collection based on id
    filterOutGameById(id) {
      return function (game) {
        return game.id !== id
      }
    },
  },
}
</script>
