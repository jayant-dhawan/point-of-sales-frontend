import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    products: [],
    category: "",
    name: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      window.localStorage.user = JSON.stringify(payload);
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setCategory(state, payload) {
      state.category = payload;
    },
    setName(state, payload) {
      state.name = payload;
    }
  },
  actions: {
    setUser: ({ commit }, payload) => {
      commit("setUser", payload);
    },
    setProducts: ({ commit }, payload) => {
      commit("setProducts", payload);
    },
    setCategory: ({ commit }, payload) => {
      commit("setCategory", payload);
    },
    setName: ({ commit }, payload) => {
      commit("setName", payload);
    }
  },
  getters: {
    getProducts(state) {
      let products = state.products;
      if (state.category) {
        products = products.filter(el => el.category == state.category);
      }
      if (state.name) {
        products = products.filter(el =>
          el.productName.toLowerCase().includes(state.name)
        );
      }
      return products;
    },
    getCategories(state) {
      const set = new Set(state.products.map(ele => ele.category));
      return Array.from(set);
    }
  }
});
