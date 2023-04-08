<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-layout wrap justify-center class="mt-3">
    <v-flex xs12 sm10 md9 lg8>
      <v-layout v-if="article" wrap>
        <v-flex xs12>
          <v-layout justify-space-between align-end>
            {{ createdDate(article.created) }} | {{ updatedDate(article.updated) }}
            <v-btn fab small @click="$router.go(-1)">
              <v-icon>{{ mdiArrowLeft }}</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-switch v-model="article.visible" :label="`Viden članek`" />
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="article.title" outlined label="Naslov članka" />
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="article.preview"
            outlined
            hide-details
            label="Predopis / predogled"
          />
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="article.thumbnail"
            outlined
            clearable
            label="Sličica"
            class="mt-3"
          />
        </v-flex>
        <v-flex xs12 sm6>
          <v-layout justify-center class="py-3">
            <v-img
              v-if="article.thumbnail"
              :src="article.thumbnail"
              contain
              max-height="200"
              :class="{ 'pl-6': $vuetify.breakpoint.smAndUp }"
            />
            <v-img v-else :src="logo" contain max-height="200" />
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on"> Uredi vsebino </v-btn>
            </template>
            <template #default="">
              <VMdEditor
                v-model="article.content"
                default-fullscreen
                style="height: 100%"
                @save="saveEditor()"
              ></VMdEditor>
            </template>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <!-- <VMdPreview class="mt-3" :text="article.content"></VMdPreview> -->
          <div class="mt-3" v-html="parsed"></div>
        </v-flex>
        <v-flex
          v-for="(image, index) in article.gallery_images"
          :key="index"
          xs6
          sm4
          md3
          xl2
          align-self-center
          class="pa-2"
        >
          <v-hover>
            <template #default="{ hover }">
              <v-img :src="baseUrl + image" contain>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute>
                    <v-layout column fill-height>
                      <v-layout justify-end>
                        <v-btn fab small light class="ma-2" @click="removeFromGallery(image)">
                          <v-icon>{{ mdiMinus }}</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-layout>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </template>
          </v-hover>
        </v-flex>

        <v-flex xs12>
          <v-btn class="primary" @click.stop="save()">Shrani</v-btn>
        </v-flex>
        <v-flex xs12 class="mt-5">
          <v-file-input
            v-model="images"
            chips
            outlined
            multiple
            accept="image/*"
            label="Dodaj slike"
            prepend-inner-icon="$file"
            prepend-icon=""
          ></v-file-input>
        </v-flex>
        <v-flex xs12>
          <v-btn
            color="primary"
            class="mr-3"
            :disabled="!images"
            :loading="addingImages"
            @click.stop="addImages()"
          >
            Dodaj slike
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <h2 class="mt-3">Vse slike</h2>
        </v-flex>
        <v-flex
          v-for="image in article.images"
          :key="image"
          xs6
          sm4
          md3
          xl2
          align-self-center
          class="pa-2"
        >
          <v-hover>
            <template #default="{ hover }">
              <v-img :src="baseUrl + image" contain>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute>
                    <v-layout column fill-height>
                      <v-layout justify-space-between>
                        <v-btn fab small light class="ma-2" @click="copyLink(image)">
                          <v-icon>{{ mdiContentCopy }}</v-icon>
                        </v-btn>
                        <v-btn fab small light class="ma-2" @click="addToGallery(image)">
                          <v-icon>{{ mdiPlus }}</v-icon>
                        </v-btn>
                      </v-layout>
                      <v-layout justify-end align-end>
                        <v-btn fab small color="red" class="ma-2" @click="deleteImage(image)">
                          <v-icon>{{ mdiDelete }}</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-layout>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </template>
          </v-hover>
        </v-flex>
        <!-- <v-flex
          v-for="image in article.images"
          :key="image"
          xs6
          sm4
          md3
          xl2
          align-self-center
          class="pa-2"
        >
          <v-img :src="baseUrl + image" contain />
        </v-flex> -->
        <!-- {{ article }} -->
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import noPhoto from '@/assets/no_photo.png'
import logo from '@/assets/grb_NK_Tolmin.png'
import { mdiDelete, mdiPlus, mdiMinus, mdiContentCopy, mdiArrowLeft } from '@mdi/js'
import dayjs from 'dayjs'

import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// Resources for the codemirror editor
import Codemirror from 'codemirror'
// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'

import '@kangc/v-md-editor/lib/style/preview.css'

import { marked } from 'marked'

VMdEditor.Codemirror = Codemirror

VMdEditor.use(githubTheme)

VMdEditor.lang.use('en-US', enUS)
dayjs.extend(require('dayjs/plugin/calendar'))
require('dayjs/locale/sl')

export default {
  name: 'EditArticle',
  // eslint-disable-next-line vue/no-unused-components
  components: { VMdEditor },
  data: () => ({
    article: null,
    images: null,
    addingImages: false,
    dialog: false,
    noPhoto,
    logo,
    baseUrl: process.env.VUE_APP_API_URL,
    mdiDelete,
    mdiPlus,
    mdiMinus,
    mdiContentCopy,
    mdiArrowLeft,
  }),
  computed: {
    parsed() {
      return marked(this.article.content)
    },
  },
  mounted() {
    axios.get(`/article/${this.$route.params.articleID}`).then(({ data }) => {
      if (data.content === null) {
        data.content = ''
      }
      this.article = data
      console.log(this.article)
    })
  },
  methods: {
    addImages() {
      this.addingImages = true
      const formData = new FormData()
      this.images.forEach((file) => {
        formData.append('images', file)
      })
      axios
        .post(`/addImagesArticle/${this.article.article_id}`, formData)
        .then(({ data }) => {
          console.log(data)
          this.article.images = data.images
          this.images = null
        })
        .finally(() => {
          this.addingImages = false
        })
    },
    addToGallery(image) {
      if (!this.article.gallery_images) {
        this.article.gallery_images = []
      }
      if (this.article.gallery_images.includes(image)) {
        this.article.gallery_images
        return
      }
      this.article.gallery_images.push(image)
    },
    removeFromGallery(image) {
      this.article.gallery_images = this.article.gallery_images.filter((img) => img !== image)
    },
    copyLink(image) {
      const el = document.createElement('textarea')
      el.value = `${this.baseUrl}${image}`
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    save() {
      const formData = new FormData()
      formData.append('title', this.article.title)
      formData.append('thumbnail', this.article.thumbnail)
      formData.append('preview', this.article.preview)
      formData.append('content', this.article.content)
      formData.append('visible', this.article.visible)
      formData.append('gallery_images', JSON.stringify(this.article.gallery_images))

      axios.post(`/updateArticle/${this.article.article_id}`, formData).then(({ data }) => {
        console.log(data)
        this.article = data
      })
    },
    deleteImage(image) {
      axios.delete(`/deleteImage/${this.article.article_id}?path=${image}`).then(({ data }) => {
        console.log(data)
        this.article.images = data.images
        this.article.gallery_images = data.gallery_images
      })
    },
    createdDate(date) {
      dayjs.locale('sl')
      return dayjs(date).format('DD.MM.YYYY, HH:mm')
    },
    updatedDate(date) {
      dayjs.locale('sl')
      date = dayjs(date)
      return date.calendar(null, {
        sameDay: '[Posodobljeno ob] HH:mm',
        lastDay: '[Posodobljeno včeraj ob] HH:mm',
        lastWeek: '[Posodobljeno] D. M. YYYY [ob] HH:mm',
        sameElse: '[Posodobljeno] D. M. YYYY [ob] HH:mm',
      })
    },
    saveEditor() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-overlay__content {
  width: 100% !important;
  height: 100% !important;
}
::v-deep .v-md-editor__toolbar-left {
  font-family: 'Roboto' !important;
}
::v-deep .github-markdown-body {
  padding: 0px !important;
}
// ::v-deep li {
//   font-family: 'Roboto' !important;
// }
</style>
