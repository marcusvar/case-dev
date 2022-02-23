<template>
    <div v-if="getRoutePath === '/'" class="col mb-4 product-card-item">
        <div class="card h-100">
            <img :src="product.image" class="card-img-top rounded mx-auto d-block" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{product.title}}</h5>
                <p class="card-text">
                    <b class="price">${{formatPrice(product.price)}}</b>
                    <br/>
                    <small>
                    {{product.shortdesc}}
                    </small>
                </p>
            </div>
            <div class="card-footer bg-transparent border-0">
                <button @click="addToCart()" class="btn btn-warning btn-xs btn-block" :disabled="itemAlreadyInCart">{{itemAlreadyInCart? "Added" : "Add to Cart"}}</button>
                &nbsp;
                <button @click="removeItem()" class="btn btn-warning btn-xs btn-block" :hidden="!itemAlreadyInCart">{{!itemAlreadyInCart? "Added" : "Remove to Cart"}}</button>
            </div>    
        </div>
    </div>
    <!--tr v-else-->

    <li v-else class="list-group-item py-3">
        <div class="row g-3">
            <div class="col-4 col-md-3 col-lg-2">
                <a href="#">
                    <img :src="product.image" class="img-thumbnail">
                </a>
            </div>
            <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                <h4 class="product-title"><b>{{product.title}}</b></h4>
                <h5 class="truncate product-description">
                    {{product.description}}
                </h5>
            </div>

            <div class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                <div class="input-group">
                    <button @click="changeQuantity('decrease')" class="btn btn-outline-dark btn-sm" type="button">
                        <i class="bi bi-dash" style="font-size: 16px; line-height: 16px;"></i>
                    </button>
                    <div class="col text-center border border-dark">{{itemQuantity}}</div>
                    <button @click="changeQuantity()" class="btn btn-outline-dark btn-sm" type="button">
                        <i class="bi bi-plus" style="font-size: 16px; line-height: 16px;"></i>
                    </button>
                    <button @click="removeItem()" class="btn btn-outline-dark border-dark btn-sm" type="button">
                        <i class="bi-trash" style="font-size: 16px; line-height: 16px;"></i>
                    </button>
                </div>
                <div class="text-end mt-2">
                    <small class="text-secondary">Unit Value: R{{formatPrice(product.price)}}</small><br>
                    <span class="text-dark">Total Price: ${{formatPrice(itemTotalPrice)}}</span>
                </div>
            </div>
        </div>
    </li> 
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
    name : "Product",
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

        function removeItem(){
            store.commit("removeCartItem", props.product)
        }

        let itemQuantity = computed(function(){
             let get_product = cart.value.filter((item) => item.id == props.product.id);
             return get_product[0].quantity;
        })

        let itemTotalPrice = computed(function(){
             let get_product = cart.value.filter((item) => item.id == props.product.id);
             return (get_product[0].quantity * get_product[0].price);
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
            itemAlreadyInCart,
            addToCart,
            removeItem,
            itemQuantity,
            changeQuantity,
            itemTotalPrice
        }
    },
    computed: {
        getRoutePath() {
          return this.$route.path;
        }
     },
     methods: {
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
     }
}
</script>


<style scoped>

.card-img-top {
    width: 80%;
    height: 13vw;
    object-fit: contain;

}
@media (max-width: 700px) {
    .card-img-top {
        width: 90%;
        height: 40vw;
    }
}
.image-card {
    height: 70px;
}
.card {
    padding-top: 20px;
}
.truncate {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.img-thumbnail {
    width: 990px;
    height: 90px;
    object-fit: contain;
}
.product-card-item {
    margin-top: 15px;
}
.product-title {
    font-size: 18px;
}
.product-description {
    font-size: 16px;
}
.card-title {
    font-size: 15px;
    font-weight: 700;
}
.price {
    font-size: 18px;
};
</style>