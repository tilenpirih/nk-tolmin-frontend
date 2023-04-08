<template>
  <v-layout justify-center class="pa-3">
    <v-flex v-if="article" xs12 sm11 md8>
      <h1 class="primary--text mb-n2">{{ article.title }}</h1>
      <small>
        {{ createdDate(article.created) }}
        <span v-if="showUpdatedDate()"> | posodobljeno {{ updatedDate(article.updated) }} </span>
      </small>
      <v-divider class="my-2" />
      <!-- <VMdPreview :text="article.content" /> -->
      <div v-html="parsed"></div>
      <v-divider v-if="article.gallery_images" class="mb-4 mt-2" />
      <v-layout wrap>
        <v-flex v-for="image in article.gallery_images" :key="image" xs12 sm6 md4 lg3 class="pa-2">
          <v-img
            :src="baseUrl + image"
            aspect-ratio="1"
            class="grey lighten-2 image"
            @click="openImage(image)"
          />
        </v-flex>
      </v-layout>
      <v-overlay :value="dialog" @click="dialog = !dialog">
        <v-img :src="baseUrl + selectedImage" max-width="100vw" max-height="100vh" contain />
      </v-overlay>
    </v-flex>
  </v-layout>
</template>

<script>
import dayjs from 'dayjs'
import { marked } from 'marked'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  name: 'Article',
  data: () => ({
    article: null,
    dialog: false,
    selectedImage: null,
    baseUrl: process.env.VUE_APP_API_URL,
  }),
  computed: {
    parsed() {
      return marked(this.article.content)
    },
  },
  mounted() {
    axios.get(`article/${this.$route.params.articleID}`).then(({ data }) => {
      this.article = data
    })
  },
  methods: {
    createdDate(date) {
      dayjs.locale('sl')
      return dayjs(date).calendar(null, {
        sameDay: '[Danes ob] HH:mm',
        nextDay: '[Jutri ob] HH:mm',
        nextWeek: 'dddd [ob] HH:mm',
        lastDay: '[Včeraj ob] HH:mm',
        lastWeek: 'D. M. YYYY [ob] HH:mm',
        sameElse: 'D. M. YYYY [ob] HH:mm',
      })
    },
    updatedDate(date) {
      dayjs.locale('sl')
      const date1 = dayjs(date)
      const date2 = dayjs(this.article.created)
      return dayjs(date).calendar(null, {
        sameDay: '[ob] HH:mm',
        nextDay: '[ob] HH:mm',
        nextWeek: 'dddd [ob] HH:mm',
        lastDay: '[Včeraj ob] HH:mm',
        lastWeek: 'D. M. YYYY [ob] HH:mm',
        sameElse: 'D. M. YYYY [ob] HH:mm',
      })
    },
    showUpdatedDate() {
      if ((dayjs(this.article.updated) - dayjs(this.article.created)) / 1000 > 60) {
        return true
      }
      return false
    },
    openImage(image) {
      this.selectedImage = image
      this.dialog = true
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .github-markdown-body {
  padding: 0px !important;
}
.image {
  transition: 0.5s;
  cursor: pointer;
}
.image:hover {
  transform: scale(1.05);
  transition: 0.5s;
}
</style>
