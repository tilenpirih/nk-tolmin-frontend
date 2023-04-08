<template>
  <v-layout justify-center class="pa-3">
    <v-flex xs12 sm10 md9 lg8 xl7>
      <h2 class="primary--text mb-1">Mlajše selekcije - U17</h2>
      <v-img
        v-if="youngerTeamData"
        :src="baseUrl + youngerTeamData.original_group_photo"
        :lazy-src="baseUrl + youngerTeamData.lazy_group_photo"
      />
      <h2 class="primary--text mt-5">Dogodki</h2>
      <Calendar category="U17" />
      <div v-if="youngerTeamData" v-html="youngerTeamData.content" />
    </v-flex>
  </v-layout>
</template>

<script>
import Calendar from '@/views/youngerTeams/components/Calendar.vue'

export default {
  name: 'U17',
  components: { Calendar },
  data: () => ({
    youngerTeamData: null,
    baseUrl: process.env.VUE_APP_API_URL,
  }),
  mounted() {
    axios.get('/getYoungerTeam/U17').then((res) => {
      this.youngerTeamData = res.data
    })
  },
}
</script>
