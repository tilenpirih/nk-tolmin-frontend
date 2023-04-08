<template>
  <div>
    <v-app-bar app dark class="secondary" clipped-left style="z-index: 100">
      <v-app-bar-nav-icon class="ml-n2 mr-3 hidden-md-and-up" @click="drawer = true">
        <v-icon>
          {{ mdiMenu }}
        </v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-title class="mr-3 pl-0">
        <v-layout align-center>
          <v-img :src="grbTolmin" class="mr-2" width="40" height="40" contain />
          <span>NK Tolmin</span>
        </v-layout>
      </v-app-bar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-tabs ref="tabs" v-model="tabIndex" background-color="secondary">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <div v-for="tab in pages" :key="tab.route">
            <Tab v-if="tab.children" :tab="tab" />
            <v-tab v-else :to="tab.route" class="text-none">
              {{ tab.text }}
            </v-tab>
          </div>
        </v-tabs>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      class="secondary hidden-md-and-up"
      app
      clipped
      dark
      disable-resize-watcher
      style="padding-top: 56px; z-index: 99"
    >
      <v-list nav dense>
        <div v-for="page in pages" :key="page.text">
          <v-list-item v-if="!page.children" :to="page.route" class="v-list-item mb-1">
            <v-list-item-title>{{ page.text }}</v-list-item-title>
          </v-list-item>
          <Subgroup v-else :page="page" />
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiMenu, mdiMenuDown } from '@mdi/js'
import Tab from '@/components/Tab'
import Subgroup from '@/components/Subgroup'
import grbTolmin from '@/assets/grb_NK_Tolmin.png'

export default {
  components: { Tab, Subgroup },
  data: () => ({
    grbTolmin,
    mdiMenu,
    mdiMenuDown,
    drawer: false,
    tabIndex: 0,
    pages: [
      { text: 'Domov', route: '/', children: null },
      {
        text: 'Člansko moštvo',
        route: '/clansko-mostvo',
        children: [
          { text: 'Ekipa', route: '/clansko-mostvo/ekipa' },
          { text: 'Tekme', route: '/clansko-mostvo/tekme' },
          { text: 'Lestvica', route: '/clansko-mostvo/lestvica' },
          { text: 'Statistika', route: '/clansko-mostvo/statistika' },
        ],
      },
      {
        text: 'Mlajše selekcije',
        route: '/mlajse-selekcije',
        children: [
          {
            text: 'Vodstvo NŠ Hidria Tolmin in trenerji',
            route: '/mlajse-selekcije/vodstvo-in-trenerji',
          },
          { text: 'U7', route: '/mlajse-selekcije/U7' },
          { text: 'U9', route: '/mlajse-selekcije/U9' },
          { text: 'U11', route: '/mlajse-selekcije/U11' },
          { text: 'U13', route: '/mlajse-selekcije/U13' },
          { text: 'U15', route: '/mlajse-selekcije/U15' },
          { text: 'U17', route: '/mlajse-selekcije/U17' },
          { text: 'U19', route: '/mlajse-selekcije/U19' },
          {
            text: 'Aktivnosti in dokumenti',
            route: '/mlajse-selekcije/aktivnosti-in-dokumenti',
          },
          {
            text: 'Nogometni kamp',
            route: '/mlajse-selekcije/nogometni-kamp',
          },
        ],
      },
      {
        text: 'Klub',
        route: '/klub',
        children: [
          { text: 'Osnovni podatki', route: '/klub/osnovni-podatki' },
          { text: 'Članstvo', route: '/klub/clanstvo' },
          { text: 'Pravilniki', route: '/klub/pravilniki' },
          { text: 'Brajda', route: '/klub/brajda' },
          { text: 'Zgodovina', route: '/klub/zgodovina' },
          { text: 'Sponzorji', route: '/klub/sponzorji' },
          { text: 'Arhiv', route: '/klub/arhiv' },
          { text: 'Navijaški artikli', route: '/klub/navijaski-artikli' },
        ],
      },
    ],
  }),
  computed: {
    path() {
      const path = this.$route.path.split('/')[1]
      return path
    },
  },
  watch: {
    path: {
      handler() {
        if (this.path === 'clansko-mostvo') {
          this.tabIndex = 1
        } else if (this.path === 'mlajse-selekcije') {
          this.tabIndex = 2
        } else if (this.path === 'klub') {
          this.tabIndex = 3
        } else {
          this.tabIndex = 0
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-tabs-bar {
  height: 100% !important;
}
::v-deep .v-tab {
  height: 100% !important;
  padding: 0 !important;
}
</style>
