<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-warning border-bottom shadow-sm mb-3">
        <div class="container">
            <div class="row flex-grow-1">
                <div class="col align-self-start">
                    <router-link to="/" class="btn btn-warning btn-xs btn-block" >
                        <img alt="shopp-my" id="logo" src="../assets/logo-shopp-my.png">
                    </router-link>
                </div>
                <div class="col d-flex align-items-end flex-column">
                    <div class="mt-auto p-2">
                        <a href="#" v-on:click="displayCart" class="nav-link text-white">
                            <span class="counter badge rounded-pill bg-danger text- position-absolute ms-4 mt-0" style="z-index: 9999;">
                                <small>{{cart.reduce((total,qtd) => (total = total + qtd.quantity),0)}}</small>
                            </span>
                            <i class="bi-cart" style="font-size:24px;line-height:24px;"></i>
                        </a>
                    </div>        
                </div>        
            </div>
        </div>
    </nav>
    <div v-on:click="displayCart" id="cart-overlay" v-if="cartActive"></div>    
    <div id="cart-items" :class="{active:cartActive}">
        <div class="d-flex flex-row justify-content-end p-1">           
            <img v-on:click="displayCart" class="icon" alt="Fechar" src="../assets/close.png"/>
        </div>   
        <section class="productsCart">
            <h5 class="card-title">Your Cart<span v-if="cart.length == 0"> is Empty</span></h5>                          
            <div v-if="cart.length != 0" class="text-end">
                <ul class="scroll-cart list-group mb-3">
                    <li v-for="item in cart" :key="item.id" class="list-group-item py-3">
                        <div class="row g-3">
                            <div class="col-3">
                                <a href="#">
                                    <img :src="item.image" class="img-thumbnail">
                                </a>
                            </div>
                            <div class="col">
                                <h4 class="product-title">
                                    <b>{{item.title}}</b>
                                </h4>
                                <span class="text-dark">Price: $ {{item.price}}</span>
                            </div>
                            <!--div class="col-2">
                                    <button v-on:click="removeItem()" class="btn btn-outline-dark border-dark btn-sm" type="button">
                                        <i class="bi-trash" style="font-size: 16px; line-height: 16px;"></i>
                                    </button>
                            </div-->
                        </div>
                    </li>
                </ul>
                <h4 class="text-dark mb-3">
                    Total price: $ {{totalPrice}}
                </h4>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">                            
                    <router-link v-on:click="displayCart" to="/" class="btn btn-warning btn-xs btn-block" >Continue Shop</router-link>
                    <router-link v-on:click="displayCart" to="/shop" class="btn btn-warning btn-xs btn-block" >Checkout</router-link>
                </div>
                
            </div>
        </section>
    </div>    
</template>

<script>

import {computed} from 'vue';
import {useStore} from "vuex";

export default {
    name: 'Header',
    props : ['item'],

    setup(props){
        const store = useStore();

        let cart = computed(function () {
            return store.state.cart
        });

        let totalPrice = computed(function(){
            return cart.value.reduce((total, next) => {
                return total + (next.quantity * next.price)
            }, 0)
        })

        function removeItem(){
            console.log(props.item);
            store.commit("removeCartItem", props.item);
        }

        return {
            cart,
            totalPrice,
            removeItem
        }
    },
    data() {
        return {
            cartActive: false,
            productCart: null
        }
    },
    methods: {
        displayCart(){
            this.cartActive = !this.cartActive; 
        }
    }
}
</script>

<style scoped>
    header {
        background-color: var(--color-background-nav);
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    nav {
        display: flex;
        justify-content: space-between;
    }

    #logo {
        width: 130px;
        margin-top: 10px;
    }

    .icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    #cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 75%;
        height: 100vh;
        background-color: white;
        opacity: 0.8;
        z-index: 9999; 

    }
    #cart-items {
        padding: 30px;
        position: fixed;
        top: 0;
        right: 0;
        background-color: rgb(255, 255, 255);
        width: 30%;
        height: 100vh;
        display: none;
        flex-direction: column;
        justify-content: flex-start;
        box-shadow: 0 0 20px rgb(0 0 0 / 20%);
        padding-top: 10px;
        z-index: 9999; 
    }

    @media (max-width: 700px) {
        #cart-items {
            width: 90%;
        }
    }
    #cart-items.active {
        display: flex;
    }
    .productsCart {
        margin-top: 10px;
    }
    .button-close {
        left: 10px;
    }

    .scroll-cart{
        max-height: calc(100vh - 240px);
        margin-bottom: 10px;
        overflow:scroll;
        -webkit-overflow-scrolling: touch;
    }
    .product-title {
        font-size: 13px;
        color: black;
    }
    .img-thumbnail {
        width: 80px;
        height: 80px;
        object-fit: contain;
    }
    .counter {
        margin-top: -10px !important;
        margin-left: 15px !important;
    }
</style>