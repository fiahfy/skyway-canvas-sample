<template>
  <v-container fill-height class="pa-0">
    <canvas-container v-if="connected" />
    <v-layout v-else align-center justify-center>
      <v-flex>
        <div class="text-xs-center">
          <v-icon size="160" class="grey--text">edit</v-icon>
          <p class="title">Connect peer ID</p>
          <p class="subheading">
            Select a peer ID you want to connect on the side menu.
          </p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CanvasContainer from '~/components/CanvasContainer'

export default {
  components: {
    CanvasContainer
  },
  computed: {
    ...mapGetters(['connected'])
  }
}
</script>
