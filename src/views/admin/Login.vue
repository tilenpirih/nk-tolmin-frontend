<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <div>
        <div v-if="user">Dobrodošel {{ user.name }} {{ user.surname }}</div>
        <v-card class="pa-3">
          <v-card-title>Prijava administratorjev</v-card-title>
          <v-text-field v-model="username" outlined label="Uporabniško ime" />
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? mdiEye : mdiEyeOff"
            outlined
            label="Geslo"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          />
          <v-btn block @click.stop="login()">Prijava</v-btn>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'
import adminStore from '@/store/admin.js'
import generalStore from '@/store/general.js'

export default {
  data: () => ({
    username: 'admin',
    password: 'admin',
    showPassword: false,
    mdiEye,
    mdiEyeOff,
  }),
  computed: {
    user() {
      return adminStore().user
    },
  },
  methods: {
    login() {
      adminStore()
        .login(this.username, this.password)
        .then(() => {
          if (this.user) {
            this.$router.push({ name: 'Dashboard' })
            generalStore().setSnackbar({ message: 'Prijava uspešna' })
          }
        })
    },
    logout() {
      adminStore().logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
