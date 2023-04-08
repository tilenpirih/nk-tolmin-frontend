<template>
  <div>
    <v-layout wrap justify-space-between align-center class="mb-3">
      <v-flex xs12>
        <v-layout align-center>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab text small class="ml-3" color="grey darken-2" @click="prev">
            <v-icon>
              {{ mdiChevronLeft }}
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon>
              {{ mdiChevronRight }}
            </v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-calendar
      ref="calendar"
      v-model="focus"
      color="primary"
      style="min-height: 500px"
      :events="events"
      :event-color="getEventColor"
      :type="type"
      :weekdays="weekday"
      locale="sl"
      @click:event="showEvent"
      @click:more="viewDay"
      @change="updateRange"
    ></v-calendar>
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
        </v-toolbar>
        <v-card-text>
          <div v-if="selectedEvent.timed">
            {{ formatTime(selectedEvent.start, selectedEvent.end) }}
          </div>
          <span> {{ selectedEvent.description }}</span>
        </v-card-text>
      </v-card>
    </v-menu>
    test
  </div>
</template>

<script>
import { mdiDotsVertical, mdiChevronLeft, mdiChevronRight } from '@mdi/js'

export default {
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    focus: '',
    type: 'month',
    weekday: [1, 2, 3, 4, 5, 6, 0],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    mdiDotsVertical,
    mdiChevronLeft,
    mdiChevronRight,
  }),
  mounted() {
    this.$refs.calendar.checkChange()
    console.log(this.$refs)
  },
  methods: {
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
    formatWeekDay(props) {
      return new Date(props.date.replace(/-/g, '/')).toLocaleDateString('sl', {
        weekday: 'narrow',
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
