<template>
  <div>
    <div class="content">Join a game</div>
    <ul v-if="games.length">
      <li v-for="game in games" :key="game.id">
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
              <b-button class="is-success" @click="join(game.id)"
                >Join</b-button
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <b-message type="is-danger" has-icon>
        There is no joinable game at this moment
      </b-message>
    </div>

    <!-- Players modal -->
    <b-modal
      :active.sync="isMemberModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <showPlayersModal
        :game="memberModalSelectedGame"
        :can-join-teams="false"
      />
    </b-modal>
  </div>
</template>
<script>
import showPlayersModal from '~/components/game/modal/ShowPlayersModal'

export default {
  components: {
    showPlayersModal,
  },
  data() {
    return {
      games: [],
      // member modal
      isMemberModalActive: false,
      memberModalSelectedGame: null,
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('/games/me/joinable')
    this.games = data
  },
  methods: {
    // open show members modal
    openShowMembersModal(id) {
      this.memberModalSelectedGame = this.games.filter(
        this.filterGameById(id)
      )[0]
      this.isMemberModalActive = true
    },
    // join the selected game
    async join(gameId) {
      const { data } = await this.$axios.put('/games/' + gameId + '/join')
      this.games = this.games.filter(this.filterOutGameById(data.id))
      this.$buefy.toast.open({
        message: 'Game joined successfully!',
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
    filterOutGameById(gameId) {
      return function (game) {
        return gameId !== game.id
      }
    },
  },
}
</script>
