<template>
  <v-layout justify-center class="pa-3 mb-3">
    <v-flex xs12 sm11 md8>
      <v-layout justify-space-between align-center wrap class="mb-3">
        <v-flex xs12 md6>
          <h2 class="primary--text mt-2">Statistika</h2>
        </v-flex>
        <v-flex xs12 md6>
          <v-select
            v-model="selectedSeason"
            :items="seasons"
            class="mt-4"
            :class="{ 'float-end': $vuetify.breakpoint.mdAndUp }"
            label="Izberi sezono"
            item-text="season_id"
            item-value="season_id"
            style="max-width: 200px"
            outlined
            hide-details
            @change="changeSeason"
          />
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="players"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        :header-props="headerProps"
      >
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import generalStore from '@/store/general.js'

export default {
  name: 'Statistics',
  data: () => ({
    players: [],
    selectedSeason: null,
    headerProps: {
      sortByText: 'Uredi po',
    },
    noPhoto,
    headers: [
      { text: 'Igralec', value: 'player' },
      { text: 'Nastopi', value: 'num_appearances' },
      { text: 'Minute', value: 'minutes' },
      { text: 'Rumeni kartoni', value: 'yellow_cards' },
      { text: 'Rdeči kartoni', value: 'red_cards' },
    ],
  }),
  computed: {
    seasons() {
      const store = generalStore()
      return store.seasons
    },
  },
  mounted() {
    this.selectedSeason = this.seasons[0].season_id
    const seasonParam = Number(this.$route.params.seasonID)
    if (Number.isInteger(seasonParam)) {
      this.seasons.some((season) => {
        if (season.season_id === seasonParam && season.statistics_link !== null) {
          this.selectedSeason = seasonParam
          return true
        }
        return false
      })
    }
    axios.get(`/getStatsFromSeason/${this.selectedSeason}`).then((res) => {
      this.players = res.data
      console.log(this.players)
    })
  },
  methods: {
    changeSeason(val) {
      this.$router.push({ path: `/clansko-mostvo/statistika/${val}` })
      axios.get(`/getStatsFromSeason/${this.selectedSeason}`).then((res) => {
        this.players = res.data
        console.log(this.players)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
