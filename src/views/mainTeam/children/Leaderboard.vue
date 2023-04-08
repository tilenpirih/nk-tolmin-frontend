<template>
  <v-layout justify-center class="pa-3 mb-3">
    <v-flex xs12 sm11 md8>
      <v-layout justify-space-between align-center wrap class="mb-3">
        <v-flex xs12 md6>
          <h2 class="primary--text mt-2">Člansko moštvo - lestvica</h2>
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
        :items="scoreboard"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        :header-props="headerProps"
      >
        <template #[`item.club_id.name`]="{ item }">
          <v-layout align-center>
            <v-img
              v-if="item.club_id.small_logo_path"
              :src="baseUrl + item.club_id.small_logo_path"
              class="mr-2"
              contain
              max-width="30"
            />
            <v-img v-else :src="noPhoto" contain class="mr-2" max-width="30" />
            {{ item.club_id.name }}
          </v-layout>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import generalStore from '@/store/general.js'

export default {
  name: 'Scoreboard',
  data: () => ({
    scoreboard: [],
    selectedSeason: null,
    noPhoto,
    baseUrl: process.env.VUE_APP_API_URL,
    headers: [
      { text: '', value: 'club_position' },
      { text: 'Klub', value: 'club_id.name' },
      { text: 'Odigranih', value: 'num_matches' },
      { text: 'Zmage', value: 'wins' },
      { text: 'Remiji', value: 'draws' },
      { text: 'Porazi', value: 'losses' },
      { text: 'Točk', value: 'points' },
    ],
    headerProps: {
      sortByText: 'Uredi po',
    },
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
    axios.get(`/getScoreboardFromSeason/${this.selectedSeason}`).then((res) => {
      this.scoreboard = res.data
      console.log(this.scoreboard)
    })
  },
  methods: {
    changeSeason(val) {
      this.$router.push({ path: `/clansko-mostvo/lestvica/${val}` })
      axios.get(`/getScoreboardFromSeason/${this.selectedSeason}`).then((res) => {
        this.scoreboard = res.data
        console.log(this.scoreboard)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
