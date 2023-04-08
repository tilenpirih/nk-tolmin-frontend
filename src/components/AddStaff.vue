<template>
  <v-card class="pa-5">
    <h2 class="mb-3 primary--text">Dodaj osebo</h2>
    <v-form v-model="valid">
      <v-text-field v-model="full_name" outlined label="Polno ime" :rules="[rules.required]" />
      <v-text-field v-model="role" outlined label="Funkcija osebe" />
      <v-file-input
        v-model="image"
        outlined
        accept="image/*"
        label="Dodaj sliko osebe"
        prepend-inner-icon="$file"
        prepend-icon=""
      ></v-file-input>
    </v-form>
    <v-btn class="mt-3" color="primary" :disabled="!valid" @click="addSponsor()">Dodaj</v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    seasonID: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    full_name: '',
    role: '',
    image: null,
    valid: false,
    rules: {
      required: (v) => !!v || 'Polje je obvezno',
    },
    loading: false,
  }),
  methods: {
    addSponsor() {
      this.loading = true
      const formData = new FormData()
      formData.append('full_name', this.full_name)
      formData.append('role', this.role)
      formData.append('image', this.image)
      axios.post(`/addStaff/${this.seasonID}`, formData).then((res) => {
        this.$emit('updateStaff', res.data)
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
