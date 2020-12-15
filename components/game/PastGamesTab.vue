<template>
  <div>
    <div class="content">Review past games</div>
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
              <b-button @click="openReviewModal(game.id)">Review</b-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <b-message type="is-danger" has-icon>
        There is no past games in your history
      </b-message>
    </div>

    <!-- Players modal -->
    <b-modal
      :active.sync="isMemberModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <ShowPlayersModal
        :game="memberModalSelectedGame"
        :can-join-teams="false"
      />
    </b-modal>

    <!-- Reveiw game modal -->
    <b-modal
      :active.sync="isReviewModalActive"
      aria-role="dialog"
      :has-modal-card="true"
    >
      <ReviewGameModal
        :game="reviewModalSelectedGame"
        @game-reviewed="onGameReview"
      />
    </b-modal>
  </div>
</template>
<script>
import ShowPlayersModal from '~/components/game/modal/ShowPlayersModal'
import ReviewGameModal from '~/components/game/modal/ReviewGameModal'

export default {
  components: {
    ShowPlayersModal,
    ReviewGameModal,
  },
  data() {
    return {
      games: [],
      // member modal
      isMemberModalActive: false,
      memberModalSelectedGame: null,
      // review modal
      isReviewModalActive: false,
      reviewModalSelectedGame: null,
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('/games/me/history')
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
    // open review game modal
    openReviewModal(id) {
      this.reviewModalSelectedGame = this.games.filter(
        this.filterGameById(id)
      )[0]
      this.isReviewModalActive = true
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
    // update past game collection on review from modal
    onGameReview(game) {
      this.games = this.games.filter(this.filterOutGameById(game.id))
      this.games = [...this.games, game]
      this.games.sort((a, b) => a.startAt > b.startAt)
      this.isReviewModalActive = false
      this.reviewModalSelectedGame = null
    },
  },
}
</script>
