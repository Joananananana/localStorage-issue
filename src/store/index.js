import { createStore } from 'vuex'
import book from './modules/book'
import actions from './actions'
import getters from './getters'
export default createStore({
  modules: {
    book
  },
  getters,
  actions
})
