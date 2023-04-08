<template>
  <div>
    <v-list-item :class="{ active: opened }" @click="opened = !opened">
      <v-list-item-icon class="mr-3">
        <v-icon class="dropdownIcon" :class="{ dropdownIconActive: opened }">
          {{ mdiMenuDown }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ page.text }}</v-list-item-title>
    </v-list-item>
    <v-expand-transition>
      <v-list-item-group v-if="opened">
        <v-list-item
          v-for="sublink in page.children"
          :key="sublink.text"
          :to="sublink.route"
          class="pl-5"
        >
          <v-list-item-title class="ml-6">{{ sublink.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-expand-transition>
  </div>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'

export default {
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mdiMenuDown,
    opened: false,
  }),
}
</script>

<style lang="scss" scoped>
.active {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
