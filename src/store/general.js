import { defineStore } from 'pinia'

export default defineStore('generalStore', {
  state: () => ({
    seasons: null,
    articlePage: 1,
    snackbar: {
      visible: false,
      message: 'snackbar test',
      timeout: 4000,
      color: 'primary',
    },
  }),
  actions: {
    getSeasons() {
      return axios.get('/seasons').then(({ data }) => {
        this.seasons = data
      })
    },
    setSnackbar(snackbar) {
      !snackbar.visible
        ? (this.snackbar.visible = true)
        : (this.snackbar.visible = snackbar.visible)
      !snackbar.timeout
        ? (this.snackbar.timeout = 4000)
        : (this.snackbar.timeout = snackbar.timeout)
      !snackbar.color ? (this.snackbar.color = 'primary') : (this.snackbar.color = snackbar.color)
      this.snackbar.message = snackbar.message
    },
  },
})
