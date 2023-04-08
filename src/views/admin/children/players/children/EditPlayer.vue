<template>
  <v-layout wrap justify-center class="mt-3">
    <v-flex xs12 sm10 md9 lg8>
      <v-form v-model="valid">
        <v-layout v-if="player" wrap>
          <v-flex xs12>
            <h2>{{ player.full_name }}</h2>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="player.year_of_birth"
              outlined
              label="Letnica rojstva"
              class="mt-3"
              type="number"
              hide-spin-buttons
              :rules="[rules.required]"
            />
          </v-flex>
          <v-flex>
            <v-textarea
              v-model="player.description"
              outlined
              hide-details
              name="input-7-4"
              label="Opis"
            />
          </v-flex>
          <v-flex xs12>
            <v-btn
              color="primary"
              class="mt-3"
              :disabled="!valid"
              :loading="loadingSaveBtn"
              @click="updatePlayer"
            >
              Shrani
            </v-btn>
          </v-flex>
          <v-flex xs12 class="mt-6">
            <v-divider />
          </v-flex>
          <v-flex xs12 sm6 class="mt-6">
            <v-file-input
              v-model="image"
              accept="image/*"
              label="Zamenjaj sliko igralca"
              prepend-inner-icon="$file"
              prepend-icon=""
              outlined
            />
            <v-btn
              color="primary"
              class="mr-3"
              :disabled="!image"
              :loading="updatingImage"
              @click.stop="updateImage()"
            >
              <span v-if="player.img_path"> Posodobi sliko </span>
              <span v-else> Dodaj sliko </span>
            </v-btn>
            <v-btn color="primary" :disabled="player.img_path === null" @click.stop="deleteImage()">
              Izbriši sliko
            </v-btn>
          </v-flex>
          <v-flex xs12 sm6 class="mt-6">
            <v-layout justify-center>
              <v-img
                v-if="player.img_path"
                :src="baseUrl + player.img_path"
                max-height="200"
                max-width="200"
              />
              <v-img v-else :src="noPhoto" max-height="200" max-width="200" />
            </v-layout>
          </v-flex>
          <v-flex xs12 class="mt-6">
            <v-divider />
          </v-flex>
          <v-flex xs12 class="mt-6">
            <h3>Pozicija igralca</h3>
          </v-flex>
          <v-flex
            v-for="(position, index) in player.positions"
            :key="position.season_id"
            xs12
            sm6
            md4
            lg3
            class="mt-6 px-3"
          >
            <v-select
              v-model="player.positions[index].position"
              :items="positions"
              item-text="text"
              item-value="value"
              :label="`${player.positions[index].season_id} sezona`"
              :disabled="changingPosition"
              outlined
              @change="updatePlayerPosition(index)"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import FormData from 'form-data'

export default {
  name: 'EditPlayer',
  data: () => ({
    player: null,
    noPhoto,
    loadingSaveBtn: false,
    updatingImage: false,
    changingPosition: false,
    baseUrl: process.env.VUE_APP_API_URL,
    valid: false,
    image: null,
    positions: [
      { text: 'Napadalec', value: 'forward' },
      { text: 'Vezist', value: 'midfielder' },
      { text: 'Branilec', value: 'defender' },
      { text: 'Golman', value: 'goalkeeper' },
      { text: 'Ostali', value: 'NA' },
    ],
    rules: {
      required: (value) => !!value || 'Polje je obvezno',
    },
  }),
  mounted() {
    axios.get(`/adminGetPlayer/${this.$route.params.playerID}`).then(({ data }) => {
      this.player = data
      console.log(this.player)
    })
  },
  methods: {
    updatePlayer() {
      this.loadingSaveBtn = true
      const form = new FormData()
      form.append('year_of_birth', this.player.year_of_birth)
      form.append('description', this.player.description)
      axios
        .post(`/updatePlayer/${this.$route.params.playerID}`, form)
        .then(({ data }) => {
          this.player.description = data.description
        })
        .finally(() => {
          this.loadingSaveBtn = false
        })
    },
    updateImage() {
      this.updatingImage = true
      const form = new FormData()
      form.append('image', this.image)
      axios
        .post(`/updatePlayerImage/${this.$route.params.playerID}`, form)
        .then(({ data }) => {
          this.player.img_path = data.img_path
        })
        .finally(() => {
          this.updatingImage = false
        })
    },
    deleteImage() {
      this.updatingImage = true
      axios
        .delete(`/deletePlayerImage/${this.$route.params.playerID}`)
        .then(({ data }) => {
          this.player.img_path = data.img_path
        })
        .finally(() => {
          this.updatingImage = false
        })
    },
    updatePlayerPosition(index) {
      this.changingPosition = true
      const form = new FormData()
      form.append('position', this.player.positions[index].position)
      form.append('season_id', this.player.positions[index].season_id)
      axios
        .post(`/changePlayerPosition/${this.$route.params.playerID}`, form)
        .then(({ data }) => {
          this.player.positions = data
        })
        .finally(() => {
          this.changingPosition = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
