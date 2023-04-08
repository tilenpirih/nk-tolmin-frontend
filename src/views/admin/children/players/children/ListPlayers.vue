<template>
  <v-layout justify-center class="pt-3">
    <v-flex xs12 sm10 md9 lg8 xl7>
      <v-text-field
        v-model="search"
        outlined
        hide-details
        label="Išči igralce po imenih, priimkih"
      ></v-text-field>
      <v-virtual-scroll :bench="3" :items="filterPlayers" item-height="96" class="scroller mt-2">
        <template #default="{ item }">
          <v-layout>
            <div class="mr-2 my-2">
              <v-avatar size="78" tile>
                <!-- <v-img :src="baseUrl + item.img_path || noPhoto" /> -->
                <v-img v-if="item.img_path" :src="baseUrl + item.img_path" contain />
                <v-img v-else :src="noPhoto" contain max-height="78" />
              </v-avatar>
            </div>
            <div class="pt-2">
              <b>{{ item.full_name }}</b>
              <div class="description pr-2">
                {{ item.description }}
              </div>
            </div>
            <div class="ml-auto my-auto pr-3">
              <div class="mb-1">
                <v-btn small fab @click.stop="syncPlayer(item.player_id)">
                  <v-icon>{{ mdiSync }}</v-icon>
                </v-btn>
              </div>
              <div class="mt-1">
                <v-btn small fab :to="`/admin/igralci/uredi/${item.player_id}`">
                  <v-icon>{{ mdiPencil }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-layout>
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
  name: 'ListPlayers',
  data: () => ({
    players: [],
    search: '',
    noPhoto,
    mdiPencil,
    mdiSync,
    baseUrl: process.env.VUE_APP_API_URL,
  }),
  computed: {
    filterPlayers() {
      return this.players.filter((player) => {
        if (
          player.full_name.toLowerCase().includes(this.search.toLowerCase()) ||
          player.player_id.toString().includes(this.search)
        ) {
          return true
        }

        return false
      })
    },
  },
  mounted() {
    axios.get('/getAllPlayers').then((response) => {
      this.players = response.data
      console.log(this.players)
    })
  },
  methods: {
    syncPlayer(playerID) {
      axios.post(`/syncPlayer/${playerID}`).then((response) => {
        console.log(response)
      })
      console.log(playerID)
    },
  },
}
</script>

<style lang="scss" scoped>
.scroller {
  height: calc(100vh - 220px);
}
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: normal;
}
</style>
