<template>
  <v-layout wrap class="mx-n3" justify-center>
    <v-flex v-for="sponsor in sponsors" :key="sponsor.name" xs12 sm6 lg4>
      <v-card class="pa-3 mx-3 my-2" style="height: calc(100% - 16px)">
        <v-img v-if="sponsor.img" :src="baseUrl + sponsor.img" aspect-ratio="1.7" contain />
        <v-layout justify-center :align-center="!sponsor.img" class="fill-height">
          {{ sponsor.name }}
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    sponsors: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    baseUrl: process.env.VUE_APP_API_URL,
  }),
}
</script>
