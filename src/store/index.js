let connection

export const state = () => ({
  localId: null,
  remoteId: null,
  peerIds: [],
  data: null
})

export const getters = {
  connected(state) {
    return !!state.remoteId
  },
  isConnected(state) {
    return ({ peerId }) => {
      return peerId === state.remoteId
    }
  }
}

export const actions = {
  connect({ commit, dispatch, getters }, { remoteId }) {
    if (getters.connected) {
      dispatch('disconnect')
    }
    const connection = this.$peer.connect(remoteId)
    console.log(connection)
    commit('setRemoteId', { remoteId })
    dispatch('handleConnection', { connection })
  },
  disconnect() {
    connection.close()
  },
  handleConnection({ commit }, { connection: con }) {
    connection = con
      .on('data', (data) => {
        console.log('connection data', data)
        commit('setData', { data })
      })
      .on('close', () => {
        console.log('connection close')
        connection = null
        commit('setRemoteId', { remoteId: null })
      })
  },
  send(_, { data }) {
    connection.send(data)
  },
  refreshPeerIds({ commit }) {
    this.$peer.listAllPeers((peers) => {
      commit('setPeerIds', { peerIds: peers })
    })
  }
}

export const mutations = {
  setLocalId(state, { localId }) {
    state.localId = localId
  },
  setRemoteId(state, { remoteId }) {
    state.remoteId = remoteId
  },
  setPeerIds(state, { peerIds }) {
    state.peerIds = peerIds
  },
  setData(state, { data }) {
    state.data = data
  }
}
