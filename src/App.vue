<template>
  <v-app>
    <Snackbar />
    <NavBar />
    <v-main class="test">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import generalStore from '@/store/general.js'
import Snackbar from '@/components/Snackbar.vue'
import Footer from '@/components/Footer.vue'
// import adminStore from '@/store/admin.js'

export default {
  name: 'App',
  components: { NavBar, Snackbar, Footer },
  // components: { NavBar },
  data: () => ({}),
  // computed: {
  //   snackbar() {
  //     return generalStore().state.snackbar
  //   },
  // },
  created() {
    generalStore().getSeasons()
    // adminStore().isLoggedIn()
  },
}
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
