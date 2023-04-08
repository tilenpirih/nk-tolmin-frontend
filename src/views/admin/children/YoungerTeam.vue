<template>
  <v-layout justify-center class="pt-3">
    <v-flex v-if="youngerTeamData" xs12 sm11 md8>
      <v-layout justify-space-between align-center>
        <h2 class="primary--text">Mlajša selekcija - {{ category }}</h2>
        <v-select
          v-model="category"
          :items="categories"
          label="Kategorija"
          outlined
          dense
          hide-details
          style="max-width: 150px !important"
          @change="changeCategory()"
        />
      </v-layout>
      <v-divider class="mt-5" />
      <v-layout v-if="youngerTeamData">
        <v-flex xs12 sm6 class="mt-6 mr-3">
          <v-file-input
            v-model="image"
            accept="image/*"
            label="Zamenjaj skupinsko sliko"
            prepend-inner-icon="$file"
            prepend-icon=""
            outlined
          />
          <v-btn
            color="primary"
            class="mr-3"
            :disabled="!image"
            :loading="updatingImage"
            @click.stop="updateGroupPhoto()"
          >
            <span v-if="youngerTeamData.original_group_photo"> Posodobi sliko </span>
            <span v-else> Dodaj sliko </span>
          </v-btn>
          <v-btn
            color="primary"
            :disabled="youngerTeamData.original_group_photo === null"
            @click.stop="deleteGroupPhoto()"
          >
            Izbriši sliko
          </v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="mt-6 ml-3">
          <v-layout justify-center>
            <v-img
              v-if="youngerTeamData.original_group_photo"
              :src="baseUrl + youngerTeamData.original_group_photo + '?rand=' + rand"
              :lazy-src="baseUrl + youngerTeamData.lazy_group_photo + '?rand=' + rand"
              contain
            />
            <v-img v-else :src="noPhoto" max-height="200" max-width="200" />
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12>
          <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on"> Uredi vsebino </v-btn>
            </template>
            <template #default="">
              <VMdEditor
                v-model="youngerTeamData.content"
                default-fullscreen
                style="height: 100%"
                @save="saveEditor()"
              ></VMdEditor>
            </template>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <h2 class="mt-8 primary--text">Vsebina</h2>
          <!-- <VMdPreview class="mt-3" :text="article.content"></VMdPreview> -->
          <div class="mt-3" v-html="parsed"></div>
          <v-btn color="primary" :loading="updatingContent" @click="saveContent()">
            Shrani vsebino
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
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

import generalStore from '@/store/general.js'

VMdEditor.Codemirror = Codemirror

VMdEditor.use(githubTheme)

VMdEditor.lang.use('en-US', enUS)

export default {
  components: { VMdEditor },
  data: () => ({
    image: null,
    dialog: false,
    updatingImage: false,
    updatingContent: false,
    valid: false,
    rules: {
      required: (v) => !!v || 'Polje je obvezno',
    },
    category: 'U7',
    categories: ['U7', 'U9', 'U11', 'U13', 'U15', 'U17', 'U19'],
    rand: 1,
    youngerTeamData: null,
    baseUrl: process.env.VUE_APP_API_URL,
  }),
  computed: {
    parsed() {
      return marked(this.youngerTeamData.content)
    },
  },
  mounted() {
    axios.get(`/getYoungerTeam/${this.category}`).then((res) => {
      this.youngerTeamData = res.data
    })
  },

  methods: {
    updateGroupPhoto() {
      this.updatingImage = true
      const formData = new FormData()
      formData.append('image', this.image)
      axios
        .post(`/updateYoungerTeamPhoto/${this.category}`, formData)
        .then(({ data }) => {
          this.youngerTeamData = data
        })
        .finally(() => {
          this.updatingImage = false
          this.rand = Math.random()
        })
    },
    deleteGroupPhoto() {
      this.updatingImage = true
      axios
        .delete(`/deleteYoungerTeamPhoto/${this.category}`)
        .then(({ data }) => {
          this.youngerTeamData = data
        })
        .finally(() => {
          this.updatingImage = false
        })
    },
    saveEditor() {
      this.dialog = false
    },
    saveContent() {
      this.updatingContent = true
      const formData = new FormData()
      formData.append('content', this.youngerTeamData.content)
      axios
        .post(`/updateYoungerTeamContent/${this.category}`, formData)
        .then(({ data }) => {
          this.youngerTeamData = data
          generalStore().setSnackbar({ message: 'Shranjeno' })
        })
        .finally(() => {
          this.updatingContent = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
