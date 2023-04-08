<template>
  <v-menu v-model="hover" bottom offset-y open-on-hover min-width="200">
    <template #activator="{ on, attrs }">
      <v-tab class="text-none" :class="{ dropdownActivated: hover }" dark v-bind="attrs" v-on="on">
        <v-btn
          class="text-none secondary tabButton"
          dark
          tile
          text
          v-bind="attrs"
          :ripple="false"
          @click.stop=""
          v-on="on"
        >
          {{ tab.text }}
          <v-icon class="dropdownIcon">
            {{ mdiMenuDown }}
          </v-icon>
        </v-btn>
      </v-tab>
    </template>
    <div>
      <v-card dark class="secondary menu">
        <v-list nav class="transparent">
          <v-list-item v-for="sub in tab.children" :key="sub.route" :to="sub.route">
            {{ sub.text }}
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'

export default {
  props: {
    tab: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mdiMenuDown,
    hover: false,
  }),
}
</script>

<style lang="scss" scoped>
::v-deep.v-menu__content {
  margin-top: -4px;
}
.menu {
  margin-top: 4px;
}
::v-deep.v-list-item {
  color: rgba(255, 255, 255, 0.6) !important;
}
::v-deep.v-list-item--active {
  color: white !important;
}
::v-deep.v-list-item:hover {
  color: white !important;
}
</style>
