<template>
  <v-layout justify-center class="pt-3">
    <v-flex xs12 sm11 md8>
      <v-layout justify-space-between align-center wrap class="mb-3">
        <v-flex xs12 md6>
          <h2 class="primary--text mt-2">Osebje</h2>
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
      <v-btn color="primary" @click="dialog = !dialog">Dodaj osebo</v-btn>
      <v-dialog v-model="dialog" width="500">
        <AddStaff :season-i-d="selectedSeason" @updateStaff="updateStaff" />
      </v-dialog>
      <ListStaffAdminVue
        :staff="staff"
        :season-i-d="selectedSeason"
        class="mt-3"
        @updateStaff="updateStaff"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import generalStore from '@/store/general.js'
import AddStaff from '@/components/AddStaff.vue'
import ListStaffAdminVue from '@/components/ListStaffAdmin.vue'

export default {
  components: { AddStaff, ListStaffAdminVue },
  data: () => ({
    staff: [],
    dialog: false,
    selectedSeason: 0,
    baseUrl: process.env.VUE_APP_API_URL,
    noPhoto,
  }),
  computed: {
    seasons() {
      const store = generalStore()
      return store.seasons
    },
    teamSeasons() {
      return this.seasons.filter((season) => season.statistics_link !== null)
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
    axios.get(`/staff/${this.selectedSeason}`).then((res) => {
      this.staff = res.data
    })
  },

  methods: {
    changeSeason(val) {
      this.$router.push({ path: `/admin/osebje/${val}` })
      axios.get(`/staff/${this.selectedSeason}`).then((res) => {
        this.staff = res.data
      })
    },
    updateStaff(staff) {
      this.staff = staff
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
