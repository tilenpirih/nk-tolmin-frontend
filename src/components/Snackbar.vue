<template>
  <v-snackbar
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    class="text-center"
  >
    <v-layout justify-center>
      {{ snackbar.message }}
    </v-layout>
  </v-snackbar>
</template>

<script>
import generalStore from '@/store/general.js'

// const store
export default {
  name: 'Snackbar',
  computed: {
    snackbar() {
      return generalStore().snackbar
    },
  },
}
</script>
