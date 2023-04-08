<template>
  <v-layout justify-center class="pt-3 px-3">
    <!-- {{ articles }} -->
    <v-flex v-if="articles" xs12 sm11 md10 lg9 xl8>
      <v-layout wrap>
        <!-- <Article /> -->
        <v-flex v-for="article in articles" :key="article.article_id" xs12 sm6 md4 lg3 class="pa-2">
          <v-card height="100%">
            <v-img
              class="align-end thumbnail"
              height="200px"
              :src="article.thumbnail ? article.thumbnail : logo"
              :contain="article.thumbnail ? false : true"
              :gradient="gradient(article.thumbnail)"
              @click="openArticle(article.article_id)"
            >
              <v-card-title class="white--text pa-0 ma-3 articleTitle">
                {{ article.title }}
              </v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0"> {{ formatDate(article.created) }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div class="preview">{{ article.preview }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-pagination
        v-if="articles.length > 0"
        v-model="page"
        :length="pages"
        :total-visible="7"
        color="primary"
        class="my-5"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import generalStore from '@/store/general.js'
import noPhoto from '@/assets/no_photo.png'
import logo from '@/assets/grb_NK_Tolmin.png'
import dayjs from 'dayjs'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

const store = generalStore()
export default {
  name: 'Articles',
  data: () => ({
    articles: null,
    pages: null,
    baseUrl: process.env.VUE_APP_API_URL,
    noPhoto,
    logo,
  }),
  computed: {
    page: {
      get() {
        return store.articlePage
      },
      set(val) {
        store.articlePage = val
      },
    },
  },
  watch: {
    page() {
      this.getArticles()
    },
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      axios
        .get(`/articles/${this.page}`)
        .then(({ data }) => {
          this.articles = data.articles
          this.pages = data.pages
          this.page = data.page
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openArticle(id) {
      this.$router.push(`/clanek/${id}`)
    },
    formatDate(date) {
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
    gradient(img) {
      if (img) {
        return 'to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,.1), rgba(0,0,0,.6)'
      }
      return 'to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5), rgba(0,0,0,.7)'
    },
  },
}
</script>

<style lang="scss" scoped>
.articleTitle {
  overflow: hidden !important;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: normal;
}
.thumbnail {
  cursor: pointer;
  transition: 0.8s;
}
::v-deep.thumbnail > .v-image__image {
  transition: 0.4s;
}
::v-deep.thumbnail:hover > .v-image__image {
  transform: scale(1.05);
  transition: 0.4s;
}
.preview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: normal;
}
</style>
