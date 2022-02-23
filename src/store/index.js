import { createStore } from "vuex";
import api from '@/services/api.js';
import _ from 'lodash';

export default createStore({
  state: {
    products: [],
    cart: [],
    client: [],
    sort: '',
    order: 'asc' 
  },
  getters: {
    allProducts: (state) => state.products
  },
  actions: {
    loadProducts({ commit }) {
      api.get('/products')
        .then(r => r.data)
        .then(products => {
          commit('SET_PRODUCTS', products);               
        })
    }
  },
  mutations: {
    saveClient(state, item) {
      state.client = item;
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    addCartItem(state, item) {
      item.quantity = 1;
      state.cart.push(item);
    },
    updateCartItem(state, updatedItem) {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id == updatedItem.id) {
          return updatedItem;
        }
        return cartItem;
      });
    },
    removeCartItem(state, item) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id != item.id;
      });
    },
    clearCart(state) {
      state.cart = [];
    },
    orderedProducts(state, value) {
      const params = value.split("-");
      state.sort  = params[0];
      state.order = params[1];
      state.products = _.orderBy(state.products, state.sort, state.order);
    }    
  }
});