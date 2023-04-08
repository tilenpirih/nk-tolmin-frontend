<template>
  <v-card class="pa-5">
    <h2 class="mb-3 primary--text">Dodaj sponzorja</h2>
    <v-form v-model="valid">
      <v-text-field v-model="name" outlined label="Ime" :rules="[rules.required]" />
      <v-text-field v-model="url" outlined label="Url naslov" :rules="[rules.validUrl]" />
      <v-select
        v-model="tier"
        :items="tiers"
        item-text="text"
        item-value="value"
        outlined
        label="Kategorija sponzorja"
        :rules="[rules.required]"
      ></v-select>
      <v-file-input
        v-model="image"
        outlined
        accept="image/*"
        label="Dodaj sliko / logotip"
        prepend-inner-icon="$file"
        prepend-icon=""
      ></v-file-input>
    </v-form>
    <v-btn class="mt-3" color="primary" :disabled="!valid" @click="addSponsor()">Dodaj</v-btn>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: '',
    url: '',
    tier: '',
    image: null,
    tiers: [
      { text: 'Glavni sponzor', value: 'main' },
      { text: 'Zlati sponzor', value: 'gold' },
      { text: 'Srebrni sponzor', value: 'silver' },
      { text: 'Ostali', value: 'other' },
    ],
    valid: false,
    rules: {
      required: (v) => !!v || 'Polje je obvezno',
      validUrl: (v) => {
        if (!v) return true
        const regex = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
          'i',
        )
        return regex.test(v) || 'Url naslov ni veljaven'
      },
    },
  }),
  methods: {
    addSponsor() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('url', this.url)
      formData.append('tier', this.tier)
      formData.append('image', this.image)
      axios.post('/addSponsor', formData).then((res) => {
        this.$emit('updateSponsors', res.data)
        // console.log(res)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
