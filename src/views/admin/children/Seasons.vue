<template>
  <v-layout justify-center class="pt-3">
    <v-flex v-if="seasons" xs12 sm10 md9 lg8 xl7>
      <v-card v-for="(season, index) in seasons" :key="season.season_id" class="mb-3 pa-2">
        <v-layout justify-space-between align-center>
          <h2 class="text-center primary--text">{{ season.season_id }}</h2>
          <div>
            <v-btn
              small
              fab
              class="mr-3"
              @click.stop="expandedIndex = expandedIndex === index ? null : index"
            >
              <v-icon>{{ mdiPencil }}</v-icon>
            </v-btn>
            <v-btn small fab @click.stop="syncSeason(season.season_id)">
              <v-icon>{{ mdiSync }}</v-icon>
            </v-btn>
          </div>
        </v-layout>
        <v-expand-transition>
          <div v-show="index === expandedIndex">
            <v-text-field
              v-model="season.season_link"
              class="mt-3"
              label="season link"
              outlined
              :rules="[rules.required, rules.validUrl]"
            />
            <v-text-field
              v-model="season.clubs_link"
              label="clubs link"
              outlined
              :rules="[rules.required, rules.validUrl]"
            />
            <v-text-field
              v-model="season.scoreboard_link"
              label="scoreboard link"
              outlined
              :rules="[rules.required, rules.validUrl]"
            />
            <v-text-field
              v-model="season.statistics_link"
              label="statistics link"
              outlined
              :rules="[rules.required, rules.validUrl]"
            />
            <!-- <v-layout justify-space-between> -->
            <v-btn class="primary" @click="openDialog(index)">Shrani</v-btn>
          </div>
        </v-expand-transition>
        <!-- </v-layout> -->
      </v-card>
      <v-btn color="primary" @click.stop="newDialog = true">Nova sezona</v-btn>
      <v-dialog v-model="editDialog">
        <v-card class="pa-2">
          <h2>Še enkrat preverite če so vsi linki pravi.</h2>
          <div>
            <span class="font-weight-bold">club_id:</span> {{ seasons[selectedIndex].season_id }}
          </div>
          <div>
            <span class="font-weight-bold">season_link: </span>
            <a :href="seasons[selectedIndex].season_link" target="_blank">
              {{ seasons[selectedIndex].season_link }}
            </a>
          </div>
          <div>
            <span class="font-weight-bold">clubs_link: </span>
            <a :href="seasons[selectedIndex].clubs_link" target="_blank">
              {{ seasons[selectedIndex].clubs_link }}
            </a>
          </div>
          <div>
            <span class="font-weight-bold">scoreboard_link: </span>
            <a :href="seasons[selectedIndex].scoreboard_link" target="_blank">
              {{ seasons[selectedIndex].scoreboard_link }}
            </a>
          </div>
          <div>
            <span class="font-weight-bold">statistics_link: </span>
            <a :href="seasons[selectedIndex].statistics_link" target="_blank">
              {{ seasons[selectedIndex].statistics_link }}
            </a>
          </div>
          <v-btn class="primary mt-5" @click="save()">Shrani</v-btn>
          <v-btn class="ml-3 mt-5" @click="editDialog = false">Prekliči</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="newDialog">
        <v-card class="pa-2">
          <h2>Dodaj novo sezono. 2x preveri če so vsi linki pravilni</h2>
          test
          <v-text-field
            v-model="newSeason.season_link"
            class="mt-3"
            label="season link"
            outlined
            :rules="[rules.required, rules.validUrl]"
          />
          <v-text-field
            v-model="newSeason.clubs_link"
            label="clubs link"
            outlined
            :rules="[rules.required, rules.validUrl]"
          />
          <v-text-field
            v-model="newSeason.scoreboard_link"
            label="scoreboard link"
            outlined
            :rules="[rules.required, rules.validUrl]"
          />
          <v-text-field
            v-model="newSeason.statistics_link"
            label="statistics link"
            outlined
            :rules="[rules.required, rules.validUrl]"
          />
          <v-btn class="primary mt-5" @click.stop="addNewSeason()">Dodaj sezono</v-btn>
          <v-btn class="ml-3 mt-5" @click.stop="newDialog = false">Prekliči</v-btn>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
// import adminStore from '@/store/admin.js'
import { mdiSync, mdiPencil } from '@mdi/js'

export default {
  data: () => ({
    seasons: null,
    editDialog: false,
    newDialog: false,
    expandedIndex: null,
    selectedIndex: 0,
    rules: {
      required: (value) => !!value || 'Polje je obvezno',
      validUrl: (value) => {
        const regex = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
          'i',
        )
        return regex.test(value) || 'Vnesite veljaven url'
      },
    },
    newSeason: {
      season_link: '',
      clubs_link: '',
      scoreboard_link: '',
      statistics_link: '',
    },
    mdiSync,
    mdiPencil,
  }),
  mounted() {
    axios.get('seasons').then(({ data }) => {
      console.log(data)
      this.seasons = data
    })
  },
  methods: {
    openDialog(index) {
      this.editDialog = true
      this.selectedIndex = index
    },
    save() {
      axios.post('updateSeason', this.seasons[this.selectedIndex]).then(({ data }) => {
        console.log(data)
        this.seasons = data
        this.editDialog = false
      })
    },
    syncSeason(seasonID) {
      axios.post(`syncSeason/${seasonID}`).then(({ data }) => {
        console.log(data)
      })
    },
    addNewSeason() {
      axios.post('addSeason', this.newSeason).then(({ data }) => {
        console.log(data)
        this.seasons = data
        this.newDialog = false
      })
    },
    // saveSeason() {
    //   axios.put('seasons', this.seasons[this.selectedIndex]).then(({ data }) => {
    //     console.log(data)
    //     this.openDialog = false
    //   })
    // },
  },
}
</script>

<style lang="scss" scoped></style>
