<template>
  <div v-if="staff.length != 0">
    <h3 class="primary--text mb-2">Ostali člani</h3>
    <v-layout wrap class="mx-n3">
      <v-flex v-for="person in staff" :key="person.staff_id" xs6 sm4 lg3 xl2 class="px-3 mb-6">
        <v-card class="card overflow-hidden">
          <v-img
            v-if="person.img_path"
            aspect-ratio="0.875"
            contain
            :src="baseUrl + person.img_path"
          />
          <v-img v-else aspect-ratio="0.875" contain :src="noPhoto" />
          <div class="px-2 pb-1">
            <div class="font-weight-bold overflowEllipsis primary--text">
              {{ person.full_name }}
            </div>
            <div>{{ person.role }}</div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'

export default {
  props: {
    staff: {
      type: Array,
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
</style>
