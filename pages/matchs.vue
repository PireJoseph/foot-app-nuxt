<template>
  <div>
    <PageTitle title="Matchs" sub-title="Things get real here!" />
    <section class="section">
      <b-tabs
        v-model="activeTab"
        :multiline="true"
        :expanded="true"
        :destroy-on-hide="true"
      >
        <!-- Next -->
        <b-tab-item label="Next">
          <NextGamesTab />
        </b-tab-item>

        <!-- Create -->
        <b-tab-item label="Create">
          <CreateGameTab />
        </b-tab-item>

        <!-- Join -->
        <b-tab-item label="Join">
          <JoinGameTab />
        </b-tab-item>

        <!-- History -->
        <b-tab-item label="History">
          <PastGamesTab />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import NextGamesTab from '~/components/game/NextGamesTab'
import CreateGameTab from '~/components/game/CreateGameTab'
import JoinGameTab from '~/components/game/JoinGameTab'
import PastGamesTab from '~/components/game/PastGamesTab'

export default {
  components: {
    NextGamesTab,
    CreateGameTab,
    JoinGameTab,
    PastGamesTab,
  },
  data() {
    return {
      activeTab: 0,
    }
  },
}
</script>
