<template>
    <b-card>
        <!--      NO MONEY      -->
        <b-modal id="modal-no-money-seller" header-bg-variant="danger" hide-footer>
            <p class="my-2">К сожалению у вас нет денег на открытие продавца</p>
        </b-modal>

        <Loader v-if="loading" />

        <div v-else>
            <h2 class="text-center">Покупка птиц</h2>
            <span>
                Здесь вы можете найти продавца, который продаст нужную вам птицу.
                У всех - своя особенность и своя история. У некоторых
                продавцов есть свой <b-link :to="{name: 'certificates'}">
                сертификат</b-link>,
                который влияет на характеристики птиц, яиц и штрафы.
                P.s Так можно экономить на покупки сертификатов ;)
            </span>

            <hr>
            <h2>Продавцы:</h2>

            <div class="mt-2 grid-cards-columns">
                <div
                    v-for="seller of getSellers"
                    :key="seller.id"
                    class="mb-2 card-item position-relative"
                >
                    <b-card
                        :title="seller.name"
                        :img-src="`/storage/${seller.image}`"
                        :img-alt="seller.name"
                        img-top
                        tag="article"
                        @click="()=>redirect(seller.id)"
                    >
                        <b-card-text>


                            {{ seller.description }}
                        </b-card-text>
                    </b-card>

                    <!-- show overlay if seller is not available for user -->
                    <div
                        class="card-img-overlay p-0 seller-overlay text-center"
                        v-if="getUserSellers
                            ? !getUserSellers.find(elem => {
                                return elem.id == seller.id
                            })
                            : true"
                    >
                        <div style="top: 50%; position:absolute;">
                            <b-button :to="`/sellers/${seller.id}`" class="mb-2">
                                Посмотреть продавца
                            </b-button>

                            <b-button variant="primary" @click="()=>openThisSeller(seller.id)">
                                Открыть продавца за {{ seller.price }}₽
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Loader from "../../components/Loader";

export default {
    name: "Store",
    components: {Loader},
    data: ()=>({loading: true}),
    async mounted() {
        await this.fetchSellers();
        this.loading = false;
    },
    computed: {
        ...mapGetters([
            'getSellers', 'getUserSellers'
        ])
    },
    methods : {
        redirect(id) {
            this.$router.push(`/sellers/${id}`)
        },
        ...mapActions(['fetchSellers', 'openSeller']),
        checkAvailable(sellerId) {
            return this.getUserSellers.find(elem => {
                // console.log(elem)
            });
        },
        async openThisSeller(sellerId) {
            if (await this.openSeller(sellerId))
                this.getUserSellers.push({id: sellerId})
            else this.$bvModal.show('modal-no-money-seller');
        }
    }
}
</script>

<style lang="scss" scoped>
.seller-overlay {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1000;
}
</style>
