<template>
  <v-layout justify-center class="pt-3">
    <v-flex xs12 sm10 md9 lg8 xl7>
      <v-layout align-center>
        <v-text-field
          v-model="search"
          outlined
          hide-details
          class="mr-3"
          label="Išči prispevke po imenih"
        />
        <v-btn fab :loading="loadingAdd" @click.stop="addArticle()">
          <v-icon>{{ mdiPlus }}</v-icon>
        </v-btn>
      </v-layout>
      <v-virtual-scroll :bench="3" :items="filterArticles" item-height="120" class="scroller mt-2">
        <template #default="{ item }">
          <div>
            <v-layout class="py-2">
              <div>
                <v-img
                  max-width="150"
                  max-height="100"
                  :src="item.thumbnail ? item.thumbnail : logo"
                  contain
                  @click="editArticle(item.article_id)"
                />
              </div>
              <div class="ml-3">
                <h3 class="primary--text mb-n2 articleTitle" @click="editArticle(item.article_id)">
                  {{ item.title }}
                </h3>
                <small class="mt-3">{{ formatDate(item.created) }}</small>
                <div class="preview">
                  {{ item.preview }}
                </div>
              </div>
            </v-layout>
          </div>
          <v-divider />
        </template>
      </v-virtual-scroll>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import logo from '@/assets/grb_NK_Tolmin.png'
import { mdiPencil, mdiSync, mdiPlus } from '@mdi/js'
import dayjs from 'dayjs'

dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  name: 'ListArticle',
  data: () => ({
    articles: [],
    search: '',
    loadingAdd: false,
    baseUrl: process.env.VUE_APP_API_URL,
    noPhoto,
    logo,
    mdiPencil,
    mdiSync,
    mdiPlus,
  }),
  computed: {
    filterArticles() {
      return this.articles.filter((a) => a.title.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  mounted() {
    // const page = Number(this.$route.params.page)
    // if (page) {
    //   this.page = page
    // }
    axios.get('/getAllArticles').then(({ data }) => {
      this.articles = data
      console.log(this.articles)
    })
  },
  methods: {
    // editClub(clubId) {
    //   this.$router.push(`/admin/klubi/uredi/${clubId}`)
    // },
    addArticle() {
      axios.post('/createArticle').then(({ data }) => {
        console.log(data)
        this.$router.push(`/admin/prispevki/uredi/${data.article_id}`)
      })
    },
    editArticle(articleId) {
      this.$router.push(`/admin/prispevki/uredi/${articleId}`)
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
  },
}
</script>

<style lang="scss" scoped>
.scroller {
  height: calc(100vh - 220px);
}
.articleTitle {
  cursor: pointer;
}
.articleTitle:hover {
  text-decoration: underline;
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
