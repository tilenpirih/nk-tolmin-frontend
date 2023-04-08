<template>
  <v-layout justify-center class="pt-3">
    <v-flex xs12 sm10 md9 lg8 xl7>
      <v-text-field v-model="search" outlined hide-details label="Išči klube po imenih" />
      <v-virtual-scroll :bench="3" :items="filterClubs" item-height="96" class="scroller mt-2">
        <template #default="{ item }">
          <div class="clubRow" @click="editClub(item.club_id)">
            <v-layout justify-center align-center>
              <div style="max-width: 78px" class="mr-2 my-2">
                <v-img
                  v-if="item.original_logo_path"
                  :src="baseUrl + item.original_logo_path"
                  contain
                />
                <v-img v-else :src="noPhoto" contain />
              </div>
              <v-layout justify-center align-center>
                <h3>{{ item.name }}</h3>
              </v-layout>
              <div class="pr-3">
                <v-btn small fab :to="`/admin/klubi/uredi/${item.club_id}`">
                  <v-icon>{{ mdiPencil }}</v-icon>
                </v-btn>
              </div>
            </v-layout>
          </div>
          <v-divider />
        </template>
      </v-virtual-scroll>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import { mdiPencil, mdiSync } from '@mdi/js'

export default {
  data: () => ({
    clubs: [],
    search: '',
    baseUrl: process.env.VUE_APP_API_URL,
    mdiPencil,
    mdiSync,
    noPhoto,
  }),
  computed: {
    filterClubs() {
      return this.clubs.filter((c) => c.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  mounted() {
    axios.get('/getAllClubs').then((response) => {
      this.clubs = response.data
      console.log(this.clubs)
    })
  },
  methods: {
    editClub(clubId) {
      this.$router.push(`/admin/klubi/uredi/${clubId}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.scroller {
  height: calc(100vh - 220px);
}
.clubRow:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
