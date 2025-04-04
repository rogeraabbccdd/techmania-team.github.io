import { defineBoot } from '#q-app/wrappers'
import { LocalStorage } from 'quasar'

function syncState(state, store) {
  if (state) {
    for (const key in state) {
      store[key] = state[key]
    }
  }
}

// Edited from:
// https://github.com/TobyMosque/quasar-v2-ssr-pinia/blob/master/src/boot/persist-store.ts
export default defineBoot(({ store }) => {
  store.use(({ store, options }) => {
    if (process.env.SERVER) return

    if (options.persist) {
      const name = options.persist.key || store.$id
      let state = null
      state = LocalStorage.getItem(name)
      syncState(state, store)
      store.$subscribe((_, state) => {
        LocalStorage.set(name, state)
      })
    }
  })
})
