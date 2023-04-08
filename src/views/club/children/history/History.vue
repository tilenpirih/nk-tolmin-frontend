<template>
  <v-layout justify-center class="pa-3">
    <v-flex xs12 sm11 lg10 xl8>
      <v-layout></v-layout>
      <h2 class="primary--text mb-1">Zgodovina</h2>
      <!-- <router-view /> -->
      <v-btn color="primary" dark @click="$vuetify.goTo('#history19711995', options)"> 1971 </v-btn>
      <v-btn class="mx-3" color="primary" dark @click="$vuetify.goTo('#history19711995', options)">
        1995
      </v-btn>
      <v-btn color="primary" dark @click="$vuetify.goTo('#history19711995', options)">
        foto zgodovina
      </v-btn>
      <History19211971 />
      <History19711995 id="history19711995" />
    </v-flex>
  </v-layout>
</template>

<script>
import History19211971 from '@/views/club/children/history/children/History19211971.vue'
import History19711995 from '@/views/club/children/history/children/History19711995.vue'
import * as easings from 'vuetify/lib/services/goto/easing-patterns'

export default {
  name: 'History',
  components: { History19211971, History19711995 },
  data: () => ({
    baseUrl: window.location.origin,
    target: '#history19711995',
    options: {
      duration: 500,
      offset: 0,
      easing: easings.easeInOutCubic,
    },
  }),
  methods: {},
}
</script>
<style scoped lang="scss"></style>
