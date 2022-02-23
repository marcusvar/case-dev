
<template>
    <main class="flex-fill>">
        <div class="container">
            <h1>Thanks for your Shopping</h1>
            <section>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mb-4 mx-2 flex-even">                

                            <div class="card mt-4">
                                <div class="card-header">
                                    <h3>Products </h3>
                                </div>    
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li v-for="item in cart" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
                                            {{item.title}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Price Total<b>${{totalPrice}}</b>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div class="col-sm-6">
                            <div class="mb-4 mx-2 flex-even">
                            <div class="card mt-4">
                                <div class="card-header">
                                    <h3>Client Info</h3>
                                </div>    
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Name: {{client.name}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Address: {{client.address}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            City: {{client.city}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            State: {{client.state}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Country: {{client.zip}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Post Code: {{client.country}}
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Form of payment: {{client.parcels}} x {{client.parcels == 1 ? totalPrice : totalPrice/2}}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            </div>
                        </div>
                </div>    
            </section>        
        </div>    
    </main>          
</template>

<script>
import { computed } from "vue";
import {useStore} from "vuex";

export default {
    name: 'ThankYouPage',
    components: {
    },
    setup(){
        const store = useStore();

        let cart = computed(function () {
            return store.state.cart
        });

        let client = computed(function () {
            return store.state.client
        });


        let totalPrice = computed(function(){
            return cart.value.reduce((total, next) => {
                return total + (next.quantity * next.price)
            }, 0)
        })

        return {
            cart,
            client,
            totalPrice
        }
    }
}
</script>

<style>

</style>    