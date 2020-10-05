import Vue from 'vue'
import Vuex from './kvue'

Vue.use(Vuex)

export default new Vuex.Store({ç
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      },1000) 
    }
  },
  getters: {
    doubleClick(state) {
      return state.counter*2
    }
  },
  modules: {
  }
})
