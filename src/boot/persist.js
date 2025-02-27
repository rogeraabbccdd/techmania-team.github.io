import { defineBoot } from '#q-app/wrappers'
import createPersistedState from 'vuex-persistedstate'
import { LocalStorage } from 'quasar'

export default defineBoot(({ store }) => {
  window.setTimeout(() => {
    createPersistedState({
      key: 'techmania',
      paths: [
        'user.jwt',
        'user.locale'
      ],
      storage: {
        getItem: key => LocalStorage.getItem(key),
        setItem: (key, value) => LocalStorage.set(key, value),
        removeItem: key => LocalStorage.remove(key)
      }
    })(store)
  }, 0)
})
