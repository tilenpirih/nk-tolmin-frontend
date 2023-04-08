<template>
  <v-layout justify-center>
    <div>
      <h2>Pregled</h2>
    </div>
  </v-layout>
</template>

<script>
import adminStore from '@/store/admin.js'

export default {
  methods: {
    logout() {
      adminStore()
        .logout()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
