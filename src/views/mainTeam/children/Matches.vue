<template>
  <v-layout justify-center class="pa-3 mb-3">
    <v-flex xs12 sm11 md8>
      <v-layout justify-space-between align-center wrap class="mb-3">
        <v-flex xs12 md6>
          <h2 class="primary--text mt-2">Člansko moštvo - Tekme</h2>
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
        :headers="matchHeaders"
        :items="matches"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        locale="sl"
        :header-props="headerProps"
        @click:row="clickRow"
      >
        <template #[`item.match_date`]="{ item }">
          {{ formatDate(item.match_date) }}
        </template>
        <template #[`item.home_team.name`]="{ item }">
          <v-layout align-center justify-end>
            {{ item.home_team.name }}
            <v-img
              v-if="item.home_team.small_logo_path"
              :src="baseUrl + item.home_team.small_logo_path"
              class="ml-2"
              contain
              max-width="30"
            />
            <v-img v-else :src="noPhoto" contain class="ml-2" max-width="30" />
          </v-layout>
        </template>
        <template #[`item.score`]="{ item }">
          <span v-if="item.finished_match">
            <h3>{{ item.home_team_goals }} : {{ item.road_team_goals }}</h3>
          </span>
        </template>
        <template #[`item.road_team.name`]="{ item }">
          <v-layout v-if="$vuetify.breakpoint.xsOnly" align-center justify-end>
            {{ item.road_team.name }}
            <v-img
              v-if="item.road_team.small_logo_path"
              :src="baseUrl + item.road_team.small_logo_path"
              class="ml-2"
              contain
              max-width="30"
            />
            <v-img v-else :src="noPhoto" contain class="ml-2" max-width="30" />
          </v-layout>
          <v-layout v-else align-center>
            <v-img
              v-if="item.road_team.small_logo_path"
              :src="baseUrl + item.road_team.small_logo_path"
              class="mr-2"
              contain
              max-width="30"
            />
            <v-img v-else :src="noPhoto" contain class="mr-2" max-width="30" />
            {{ item.road_team.name }}
          </v-layout>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import dayjs from 'dayjs'
import noPhoto from '@/assets/no_photo.png'
import generalStore from '@/store/general.js'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  name: 'Matches',
  data: () => ({
    matches: [],
    selectedSeason: null,
    noPhoto,
    baseUrl: process.env.VUE_APP_API_URL,
    matchHeaders: [
      { text: 'Krog', value: 'match_num' },
      { text: 'Datum', value: 'match_date' },
      { text: 'Domači', value: 'home_team.name', align: 'end' },
      { text: 'Rezultat', value: 'score', align: 'center', sortable: false },
      { text: 'Gosti', value: 'road_team.name' },
    ],
    headerProps: {
      sortByText: 'Uredi po',
    },
  }),
  computed: {
    seasons() {
      return generalStore().seasons
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
    axios.get(`/matchesFromSeason/${this.selectedSeason}`).then((res) => {
      this.matches = res.data
      console.log(this.matches)
    })
  },
  methods: {
    changeSeason(val) {
      this.$router.push({ path: `/clansko-mostvo/tekme/${val}` })
      axios.get(`/matchesFromSeason/${this.selectedSeason}`).then((res) => {
        this.matches = res.data
        console.log(this.matches)
      })
    },
    formatDate(date) {
      dayjs.locale('sl')
      if (date.substring(date.length - 8) === '00:00:00') {
        return dayjs(date).format('D. M. YYYY')
      }
      return dayjs(date).calendar(null, {
        sameDay: '[Danes ob] HH:mm',
        nextDay: '[Jutri ob] HH:mm',
        nextWeek: 'dddd [ob] HH:mm',
        lastDay: '[Včeraj ob] HH:mm',
        lastWeek: 'D. M. YYYY [ob] HH:mm',
        sameElse: 'D. M. YYYY [ob] HH:mm',
      })
    },
    clickRow(row) {
      this.$router.push({ path: `/clansko-mostvo/tekma/${row.match_id}` })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep tr:hover {
  cursor: pointer;
}
</style>
