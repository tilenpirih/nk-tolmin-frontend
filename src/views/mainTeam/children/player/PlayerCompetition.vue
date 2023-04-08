<template>
  <v-layout justify-center class="pa-3">
    <v-flex xs12 sm11 md10 lg9 xl8>
      <h2 class="primary--text">{{ competition.player_name }}</h2>

      <h3 class="primary--text mt-6">Tekme</h3>
      <v-data-table
        :headers="matchHeaders"
        :items="competition.matches"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        mobile-breakpoint="sm"
        :header-props="headerProps"
      >
        <!--TODO don't know if it's better to hide zeroes -->
        <!-- <template #[`item.yellow_cards`]="{ item }">
          <span v-if="item.yellow_cards !== 0">{{ item.yellow_cards }} </span>
        </template> -->
      </v-data-table>
      <h3 class="primary--text mt-6">Skupaj po tekmovanjih</h3>
      <v-data-table
        :headers="sumCompHeaders"
        :items="competition.sum_competitions"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        mobile-breakpoint="sm"
        :header-props="headerProps"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    competition: {},
    matchHeaders: [
      { text: '', value: 'competition_name' },
      { text: 'Krog', value: 'match_num' },
      { text: 'Tekma', value: 'match_name' },
      { text: 'Status', value: 'status' },
      { text: 'Goli', value: 'goals' },
      { text: 'Rumeni', value: 'yellow_cards' },
      { text: 'Rdeči', value: 'red_cards' },
      { text: 'Minute', value: 'minutes' },
      { text: 'Klub', value: 'club' },
    ],
    sumCompHeaders: [
      { text: 'Liga', value: 'league_name' },
      { text: 'Nastopi', value: 'num_performances' },
      { text: 'Goli', value: 'goals' },
      { text: 'Rumeni', value: 'yellow_cards' },
      { text: 'Rdeči', value: 'red_cards' },
      { text: 'Minute', value: 'minutes' },
    ],
    headerProps: {
      sortByText: 'Uredi po',
    },
  }),
  mounted() {
    axios
      .get('/getCompetition', {
        params: {
          player_id: this.$route.params.playerID,
          competition_id: this.$route.params.competitionID,
        },
      })
      .then((res) => {
        this.competition = res.data
      })
  },
  methods: {
    test() {
      console.log('test')
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep tr:hover {
  background: none !important;
}
</style>
