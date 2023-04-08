<template>
  <v-layout v-if="match" justify-center class="pa-3">
    <v-flex v-if="match.finished_match" xs12 sm11 md8 lg6 xl5>
      <v-layout justify-center>
        <v-card class="pa-2">
          <div class="text-center">
            {{ match.match_num }}. krog | {{ match.location }} | {{ formatDate(match.match_date) }}
          </div>
          <v-divider class="my-2" />
          <v-layout class="px-2 mx-auto" style="max-width: 400px">
            <div style="max-width: 110px" class="text-center">
              <v-img
                v-if="match.home_team.original_logo_path"
                :src="baseUrl + match.home_team.original_logo_path"
                contain
              />
              <v-img v-else :src="noPhoto" contain />
              <h4 class="mt-2">{{ match.home_team.name }}</h4>
            </div>
            <v-layout justify-center align-center class="mx-5 primary--text text-no-wrap">
              <h1>{{ match.home_team_goals }} : {{ match.road_team_goals }}</h1>
            </v-layout>
            <div style="max-width: 110px" class="text-center">
              <v-img
                v-if="match.road_team.original_logo_path"
                :src="baseUrl + match.road_team.original_logo_path"
                contain
              />
              <v-img v-else :src="noPhoto" contain />
              <h4 class="mt-2">{{ match.road_team.name }}</h4>
            </div>
          </v-layout>
          <v-divider class="my-2" />
          <table>
            <tr>
              <td class="font-weight-bold">Sodniki:</td>
              <td>{{ match.referees }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Delegat:</td>
              <td>{{ match.delegat }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold pr-2 text-no-wrap">Št. gledalcev:</td>
              <td>{{ match.num_of_people }}</td>
            </tr>
          </table>
        </v-card>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 sm6 class="mt-4" :class="{ 'mt-8 pr-4': $vuetify.breakpoint.smAndUp }">
          <v-simple-table class="elevation-3" dense>
            <template #default>
              <thead>
                <th colspan="3" class="py-2">
                  {{ match.home_team.name }}
                </th>
              </thead>
              <tbody>
                <tr v-for="player in match.players.home_team.first" :key="player.num">
                  <td class="pr-2" style="width: 15px">{{ player.num }}</td>
                  <td>{{ player.full_name }}</td>
                  <td class="font-weight-bold">{{ player.special }}</td>
                </tr>
                <tr>
                  <td colspan="3" style="border: 0px" />
                </tr>
                <tr>
                  <td colspan="3" class="font-weight-bold">Rezervni igralci</td>
                </tr>
                <tr v-for="player in match.players.home_team.reserves" :key="player.num">
                  <td class="pr-2" style="width: 15px">{{ player.num }}</td>
                  <td>{{ player.full_name }}</td>
                  <td class="font-weight-bold">{{ player.special }}</td>
                </tr>
                <tr>
                  <td colspan="3" style="border: 0px" />
                </tr>
                <tr>
                  <td colspan="3" class="font-weight-bold">Trener</td>
                </tr>
                <tr>
                  <td colspan="3">{{ match.home_team_coach }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex>
        <v-flex xs12 sm6 class="mt-4" :class="{ 'mt-8 pl-4': $vuetify.breakpoint.smAndUp }">
          <v-simple-table class="elevation-3" dense>
            <template #default>
              <thead>
                <th colspan="3" class="py-2">
                  {{ match.road_team.name }}
                </th>
              </thead>
              <tbody>
                <tr v-for="player in match.players.road_team.first" :key="player.num">
                  <td class="pr-2" style="width: 15px">{{ player.num }}</td>
                  <td>{{ player.full_name }}</td>
                  <td class="font-weight-bold">{{ player.special }}</td>
                </tr>
                <tr>
                  <td colspan="3" style="border: 0px" />
                </tr>
                <tr>
                  <td colspan="3" class="font-weight-bold">Rezervni igralci</td>
                </tr>
                <tr v-for="player in match.players.road_team.reserves" :key="player.num">
                  <td class="pr-2" style="width: 15px">{{ player.num }}</td>
                  <td>{{ player.full_name }}</td>
                  <td class="font-weight-bold">{{ player.special }}</td>
                </tr>
                <tr>
                  <td colspan="3" style="border: 0px" />
                </tr>
                <tr>
                  <td colspan="3" class="font-weight-bold">Trener</td>
                </tr>
                <tr>
                  <td colspan="3">{{ match.road_team_coach }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex>
        <!-- goals -->
        <v-flex xs12 lg6 class="pt-5" :class="{ 'pr-4': $vuetify.breakpoint.lgAndUp }">
          <v-simple-table class="elevation-3" dense>
            <template #default>
              <thead>
                <th colspan="4" class="py-2">Zadetki</th>
              </thead>
              <tbody>
                <tr v-for="(score, index) in match.scores" :key="index">
                  <td style="width: 50px">
                    <v-img
                      v-if="match.home_team.club_id === score.club_id"
                      :src="baseUrl + match.home_team.small_logo_path"
                      contain
                      width="25"
                      height="25"
                    />
                    <v-img
                      v-if="match.road_team.club_id === score.club_id"
                      :src="baseUrl + match.road_team.small_logo_path"
                      contain
                      width="25"
                      height="25"
                    />
                  </td>
                  <td>{{ score.player_name }}</td>
                  <td>{{ score.minute }}'</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex>
        <!-- events -->
        <v-flex xs12 lg6 class="pt-5" :class="{ 'pl-4': $vuetify.breakpoint.lgAndUp }">
          <v-simple-table class="elevation-3" dense>
            <template #default>
              <thead>
                <th colspan="4" class="py-2">Dogodki</th>
              </thead>
              <tbody>
                <tr v-for="(event, index) in match.events" :key="index">
                  <td style="width: 50px">
                    <v-img
                      v-if="match.home_team.club_id === event.clubId"
                      :src="baseUrl + match.home_team.small_logo_path"
                      contain
                      width="25"
                      height="25"
                    />
                    <v-img
                      v-if="match.road_team.club_id === event.clubId"
                      :src="baseUrl + match.road_team.small_logo_path"
                      contain
                      width="25"
                      height="25"
                    />
                  </td>
                  <td style="width: 50px">
                    <v-icon v-if="event.event === 'change_player'" dense>
                      {{ mdiSwapVerticalBold }}
                    </v-icon>
                    <v-icon
                      v-if="event.event === 'yellow_card'"
                      dense
                      style="transform: rotate(90deg)"
                      color="yellow"
                    >
                      {{ mdiCard }}
                    </v-icon>
                    <v-icon
                      v-if="event.event === 'red_card'"
                      dense
                      style="transform: rotate(90deg)"
                      color="red"
                    >
                      {{ mdiCard }}
                    </v-icon>
                  </td>
                  <td>{{ event.event_text }}</td>
                  <td>{{ event.minute }}'</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-else xs12 sm11 md8 lg6 xl5>
      <v-layout justify-center>
        <v-card class="pa-2">
          <div class="text-center">
            {{ match.match_num }}. krog | {{ match.location }} | {{ formatDate(match.match_date) }}
          </div>
          <v-divider class="my-2" />
          <v-layout class="px-2 mx-auto" style="max-width: 400px">
            <div style="max-width: 110px" class="text-center">
              <v-img
                v-if="match.home_team.original_logo_path"
                :src="baseUrl + match.home_team.original_logo_path"
                contain
              />
              <v-img v-else :src="noPhoto" contain />
              <h4 class="mt-2">{{ match.home_team.name }}</h4>
            </div>
            <v-layout justify-center align-center class="mx-5 primary--text text-no-wrap">
              <h1>VS</h1>
            </v-layout>
            <div style="max-width: 110px" class="text-center">
              <v-img
                v-if="match.road_team.original_logo_path"
                :src="baseUrl + match.road_team.original_logo_path"
                contain
              />
              <v-img v-else :src="noPhoto" contain />
              <h4 class="mt-2">{{ match.road_team.name }}</h4>
            </div>
          </v-layout>
          <v-divider class="my-2" />
          <table>
            <tr>
              <td class="font-weight-bold pr-2">Sodniki:</td>
              <td>{{ match.referees }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold pr-2">Delegat:</td>
              <td>{{ match.delegat }}</td>
            </tr>
          </table>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import dayjs from 'dayjs'
import noPhoto from '@/assets/no_photo.png'
import { mdiSwapVerticalBold, mdiCard } from '@mdi/js'
import generalStore from '@/store/general.js'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  name: 'Match',
  data: () => ({
    match: null,
    noPhoto,
    baseUrl: process.env.VUE_APP_API_URL,
    mdiSwapVerticalBold,
    mdiCard,
  }),
  computed: {
    seasons() {
      const store = generalStore()
      return store.seasons
    },
  },
  mounted() {
    const { matchID } = this.$route.params
    axios
      .get(`/match/${matchID}`)
      .then((res) => {
        this.match = res.data
        const firstH = this.match.players.home_team.filter((player) => player.first_eleven === true)
        const nonH = this.match.players.home_team.filter((player) => player.first_eleven === false)
        const firstR = this.match.players.road_team.filter((player) => player.first_eleven === true)
        const nonR = this.match.players.road_team.filter((player) => player.first_eleven === false)
        this.match.players.home_team = { first: firstH, reserves: nonH }
        this.match.players.road_team = { first: firstR, reserves: nonR }
        console.log(this.match)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
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
  },
}
</script>

<style lang="scss" scoped>
tr:hover {
  background: none !important;
}
</style>
