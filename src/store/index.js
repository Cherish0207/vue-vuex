import Vue from "vue";
import Vuex from "../../vuex/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    getAge(state) {
      console.log('getAge');
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
  modules: {
    a: {
      namespaced: true,
      state: {
        c:100
      },
      mutations: {
        changeAge(state, payload) {
          console.log('c update');
        }
      }
    },
    b: {
      namespaced: true,
      state: {
          d:100
      },
      getters: {
        getD(state) {
          return state.d + 100
        }
      },
      mutations: {
        changeAge(state, payload) {
          console.log('d update');
        }
      },
      modules: {
        c: {
          state: {
            e: 500
          },
          mutations: {
            changeAge(state, payload) {
              console.log('b/c update');
            }
          },
        }
      }
    }
  },
});
