<template>
  <div class="pa-3">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/views/admin/Navbar.vue'

export default {
  components: { Navbar },
  // computed: {
  //   user() {
  //     return adminStore().user
  //   },
  // },
  // created() {
  //   if (!this.user) {
  //     adminStore()
  //       .isLoggedIn()
  //       .then(() => {
  //         if (!this.user) {
  //           this.$router.push({ name: 'Login' })
  //         }
  //         console.log('test')
  //       })
  //   }
  // },
}
</script>

<style lang="scss" scoped></style>
