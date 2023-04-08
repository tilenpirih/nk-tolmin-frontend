import { defineStore } from 'pinia'

export default defineStore('adminStore', {
  state: () => ({
    user: null,
  }),
  actions: {
    isLoggedIn() {
      // console.log('is logged in')
      return axios.get('/isLoggedIn').then(({ data }) => {
        this.user = data
      })
    },
    login(username, password) {
      return axios
        .post('/login', {
          username,
          password,
        })
        .then(({ data }) => {
          this.user = data
        })
    },
    logout() {
      return axios.post('/logout').then(() => {
        this.user = null
      })
    },
  },
})
