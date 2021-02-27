import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    products: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      window.localStorage.user = JSON.stringify(payload);
    },
    setProducts(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    setUser: ({ commit }, payload) => {
      commit("setUser", payload);
    },
    setProducts: ({ commit }, payload) => {
      commit("setProducts", payload);
    }
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCategories(state) {
      return state.products.map(ele => ele.category);
    }
  }
});
