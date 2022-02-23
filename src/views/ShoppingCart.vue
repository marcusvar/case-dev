<template>
    <main class="flex-fill>">
        <div class="container">
            <h1>Shopping Cart</h1>
            <section>
                <!--ul class="list-group">
                    <li v-if="!isMobile()" class="list-group-item py-3 bg-light">
                        <div class="row g-3">
                            <div class="col-4 col-md-3 col-lg-2">
                                <h5>Image</h5>
                            </div>
                            <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                                <h5>Product Description</h5>
                            </div>
                            <div class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                                <h5>Prices</h5>
                            </div>
                        </div>
                    </li-->    
                    <CartItem v-for="product in cart" :product="product" :key="product.id" />
                <!--/ul-->
            </section>
            <section>
                <ul class="list-group mt-3">
                    <li class="list-group-item py-3">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="mb-4 mx-2 flex-even">
                                    <div class="card card-total">
                                        <div class="card-header">
                                            <h3>Cart Total</h3>
                                        </div>    
                                        <div class="card-body">
                                            <h3 class="card-text">
                                                Total: ${{formatPrice(totalCart)}}
                                                <br/>
                                            </h3>
                                            <p class="card-text">
                                                Choose your payment method
                                                <br/>
                                            </p>
                                        </div>
                                        <div class="card-footer bg-transparent border-0">
                                            <router-link v-on:click="clearProductsCart" to="/" class="btn btn-warning btn-xs btn-block" >Cancel Shop</router-link>
                                        </div>    
                                    </div>    

                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-4 mx-2 flex-even">
                                    <div class="card card-total">
                                        <div class="card-header">
                                            <h3>Credit Card</h3>
                                        </div>    
                                        <div class="card-body">
                                            <form @submit.prevent="submitForm">
                                                <div class="form-floating mb-3">
                                                    <input v-model="name" type="text" id="txtName" class="form-control" placeholder=" " autofocus="" required>
                                                    <label for="txtNome" class="text-black-50">Name Printed on Card</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="card" type="text" id="txtCardNumber" class="form-control" placeholder=" ">
                                                    <label for="txtNumero" class="text-black-50">Card Number</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="validate" type="text" id="txtValidate" class="form-control" placeholder=" ">
                                                    <label for="txtValidade" class="text-black-50">Validate (mm/aa)</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="code" type="text" id="txtCode" class="form-control" placeholder=" ">
                                                    <label for="txtCodigo" class="text-black-50">Security code</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="address" type="text" id="txtAddress" class="form-control" placeholder=" ">
                                                    <label for="txtCodigo" class="text-black-50">Adress</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="city" type="text" id="txtCity" class="form-control" placeholder=" ">
                                                    <label for="txtCodigo" class="text-black-50">City</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="state" type="text" id="txtState" class="form-control" placeholder=" ">
                                                    <label for="txtCodigo" class="text-black-50">State</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="country" type="text" id="txtCountry" class="form-control" placeholder=" ">
                                                    <label for="txtCodigo" class="text-black-50">Country</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <input v-model="zip" type="text" id="txtZip" class="form-control" placeholder=" ">
                                                    <label for="txtCodigo" class="text-black-50">Post Code</label>
                                                </div>

                                                <div class="form-floating mb-3">
                                                    <select v-model="parcels" id="selParcels" class="form-select">
                                                        <option value="1" selected="">1 x ${{formatPrice(totalCart)}}</option>
                                                        <option v-if="totalCart > 50" value="2">2 x ${{formatPrice(totalCart/2)}}</option>
                                                    </select>
                                                    <label for="selParcelas" class="text-black-50">Parcels</label>
                                                </div>
                                                
                                                <div class="form-floating">
                                                    <button @click="$router.push('/success')" type="submit" class="btn btn-warning btn-xs btn-block" >Checkout</button>
                                                    <!--router-link to="/success" @click.prevent.stop="saveClient" class="btn btn-warning btn-xs btn-block" >Checkout</router-link-->
                                                </div>
                                            </form>
                                        </div>    
                                    </div>
                                </div>                
                            </div>
                        </div>
                    </li>
                </ul>    
            </section>

            
        </div>
    </main>
</template>

<script>

import CartItem from "../components/CartItem.vue";
import { computed } from "vue";
import {useStore} from "vuex";
import Header from '../components/Header.vue';

export default {
  name: 'ShoppingCart',
  components: {
    CartItem,
    Header
  },
  setup(){
    const store = useStore();

    let cart = computed(function () {
        return store.state.cart
    });

    function addClient(){
        console.log(this);
        const { name, card, validate, code, address, city, state, countri, zip, parcels } = this;
        store.commit("saveClient", { name, card, validate, code, address, city, state, countri, zip, parcels });
    }

    let totalCart = computed(function(){
        return cart.value.reduce((total, next) => {
            return total + (next.quantity * next.price)
        }, 0)
    })

    function clearProductsCart() {
        store.commit("clearCart")
    }

    let itemQuantity = computed(function(){
          let get_product = cart.value.filter((item) => item.id == props.product.id);

          return get_product[0].quantity;
    })

    function changeQuantity(action = 'add'){

        if(action == 'add'){
            props.product.quantity = props.product.quantity + 1;

            store.commit("updateCartItem", props.product);
        }else{

            if(props.product.quantity > 1){
                props.product.quantity = props.product.quantity - 1;
                store.commit("updateCartItem", props.product);
            }else{
                //Remove the item
                store.commit("removeCartItem", props.product)
            }
        }
    }

    return {
        cart,
        addClient,
        changeQuantity,
        itemQuantity,
        totalCart,
        clearProductsCart
    }
  },
  data() {
    return {
        name: "",
        card: "",
        validade: "",
        code: "",
        address: "", 
        city: "", 
        state: "", 
        country: "", 
        zip: "", 
        parcels: ""
    };

  },
  methods: {
    submitForm(e) {
        const { name, card, validate, code, address, city, state, countri, zip, parcels } = this;
        this.$store.commit('saveClient', { name, card, validate, code, address, city, state, countri, zip, parcels });
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    }
  }
}


</script>

<style scoped>

</style>