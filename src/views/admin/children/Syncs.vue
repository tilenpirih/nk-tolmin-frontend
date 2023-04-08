<template>
  <v-layout justify-center class="pt-3">
    <v-flex xs12 sm10 md9 lg8 xl7>
      <div v-if="syncs">
        <v-layout class="mb-3" wrap>
          <v-flex xs12 sm6 md4 lg3 class="px-2 my-1">
            <v-btn block color="primary" @click="syncAllClubs()">Posodobi vse klube</v-btn>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 class="px-2 my-1">
            <v-btn block color="primary" @click="syncAllPlayers()">Posodobi vse igralce</v-btn>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 class="px-2 my-1">
            <v-btn block color="primary" @click="syncAllMatches()">Posodobi vse tekme</v-btn>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 class="px-2 my-1">
            <v-btn block color="primary" @click="syncAllScoreboards()">
              Posodobi vse rezultate
            </v-btn>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 class="px-2 my-1">
            <v-btn block color="primary" @click="syncAllStats()">Posodobi vso statistiko</v-btn>
          </v-flex>
        </v-layout>
        <v-pagination v-model="page" :length="pages"></v-pagination>
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Ime</th>
                <th class="text-left">Sporočilo</th>
                <th class="text-left">Ustvarjeno</th>
                <th class="text-left">Končano</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sync in syncs" :key="sync.id">
                <td>{{ sync.id }}</td>
                <td>{{ sync.name }}</td>
                <td>{{ sync.message }}</td>
                <td>
                  <span v-if="sync.created">
                    {{ formatDate(sync.created) }}
                  </span>
                </td>
                <td>
                  <span v-if="sync.finished">
                    {{ formatDate(sync.finished) }}
                  </span>
                </td>
                <td>
                  <v-chip
                    :class="{
                      success: sync.status === 'completed',
                      error: sync.status === 'failed',
                      warning: sync.status === 'executing',
                    }"
                  >
                    {{ sync.status }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import adminStore from '@/store/admin.js'
import { mdiSync, mdiPencil } from '@mdi/js'
import dayjs from 'dayjs'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  data: () => ({
    interval: null,
    page: 1,
    pages: null,
    syncs: null,
    mdiSync,
    mdiPencil,
  }),
  watch: {
    page() {
      this.getSyncs()
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    axios.get('syncs/1').then(({ data }) => {
      this.syncs = data.syncs
      this.page = data.page
      this.pages = data.pages
      console.log(data)
    })
    // this.interval = setInterval(() => this.getSyncs(), 3000)
    this.interval = window.setInterval(() => {
      this.getSyncs()
    }, 3000)
  },
  methods: {
    // saveSeason() {
    getSyncs() {
      axios.get(`syncs/${this.page}`).then(({ data }) => {
        this.syncs = data.syncs
        this.page = data.page
        this.pages = data.pages
        console.log(data)
      })
    },
    syncAllClubs() {
      axios.post('syncAllClubs').then(({ data }) => {
        console.log(data)
      })
    },
    syncAllPlayers() {
      axios.post('syncAllPlayers').then(({ data }) => {
        console.log(data)
      })
    },
    syncAllMatches() {
      axios.post('syncAllMatches').then(({ data }) => {
        console.log(data)
      })
    },
    syncAllScoreboards() {
      axios.post('syncAllScoreboards').then(({ data }) => {
        console.log(data)
      })
    },
    syncAllStats() {
      axios.post('syncAllStats').then(({ data }) => {
        console.log(data)
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
  },
}
</script>

<style lang="scss" scoped></style>
