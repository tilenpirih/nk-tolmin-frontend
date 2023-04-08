<template>
  <router-view v-if="seasons" />
</template>
<script>
import generalStore from '@/store/general.js'

export default {
  name: 'MainTeam',
  computed: {
    seasons() {
      const store = generalStore()
      return store.seasons
    },
  },
}
</script>
