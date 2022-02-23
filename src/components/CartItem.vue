<template>
            <Product :product="product" />
</template>

<script>
import Product from "./Product.vue";
import {computed} from "vue";
import { useStore } from "vuex";
export default {
    name : "CartItem",
    props : ['product'],
    components : {
        Product
    },
    setup(props){

        const store = useStore();

        let cart = computed(function () {
            return store.state.cart
        });


        return {
            cart
        }
    }

}
</script>
<style scoped>
.cart-item-row{
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
}
.cart-remove-button{
    margin-top: 10px;
}
</style>