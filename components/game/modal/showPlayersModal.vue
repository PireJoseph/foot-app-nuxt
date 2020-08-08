<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Players
      </p>
      <div class="buttons">
        <b-button v-if="joinTeamABtnShown" @click="joinTeam('a')"
          >Join team A</b-button
        >
        <b-button v-if="joinTeamBBtnShown" @click="joinTeam('b')"
          >Join team B</b-button
        >
      </div>
    </header>
    <div class="modal-card-body">
      <div class="table-container">
        <b-table
          v-if="selectedGame"
          :data="selectedGamePlayers"
          :columns="playersTableColumns"
          :narrowed="true"
          :default-sort="['team', 'username']"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    game: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedGame: JSON.parse(JSON.stringify(this.game)),
      joinTeamABtnShown: true,
      joinTeamBBtnShown: true,
      playersTableColumns: [
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
        {
          field: 'team',
          label: 'team',
          sortable: true,
        },
      ],
    }
  },
  computed: {
    // player of the selected game modal
    selectedGamePlayers() {
      if (!this.selectedGame) {
        return []
      } else {
        const players = this.selectedGame.players.map((player) => {
          // add a team property to each users
          switch (true) {
            case this.selectedGame.teamAMembers.filter(
              (member) => member.id === player.id
            ).length > 0:
              player.team = 'a'
              break
            case this.selectedGame.teamBMembers.filter(
              (member) => member.id === player.id
            ).length > 0:
              player.team = 'b'
              break
            default:
              player.team = null
          }
          return player
        })
        return players
      }
    },
  },
  watch: {
    selectedGame: {
      handler(game) {
        this.computeJoinBtnVisibility(game)
      },
      deep: true,
    },
  },
  methods: {
    async joinTeam(letter) {
      const { data } = await this.$axios.put(
        '/games/' + this.selectedGame.id + '/join-team/',
        { team: letter }
      )
      this.selectedGame = data
      this.$buefy.toast.open({
        message: 'Team ' + letter.toUpperCase() + ' joined successfully!',
        type: 'is-success',
      })
    },
    computeJoinBtnVisibility(game) {
      const currentUserId = this.$auth.user.id
      console.log(this.$auth.loggedIn)
      console.log(currentUserId)
      this.joinTeamABtnShown =
        this.selectedGame &&
        this.selectedGame.teamAMembers.filter((member) => {
          return member.id === currentUserId
        }).length === 0
      this.joinTeamBBtnShown =
        this.selectedGame &&
        this.selectedGame.teamBMembers.filter((member) => {
          return member.id === currentUserId
        }).length === 0
    },
  },
  mounted() {
    this.computeJoinBtnVisibility(this.game)
  },
}
</script>
