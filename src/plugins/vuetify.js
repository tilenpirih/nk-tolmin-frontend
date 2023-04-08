import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#C20725',
        secondary: '#1b1b1b',
        tertiary: '#303030',
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg',
  },
})
