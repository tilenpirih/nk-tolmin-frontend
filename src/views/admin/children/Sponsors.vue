<template>
  <v-layout justify-center class="pt-3">
    <v-flex v-if="loadedSponsors" xs12 sm10 md9 lg8 xl7>
      <h1>Sponzorji</h1>
      <v-btn @click="addSponsorDialog = !addSponsorDialog">Dodaj sponzorja</v-btn>
      <v-dialog v-model="addSponsorDialog" width="500">
        <AddSponsor @updateSponsors="updateSponsors" />
      </v-dialog>
      <h2 class="mt-5">Glavni sponzorji</h2>
      <AdminSponsorType :sponsors="allSponsors.main" @updateSponsors="updateSponsors" />
      <h2 class="mt-5">Zlati sponzorji</h2>
      <AdminSponsorType :sponsors="allSponsors.gold" @updateSponsors="updateSponsors" />
      <h2 class="mt-5">Srebrni sponzorji</h2>
      <AdminSponsorType :sponsors="allSponsors.silver" @updateSponsors="updateSponsors" />
      <h2 class="mt-5">Ostali sponzorji</h2>
      <AdminSponsorType :sponsors="allSponsors.other" @updateSponsors="updateSponsors" />
    </v-flex>
  </v-layout>
</template>

<script>
import AddSponsor from '@/components/AddSponsor.vue'
import AdminSponsorType from '@/components/AdminSponsorType.vue'
import { mdiDelete } from '@mdi/js'

export default {
  components: { AddSponsor, AdminSponsorType },
  data: () => ({
    baseUrl: process.env.VUE_APP_API_URL,
    allSponsors: null,
    addSponsorDialog: false,
    loadedSponsors: false,
    mdiDelete,
  }),
  mounted() {
    axios
      .get('/sponsors')
      .then((res) => {
        this.allSponsors = res.data
        console.log(res.data)
      })
      .finally(() => {
        this.loadedSponsors = true
      })
  },
  methods: {
    deleteSponsor(id) {
      axios.post(`/deleteSponsor/${id}`).then((res) => {
        console.log(res.data)
        this.allSponsors = res.data
      })
    },
    updateSponsors(sponsors) {
      console.log(sponsors)
      this.allSponsors = sponsors
      this.addSponsorDialog = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
