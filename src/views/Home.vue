<template>
  <div class="home container">
        <section class="container"> 
            <h1>PRODUCTS</h1>
            <div class="row">
                <div class="col-sm-6">
                  <form action="">
                    <div class="row row-cols-sm-2 form-floating">
                      <select v-on:change="sortProducts($event)" class="form-select">
                        <option selected>Select an option...</option>
                        <option value="title">Sort by Product Name</option>
                        <option value="price-asc">Sort by Price: lowest to highest</option>
                        <option value="price-desc">Sort by Price: highest to lowest</option>
                      </select>
                      <label for="selParcels" class="text-black-50">Filter</label>
                    </div>
                  </form>
                </div>
            </div>  
        </section>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
          <Product v-for="product in products" :product="product" :key="product.id" />
        </div>  

    </div>
</template>

<script>

import Product from "../components/Product.vue";

import {computed} from 'vue';
import {useStore} from "vuex";


export default {
  name: 'Home',
  components: {
    Product
  },
  setup(){
    const store = useStore();

    let products = computed(function () {
      return store.state.products
    });

    let cart = computed(function () {
      return store.state.cart
    });

    return {
      products,
      cart
    }
  },
  mounted() {
      this.$store.dispatch('loadProducts');
  },
  methods: {
      sortProducts(event) {      
          this.$store.commit("orderedProducts", event.target.value);
      }  
  }


}
</script>

