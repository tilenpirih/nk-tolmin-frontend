<template>
  <v-layout justify-center class="pt-3">
    <v-flex xs12 sm11 md10 lg9 xl8>
      <v-layout wrap justify-space-between align-center class="mb-3">
        <v-flex xs12 sm6>
          <v-layout align-center>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon>
                {{ mdiChevronLeft }}
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon>
                {{ mdiChevronRight }}
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar" class="ml-3">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6>
          <v-layout :justify-end="$vuetify.breakpoint.smAndUp">
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
        </v-flex>
        <!-- <v-menu bottom right>
            <template #activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  {{ mdiMenuDown }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
      </v-layout>

      <v-sheet min-height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          style="min-height: 600px"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :weekdays="weekday"
          locale="sl"
          @click:event="showEvent"
          @click:more="viewDay"
          @change="updateRange"
        >
          <template #event="{ event }">
            <span class="mx-1">
              <b v-if="event.start.getMinutes() != 0">
                {{ event.start.getHours().toString().padStart(2, '0') }}:{{
                  event.start.getMinutes()
                }}
              </b>
              <b v-else-if="event.start.getHours() != 0">
                {{ event.start.getHours().toString().padStart(2, '0') }}h
              </b>
              {{ event.name }}
              <span v-if="category == 'VSI'">
                - <b> {{ event.category }}</b>
              </span>
            </span>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="deleteEvent(selectedEvent.id)">
                <v-icon>{{ mdiDelete }}</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div v-if="selectedEvent.timed">
                {{ formatTime(selectedEvent.start, selectedEvent.end) }}
              </div>
              <span> {{ selectedEvent.description }}</span>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
      <h2 class="primary--text mt-4">Dodaj dogodek</h2>
      <h3>Začetek dogodka:</h3>
      <v-switch
        v-model="newEvent.timed"
        :disabled="category == 'VSI'"
        label="Dogodek vsebuje čas"
      ></v-switch>
      <v-form v-model="valid">
        <v-layout wrap>
          <v-flex xs12 sm6 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="formatedStartDate"
                  label="Začetek dogodka"
                  :prepend-inner-icon="mdiCalendar"
                  :rules="[rules.required]"
                  :disabled="category == 'VSI'"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newEvent.startDate"
                color="primary"
                locale="sl"
                first-day-of-week="1"
                @input="menu1 = false"
                @change="newEvent.endDate = newEvent.startDate"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
            <v-menu
              ref="startMenuTime"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="newEvent.startTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="newEvent.startTime"
                  label="Čas dogodka"
                  :prepend-inner-icon="mdiClockTimeFourOutline"
                  readonly
                  :rules="newEvent.timed === true ? [rules.required] : []"
                  :disabled="!newEvent.timed || category == 'VSI'"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="newEvent.startTime"
                format="24hr"
                color="primary"
                full-width
                @click:minute="$refs.startMenuTime.save(newEvent.startTime)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <h3>Konec dogodka:</h3>
          </v-flex>
          <v-flex xs12 sm6 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="formatedEndDate"
                  label="Konec dogodka"
                  :prepend-inner-icon="mdiCalendar"
                  :rules="[rules.required]"
                  :disabled="category == 'VSI'"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newEvent.endDate"
                first-day-of-week="1"
                color="primary"
                locale="sl"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
            <v-menu
              ref="endMenuTime"
              v-model="menu4"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="newEvent.endTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="newEvent.endTime"
                  label="Čas konec dogodka"
                  :prepend-inner-icon="mdiClockTimeFourOutline"
                  :rules="newEvent.timed === true ? [rules.required] : []"
                  readonly
                  :disabled="!newEvent.timed || category == 'VSI'"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu4"
                v-model="newEvent.endTime"
                :disabled="!newEvent.timed"
                format="24hr"
                color="primary"
                full-width
                @click:minute="$refs.endMenuTime.save(newEvent.endTime)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
            <v-text-field
              v-model="newEvent.name"
              :rules="[rules.required]"
              :disabled="category == 'VSI'"
              label="Ime dogodka"
            />
          </v-flex>
          <v-flex xs12 sm6 :class="{ 'pl-2': $vuetify.breakpoint.smAndUp }">
            <v-text-field
              v-model="newEvent.description"
              label="Opis dogodka"
              :disabled="category == 'VSI'"
            />
          </v-flex>
          <v-flex xs12 sm6 :class="{ 'pr-2': $vuetify.breakpoint.smAndUp }">
            <v-layout align-center>
              <v-menu
                v-model="menu5"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    :value="newEvent.color"
                    label="Barva dogodka"
                    :prepend-inner-icon="mdiPalette"
                    :rules="[rules.required]"
                    :disabled="category == 'VSI'"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-color-picker
                  v-if="menu5"
                  :value="newEvent.color"
                  :swatches="swatches"
                  show-swatches
                  dot-size="25"
                  mode="hexa"
                  @update:color="updateColor"
                />
              </v-menu>
              <v-card width="50" height="30" class="ml-3" :color="newEvent.color"></v-card>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-btn color="primary" :disabled="!valid || category == 'VSI'" @click.stop="addEvent()">
          Dodaj dogodek
        </v-btn>
        <!-- {{ newEvent.startDate }} {{ newEvent.startTime }} {{ newEvent.endDate }}
        {{ newEvent.endTime }} -->
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiMenuDown,
  mdiCalendar,
  mdiClockTimeFourOutline,
  mdiPalette,
  mdiDelete,
} from '@mdi/js'
import throttle from 'lodash/throttle'

export default {
  data: () => ({
    focus: '',
    valid: false,
    type: 'month',
    weekday: [1, 2, 3, 4, 5, 6, 0],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    category: 'U7',
    categories: ['VSI', 'U7', 'U9', 'U11', 'U13', 'U15', 'U17', 'U19'],
    newEvent: {
      name: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      color: '#4CAF50',
      timed: true,
      description: '',
    },
    rules: {
      required: (value) => !!value || 'Polje je obvezno',
    },
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    swatches: [['#4CAF50'], ['#3F51B5'], ['#673AB7'], ['#FF9800'], ['#FF2626']],
    dateRange: {},
    mdiChevronLeft,
    mdiChevronRight,
    mdiMenuDown,
    mdiCalendar,
    mdiClockTimeFourOutline,
    mdiPalette,
    mdiDelete,
  }),
  computed: {
    formatedStartDate() {
      return this.newEvent.startDate ? this.newEvent.startDate.split('-').reverse().join('.') : null
    },
    formatedEndDate() {
      return this.newEvent.endDate ? this.newEvent.endDate.split('-').reverse().join('.') : null
    },
  },
  created() {
    const categ = localStorage.getItem('category')
    if (categ) {
      this.category = categ
    }
  },
  mounted() {
    this.$refs.calendar.checkChange()
    console.log(this.$refs)
  },
  methods: {
    updateColor: throttle(function ({ hex }) {
      this.newEvent.color = hex
    }, 300),
    formatTime(start, end) {
      if (start && end) {
        const parseStart = start.toLocaleTimeString('sl', {
          hour: '2-digit',
          minute: '2-digit',
        })
        const parseEnd = end.toLocaleTimeString('sl', {
          hour: '2-digit',
          minute: '2-digit',
        })
        return `${parseStart} - ${parseEnd}`
      }
      return null
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // eslint-disable-next-line no-return-assign
        requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      this.dateRange = { start, end }
      axios
        .get(`getEvents/${this.category}`, {
          params: {
            start: start.date,
            end: end.date,
          },
        })
        .then(({ data }) => {
          data.forEach((event) => {
            event.start = new Date(event.start)
            event.end = new Date(event.end)
          })
          console.log(data)
          this.events = data
        })
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    changeStartDate(date) {
      this.newEvent.endDate = this.newEvent.startDate
    },
    addEvent() {
      axios
        .post('/addEvent', {
          name: this.newEvent.name,
          start: this.newEvent.timed
            ? `${this.formatedStartDate} ${this.newEvent.startTime}`
            : this.formatedStartDate,
          end: this.newEvent.timed
            ? `${this.formatedEndDate} ${this.newEvent.endTime}`
            : this.formatedEndDate,
          color: this.newEvent.color,
          timed: this.newEvent.timed,
          description: this.newEvent.description,
          category: this.category,
        })
        .then(({ data }) => {
          data.start = new Date(data.start)
          data.end = new Date(data.end)
          this.events.push(data)
          // this.$refs.calendar.checkChange()
        })
    },
    changeCategory() {
      localStorage.setItem('category', this.category)
      this.updateRange(this.dateRange)
    },
    formatWeekDay(props) {
      return new Date(props.date.replace(/-/g, '/')).toLocaleDateString('sl', {
        weekday: 'narrow',
      })
    },
    deleteEvent(id) {
      axios.delete(`/deleteEvent/${id}`).then(() => {
        this.events = this.events.filter((event) => event.id !== id)
        this.selectedOpen = false
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
