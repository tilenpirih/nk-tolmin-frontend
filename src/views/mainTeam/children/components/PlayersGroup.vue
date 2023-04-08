<template>
  <div>
    <h3 class="primary--text mb-2">{{ groupName }}</h3>
    <v-layout wrap class="mx-n3">
      <v-flex v-for="player in players" :key="player.player_id" xs6 sm4 lg3 xl2 class="px-3 mb-6">
        <v-card class="card overflow-hidden">
          <router-link :to="`/clansko-mostvo/igralec/${player.player_id}`">
            <v-img
              v-if="player.img_path"
              aspect-ratio="0.875"
              contain
              :src="baseUrl + player.img_path"
            />
            <v-img v-else aspect-ratio="0.875" contain :src="noPhoto" />
          </router-link>
          <div class="px-2 pb-1">
            <router-link
              :to="`/clansko-mostvo/igralec/${player.player_id}`"
              class="text-decoration-none"
            >
              <div class="font-weight-bold overflowEllipsis">
                {{ player.full_name }}
              </div>
            </router-link>
            <div>{{ player.year_of_birth }}</div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'

export default {
  name: 'PlayersGroup',
  props: {
    players: {
      type: Array,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    baseUrl: process.env.VUE_APP_API_URL,
    noPhoto,
  }),
}
</script>

<style lang="scss" scoped>
.overflowEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card {
  transition: 0.3s;
}
.card:hover {
  scale: 1.05;
  transition: 0.3s;
}
</style>
