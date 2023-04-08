<template>
  <v-layout justify-center class="pt-3">
    <v-flex v-if="loadedSponsors" xs12 sm10 md9 lg8 xl7>
      <h1 class="primary--text">Sponzorji</h1>
      <h2 class="mt-5">Glavni sponzorji</h2>
      <SponsorType :sponsors="allSponsors.main" />
      <h2 class="mt-5">Zlati sponzorji</h2>
      <SponsorType :sponsors="allSponsors.gold" />
      <h2 class="mt-5">Srebrni sponzorji</h2>
      <SponsorType :sponsors="allSponsors.silver" />
      <h2 class="mt-5">Ostali sponzorji</h2>
      <SponsorType :sponsors="allSponsors.other" />
    </v-flex>
  </v-layout>
</template>

<script>
import SponsorType from '@/components/SponsorType.vue'
import { mdiDelete } from '@mdi/js'

export default {
  components: { SponsorType },
  data: () => ({
    baseUrl: process.env.VUE_APP_API_URL,
    allSponsors: null,
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
}
</script>

<style lang="scss" scoped></style>
