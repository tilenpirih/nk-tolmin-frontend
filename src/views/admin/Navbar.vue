<template>
  <div>
    <v-layout justify-space-between align-center>
      <v-btn fab @click="drawer = !drawer">
        <v-icon> {{ mdiMenu }}</v-icon>
      </v-btn>
      <v-btn @click="logout()">
        <v-icon class="mr-3">{{ mdiLogout }}</v-icon>
        Odjava
      </v-btn>
    </v-layout>
    <v-navigation-drawer v-model="drawer" app temporary class="secondary" dark>
      <v-list nav dense>
        <v-list-item v-for="link in links" :key="link.route" :to="link.route">
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiMenu, mdiLogout } from '@mdi/js'
import adminStore from '@/store/admin.js'

export default {
  data: () => ({
    drawer: false,
    links: [
      {
        text: 'Pregled',
        route: '/admin/pregled',
        allAdmins: true,
      },
      {
        text: 'Prispevki',
        route: '/admin/prispevki',
        allAdmins: true,
      },
      {
        text: 'Koledar',
        route: '/admin/koledar',
        allAdmins: true,
      },
      {
        text: 'Igralci',
        route: '/admin/igralci',
        allAdmins: true,
      },
      {
        text: 'Sinhronizacije',
        route: '/admin/sinhronizacije',
        allAdmins: true,
      },
      {
        text: 'Sezone',
        route: '/admin/sezone',
        allAdmins: true,
      },
      {
        text: 'Klubi',
        route: '/admin/klubi',
        allAdmins: true,
      },
      {
        text: 'Spoznorji',
        route: '/admin/sponzorji',
        allAdmins: true,
      },
      {
        text: 'Osebje',
        route: '/admin/osebje',
        allAdmins: true,
      },
      {
        text: 'Mlajše selekcije',
        route: '/admin/mlajse_selekcije',
        allAdmins: true,
      },
    ],
    mdiMenu,
    mdiLogout,
  }),
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
