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
          <NextGameTab />
        </b-tab-item>

        <!-- Create -->
        <b-tab-item label="Create"> </b-tab-item>

        <!-- Join -->
        <b-tab-item label="Join"> </b-tab-item>

        <!-- History -->
        <b-tab-item label="History"> </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import NextGameTab from '~/components/game/NextGameTab'

export default {
  components: {
    NextGameTab,
  },
  data() {
    return {
      activeTab: 0,
    }
  },
}
</script>
