<template>
  <v-layout justify-center class="mt-3">
    <v-flex xs12 sm11 md11 lg10 xl8>
      <v-layout justify-center wrap>
        <v-flex sm12 md6 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
          <h3 class="primary--text text-center">Rezultati preteklih tekem</h3>
          <v-carousel
            v-if="matches"
            v-model="prevMatchesIndex"
            hide-delimiters
            show-arrows-on-hover
            height="140px"
            :continuous="false"
          >
            <v-carousel-item v-for="match in matches.finished" :key="match.match_id">
              <v-layout justify-center align-center style="height: 100%" class="px-6">
                <v-flex>
                  <v-layout justify-end>
                    <div style="width: 100px">
                      <v-img
                        v-if="match.home_team.original_logo_path"
                        :src="baseUrl + match.home_team.original_logo_path"
                        contain
                      />
                      <v-img v-else :src="noPhoto" contain />
                    </div>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout justify-center>
                    <span class="font-weight-bold text-center alignCenter">
                      {{ match.home_team.name }}
                    </span>
                    <span class="font-weight-bold alignCenter"><pre> : </pre></span>
                    <span class="font-weight-bold text-center alignCenter">
                      {{ match.road_team.name }}
                    </span>
                  </v-layout>
                  <h2
                    class="text-center primary--text score my-n1"
                    @click.stop="goToMatch(match.match_id)"
                  >
                    {{ match.home_team_goals }} : {{ match.road_team_goals }}
                  </h2>
                  <div class="text-center">
                    <small>{{ match.match_date }}</small>
                  </div>
                </v-flex>
                <v-flex>
                  <v-layout justify-start>
                    <div style="width: 100px">
                      <v-img
                        v-if="match.road_team.original_logo_path"
                        :src="baseUrl + match.road_team.original_logo_path"
                        contain
                      />
                      <v-img v-else :src="noPhoto" contain />
                    </div>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex sm12 md6 :class="{ 'pl-3': $vuetify.breakpoint.mdAndUp }">
          <h3 class="primary--text text-center">Naslednja tekma</h3>
          <v-carousel
            v-if="matches"
            hide-delimiters
            show-arrows-on-hover
            height="140px"
            :continuous="false"
          >
            <v-carousel-item v-for="match in matches.unfinished" :key="match.match_id">
              <v-layout justify-center align-center style="height: 100%" class="px-6">
                <v-flex>
                  <v-layout justify-end>
                    <div style="width: 100px">
                      <v-img
                        v-if="match.home_team.original_logo_path"
                        :src="baseUrl + match.home_team.original_logo_path"
                        contain
                      />
                      <v-img v-else :src="noPhoto" contain />
                    </div>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout justify-center>
                    <span class="font-weight-bold text-center alignCenter">
                      {{ match.home_team.name }}
                    </span>
                    <span class="font-weight-bold alignCenter"><pre> : </pre></span>
                    <span class="font-weight-bold text-center alignCenter">
                      {{ match.road_team.name }}
                    </span>
                  </v-layout>
                  <div class="text-center mt-3">
                    <small class="text-center">
                      {{ match.location }}
                    </small>
                  </div>
                  <div class="text-center">
                    <small>{{ match.match_date }}</small>
                  </div>
                </v-flex>
                <v-flex>
                  <v-layout justify-start>
                    <div style="width: 100px">
                      <v-img
                        v-if="match.road_team.original_logo_path"
                        :src="baseUrl + match.road_team.original_logo_path"
                        contain
                      />
                      <v-img v-else :src="noPhoto" contain />
                    </div>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import dayjs from 'dayjs'
import noPhoto from '@/assets/no_photo.png'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  data: () => ({
    // TODO store matches in store
    matches: null,
    prevMatchesIndex: null,
    baseUrl: process.env.VUE_APP_API_URL,
    noPhoto,
  }),
  mounted() {
    axios.get('/matchesLastSeason').then((response) => {
      this.matches = response.data
      this.prevMatchesIndex = this.matches.finished.length - 1
      this.matches.finished.forEach((match) => {
        match.match_date = this.formatDate(match.match_date)
      })
      this.matches.unfinished.forEach((match) => {
        match.match_date = this.formatDate(match.match_date)
      })
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
    goToMatch(matchID) {
      this.$router.push({ name: 'match', params: { matchID } })
    },
  },
}
</script>

<style lang="scss" scoped>
.score {
  font-size: 2rem;
  cursor: pointer;
  transition: 0.5s;
}
.score:hover {
  // text-decoration: underline;
  transform: scale(1.1);
  transition: 0.5s;
}
// .overflowEllipsis {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
</style>
