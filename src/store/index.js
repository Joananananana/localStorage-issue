import { createStore } from 'vuex'
import book from './modules/book'
import actions from './actions'
import getters from './getters'
import store from './modules/home'
export default createStore({
  modules: {
    book,
    store
  },
  getters,
  actions
})
