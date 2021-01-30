import Vue from "vue";
import Vuex from "../../vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 10,
  },
  getters: {
    getAge(state) {
      return state.age + 18;
    },
  },
  // vue中的方法唯一可以改状态方法,同步的
  mutations: {
    changeAge(state, payload) {
      state.age += payload;
    },
  },
  actions: {
    changeAge({ commit }, payload) {
      setTimeout(() => {
        commit("changeAge", payload);
      }, 2000);
    },
  },
  modules: {},
});
