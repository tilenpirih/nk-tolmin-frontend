<template>
  <v-layout wrap justify-center class="mt-3">
    <v-flex xs12 sm10 md9 lg8>
      <v-layout v-if="club" wrap>
        <v-flex xs12>
          <h2>{{ club.name }}</h2>
        </v-flex>
        <v-flex xs12 sm6 class="mt-6">
          <v-file-input
            v-model="image"
            accept="image/*"
            label="Zamenjaj logotip kluba"
            prepend-inner-icon="$file"
            prepend-icon=""
            outlined
          />
          <v-btn
            color="primary"
            class="mr-3"
            :disabled="!image"
            :loading="updatingLogo"
            @click.stop="updateLogo()"
          >
            <span v-if="club.original_logo_path"> Posodobi logotip </span>
            <span v-else> Dodaj logotip </span>
          </v-btn>
          <v-btn
            color="primary"
            :disabled="club.original_logo_path === null"
            @click.stop="deleteLogo()"
          >
            Izbriši logotip
          </v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="mt-6">
          <v-layout justify-center>
            <v-img
              v-if="club.original_logo_path"
              :src="baseUrl + club.original_logo_path"
              max-height="200"
              max-width="200"
            />
            <v-img v-else :src="noPhoto" max-height="200" max-width="200" />
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'

export default {
  name: 'EditClub',
  data: () => ({
    club: null,
    loading: false,
    valid: false,
    image: null,
    updatingLogo: false,
    baseUrl: process.env.VUE_APP_API_URL,
    noPhoto,
  }),
  mounted() {
    console.log('edit clubs')
    axios.get(`/getClub/${this.$route.params.clubID}`).then(({ data }) => {
      this.club = data
      console.log(this.club)
    })
  },
  methods: {
    updateLogo() {
      this.updatingLogo = true
      const form = new FormData()
      form.append('image', this.image)
      axios
        .post(`/updateClubLogo/${this.$route.params.clubID}`, form)
        .then(({ data }) => {
          this.club = data
          console.log(data)
        })
        .finally(() => {
          this.updatingLogo = false
        })
    },
    deleteLogo() {
      this.updatingLogo = true
      axios
        .delete(`/deleteClubLogo/${this.$route.params.clubID}`)
        .then(({ data }) => {
          this.club = data
          console.log(data)
        })
        .finally(() => {
          this.updatingLogo = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
