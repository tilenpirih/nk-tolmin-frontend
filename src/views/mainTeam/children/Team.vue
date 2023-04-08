<template>
  <v-layout justify-center class="pa-3">
    <v-flex xs12 sm11 md8>
      <v-layout justify-space-between align-center wrap class="mb-3">
        <v-flex xs12 md6>
          <h2 class="primary--text mt-2">Člansko moštvo - Ekipa</h2>
        </v-flex>
        <v-flex xs12 md6>
          <v-select
            v-model="selectedSeason"
            :items="teamSeasons"
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
      <div v-if="team.length !== 0">
        <PlayersGroup
          v-if="groupedTeam.goalkeeper"
          :players="groupedTeam.goalkeeper"
          group-name="Vratarji"
        />
        <PlayersGroup
          v-if="groupedTeam.defender"
          :players="groupedTeam.defender"
          group-name="Branilci"
        />
        <PlayersGroup
          v-if="groupedTeam.midfielder"
          :players="groupedTeam.midfielder"
          group-name="Vezisti"
        />
        <PlayersGroup
          v-if="groupedTeam.forward"
          :players="groupedTeam.forward"
          group-name="Napadalci"
        />
        <PlayersGroup v-if="groupedTeam.NA" :players="groupedTeam.NA" group-name="Ostali igralci" />
        <ListStaff :staff="staff" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import mainTeam from '@/assets/mainTeam.jpg'
import PlayersGroup from '@/views/mainTeam/children/components/PlayersGroup'
import ListStaff from '@/components/ListStaff.vue'
import generalStore from '@/store/general.js'

export default {
  name: 'Team',
  components: { PlayersGroup, ListStaff },
  data: () => ({
    mainTeam,
    selectedSeason: null,
    team: [],
    staff: [],
  }),
  computed: {
    seasons() {
      const store = generalStore()
      return store.seasons
    },
    teamSeasons() {
      return this.seasons.filter((season) => season.statistics_link !== null)
    },
    groupedTeam() {
      return this.team.reduce((acc, player) => {
        if (!acc[player.position]) {
          acc[player.position] = []
        }
        acc[player.position].push(player)
        return acc
      }, {})
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
    this.getTeam()
  },
  methods: {
    changeSeason(val) {
      this.$router.push({ path: `/clansko-mostvo/ekipa/${val}` })
      this.getTeam()
    },
    getTeam() {
      axios.get(`/getPlayersFromSeason/${this.selectedSeason}`).then((res) => {
        this.team = res.data
      })
      axios.get(`/staff/${this.selectedSeason}`).then((res) => {
        console.log(res.data)
        this.staff = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
