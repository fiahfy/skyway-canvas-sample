import Peer from 'skyway-js'

export default ({ store }) => {
  const peer = new Peer({
    key: process.env.SKYWAY_API_KEY,
    debug: 3
  })
    .on('open', (id) => {
      console.log('open %o', id)
      store.commit('setLocalId', { localId: id })
      store.dispatch('refreshPeerIds')
    })
    .on('connection', (connection) => {
      console.log('connection %o', connection)
      const remoteId = connection.remoteId
      store.commit('setRemoteId', { remoteId })
      store.dispatch('handleConnection', { connection })
    })
    .on('close', () => {
      console.log('close')
    })
    .on('disconnected', (id) => {
      console.log('disconnected %o', id)
    })
    .on('error', (e) => {
      console.log('error %o', e)
      store.commit('setRemoteId', { remoteId: null })
    })
  store.$peer = peer
}
