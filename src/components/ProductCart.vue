<template>
    <div class="col mb-4">
        <div class="card">
            <img :src="product.image" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">
                ${{product.price}}
                <br/>
                <small>
                {{product.shortdesc}}
                {{this.$route.name}}
                </small>
            </p>
            <button @click="addToCart()" class="btn btn-primary btn-block" :disabled="itemAlreadyInCart">{{itemAlreadyInCart? "Added" : "Add to Cart"}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
    name : "ProductCart",
    props : ['product'],

    setup(props){

        const store = useStore();

        let cart = computed(function () {
            return store.state.cart
        });

        let itemAlreadyInCart = computed(function() {
            let inCart = false;

            cart.value.forEach(item => {
                if(item.id == props.product.id){
                    inCart = true;
                }
            });

            return inCart;
        });

        function addToCart(){
            if(!itemAlreadyInCart.value){
                store.commit("addCartItem", props.product);
            }else{
                alert("Item already added to Cart");
            }
        }

        return {
            cart,
            itemAlreadyInCart,
            addToCart
        }
    }
}
</script>


<style scoped>

.card-img-top {
    width: 100%;
    height: 18vw;
    object-fit: contain;
}

.card {
    padding-top: 10px;
}

</style>