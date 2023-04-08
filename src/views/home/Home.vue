<template>
  <div>
    <div class="background" :style="`backgroundImage: url(${background})`">
      <v-layout class="tint" justify-center align-center>
        <div class="my-2 pa-3">
          <h1 class="white--text text-center tolminTitle hidden-xs-only">Nogometni klub Tolmin</h1>
          <h1 class="white--text text-center hidden-sm-and-up">Nogometni klub Tolmin</h1>
          <v-layout justify-center>
            <v-img :src="grbTolmin" class="my-2" width="150" height="150" contain />
          </v-layout>
          <h3 class="white--text text-center">Rdeče črni iz Tolmina, naj se piše zgodovina ...</h3>
        </div>
      </v-layout>
    </div>
    <LatestMatches />
    <Articles />
  </div>
</template>

<script>
import LatestMatches from '@/views/home/components/LatestMatches.vue'
import Articles from '@/views/home/components/Articles.vue'
import background from '@/assets/appBarBackground.jpg'
import grbTolmin from '@/assets/grb_NK_Tolmin.png'

export default {
  name: 'Home',
  components: { LatestMatches, Articles },
  data: () => ({
    background,
    grbTolmin,
  }),
}
</script>
<style scoped lang="scss">
.background {
  background-size: cover;
  background-position: center top;
  position: relative;
  width: 100%;
}
.tolminTitle {
  font-size: 50px;
}
.tint {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
}
</style>
