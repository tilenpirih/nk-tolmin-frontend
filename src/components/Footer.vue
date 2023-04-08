<template>
  <v-footer dark class="secondary">
    <v-layout justify-center wrap>
      <v-flex xs12>
        <v-layout justify-center class="mt-2">
          <v-btn
            v-for="social in socials"
            :key="social.link"
            class="mx-4"
            icon
            variant="text"
            :href="social.link"
            target="_blank"
          >
            <v-icon size="24">{{ social.icon }}</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-layout justify-center class="my-2">
          <v-icon>{{ mdiCopyright }}</v-icon>
          {{ new Date().getFullYear() }} - <strong class="ml-1">Nogometni klub Tolmin</strong>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import { mdiFacebook, mdiYoutube, mdiInstagram, mdiCopyright } from '@mdi/js'

export default {
  data: () => ({
    socials: [
      {
        icon: mdiFacebook,
        link: 'https://www.facebook.com/NKTolmin',
      },
      {
        icon: mdiYoutube,
        link: 'https://www.youtube.com/@nktolmin',
      },
      {
        icon: mdiInstagram,
        link: 'https://www.instagram.com/nktolmin/',
      },
    ],
    mdiCopyright,
  }),
}
</script>

<style lang="scss" scoped></style>
