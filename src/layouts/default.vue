<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app fixed>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">
          MY ID
        </v-subheader>
        <v-list>
          <!-- eslint-disable-next-line prettier/prettier -->
          <v-list-tile><v-list-tile-title v-text="localId" /></v-list-tile>
        </v-list>
        <v-subheader class="mt-3 grey--text text--darken-1">
          <span>PEER IDS</span>
          <v-spacer />
          <v-btn icon flat @click="onRefreshClick">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-subheader>
        <v-list>
          <v-list-tile
            v-for="peerId in peerIds"
            :key="peerId"
            :class="{ 'primary--text': isConnected({ peerId }) }"
            @click="onItemClick(peerId)"
          >
            <v-list-tile-title v-text="peerId" />
          </v-list-tile>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="remoteId" />
    </v-toolbar>
    <v-content><nuxt /></v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapState(['localId', 'remoteId', 'peerIds']),
    ...mapGetters(['isConnected'])
  },
  methods: {
    onRefreshClick() {
      this.refreshPeerIds()
    },
    onItemClick(peerId) {
      this.connect({ remoteId: peerId })
    },
    ...mapActions(['connect', 'refreshPeerIds'])
  }
}
</script>
