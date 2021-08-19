import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    nowProductId: -1,
    nowProductType: '',
    nowServiceId: -1,
    nowServicetType: '',
    activeIndex: -1,
    draw:false,
  },
  mutations: {
    nowProductId(state, pid) {
      state.nowProductId = pid
    },
    nowProductType(state, type) {
      state.nowProductType = type
    },
    nowServiceId(state, bid) {
      state.nowServiceId = bid
    },
    nowServicetType(state, type) {
      state.nowServicetType = type
    },
    activeIndex(state, index) {
      state.activeIndex = index
    },
    changeDraw(state,draw){
      state.draw = draw
    }
  },
  actions: {},
  modules: {}
})