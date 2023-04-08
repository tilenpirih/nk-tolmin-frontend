<template>
  <v-layout justify-center class="pa-3">
    <v-flex xs12 sm10 md9 lg8>
      <h2 class="primary--text">{{ player.full_name }}</h2>
      <div>Leto rojstva: {{ player.year_of_birth }}</div>
      <v-flex class="hidden-sm-and-up">
        <v-img
          v-if="player.img_path"
          :src="baseUrl + player.img_path"
          contain
          class="rounded mt-3"
        />
      </v-flex>
      <v-layout>
        <v-flex
          style="max-width: 200px"
          class="rounded align-center hidden-xs-only"
          align-self-center
        >
          <v-img v-if="player.img_path" :src="baseUrl + player.img_path" contain class="rounded" />
        </v-flex>
        <div v-if="player.description">
          <div class="mt-2" :class="{ 'ml-3': $vuetify.breakpoint.smAndUp }">
            {{ player.description }}
          </div>
        </div>
      </v-layout>

      <h3 class="primary--text mt-6">Statistika vseh odigranih tekem</h3>
      <v-data-table
        :headers="leagueHeaders"
        :items="player.league_statistic"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        @click:row="clickRow"
        :header-props="headerProps"
      ></v-data-table>
      <h3 class="primary--text mt-6">Skupaj po tekmovanjih</h3>
      <v-data-table
        :headers="sumCompHeaders"
        :items="player.sum_competitions"
        hide-default-footer
        disable-pagination
        disable-filtering
        class="elevation-3 mt-3"
        :header-props="headerProps"
      ></v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mdiArrowUp } from '@mdi/js'
import noPhoto from '@/assets/no_photo.png'

export default {
  name: 'Player',
  data: () => ({
    player: {},
    baseUrl: process.env.VUE_APP_API_URL,
    leagueHeaders: [
      { text: 'Liga', value: 'league_name' },
      { text: 'Nastopi', value: 'num_performances' },
      { text: 'Goli', value: 'goals' },
      { text: 'Rumeni', value: 'yellow_cards' },
      { text: 'Rdeči', value: 'red_cards' },
      { text: 'Minute', value: 'minutes' },
      { text: 'Klub', value: 'club' },
    ],
    sumCompHeaders: [
      { text: 'Liga', value: 'competition_name' },
      { text: 'Nastopi', value: 'num_performances' },
      { text: 'Goli', value: 'goals' },
      { text: 'Rumeni', value: 'yellow_cards' },
      { text: 'Rdeči', value: 'red_cards' },
      { text: 'Minute', value: 'minutes' },
    ],
    headerProps: {
      sortByText: 'Uredi po',
    },
    noPhoto,
    mdiArrowUp,
  }),
  mounted() {
    axios.get(`/getPlayer/${this.$route.params.playerID}`).then((res) => {
      this.player = res.data
    })
  },
  methods: {
    clickRow(item) {
      this.$router.push(
        `/clansko-mostvo/igralec/${this.player.player_id}/tekmovanje/${item.competition_id}`,
      )
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep tr:hover {
  cursor: pointer;
}
</style>
