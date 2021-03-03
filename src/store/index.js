import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    products: [],
    category: "",
    name: "",
    cart: {
      products: [],
      subTotal: 0,
      total: 0,
      newVat: 0,
      vat: 0,
      discount: 0
    }
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
    },
    updateCart(state, payload) {
      state.cart = payload;
    },
    updateNewVat(state, payload) {
      state.cart.total = payload.total;
      state.cart.newVat = payload.newVat;
    },
    resetState(state, payload) {
      state = payload;
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
    },
    updateCart({ commit, state }, payload) {
      let cart = state.cart;
      cart.discount = 0;
      cart.subTotal = 0;
      cart.total = 0;
      cart.vat = 0;
      cart.newVat = 0;

      let index = cart.products.findIndex(el => el._id === payload._id);
      if (index == -1) {
        cart.products.push(payload);
      } else if (payload.count <= payload.available && payload.count > 0) {
        cart.products.splice(index, 1, payload);
        //cart.products[index].count = payload.count;
      } else if (payload.count <= 0) {
        cart.products = cart.products.filter(el => el._id !== payload._id);
      }

      cart.products.forEach(el => {
        cart.subTotal += el.price * el.count;
        cart.vat += (el.vat * (el.price * el.count)) / 100;
        cart.discount += (el.discount * (el.price * el.count)) / 100;
      });
      cart.newVat = payload.newVat;
      cart.total = cart.subTotal + cart.vat - cart.discount;

      commit("updateCart", cart);
    },
    updateNewVat({ commit, state }, payload) {
      let cart = state.cart;
      let total;
      if (payload && payload > 0) {
        total = cart.subTotal + payload - cart.discount;
        commit("updateNewVat", { total, newVat: payload });
      } else if (payload == 0) {
        total = cart.subTotal + cart.vat - cart.discount;
        commit("updateNewVat", { total, newVat: payload });
      }
    },
    emptyCart({ commit }) {
      let cart = {
        products: [],
        subTotal: 0,
        total: 0,
        vat: 0,
        discount: 0
      };
      commit("updateCart", cart);
    },
    resetState({ commit }) {
      const defaultState = {
        user: {},
        products: [],
        category: "",
        name: "",
        cart: {
          products: [],
          subTotal: 0,
          total: 0,
          newVat: 0,
          vat: 0,
          discount: 0
        }
      };
      commit("resetState", defaultState);
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
    },
    getCart(state) {
      return state.cart;
    },
    getRole(state) {
      return state.user.role;
    }
  },
  plugins: [createPersistedState()]
});
