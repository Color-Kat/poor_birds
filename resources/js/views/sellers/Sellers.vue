<template>
    <b-card class="shadow card-rounded">
        <!--      NO MONEY      -->
        <b-modal id="modal-no-money-seller" header-bg-variant="danger" hide-footer>
            <p class="my-2">К сожалению у вас нет денег на открытие продавца</p>
        </b-modal>

        <!--      OPEN SELLER AND QUEST      -->
<!--        <b-modal id="modal-open-seller" header-bg-variant="success" hide-footer>-->
<!--            <p class="my-2">-->
<!--                <span>Вы открыли продавца!</span> <br>-->
<!--                <b-card class="mt-2">-->
<!--                    {{questMessage}}-->
<!--                </b-card>-->
<!--            </p>-->
<!--        </b-modal>-->

        <b-modal id="modal-open-seller" header-bg-variant="success" hide-footer hide-header
                 body-bg-variant="dark">
            <div class="quest-box">
                <div class="quest-box-inner">
                    <h1>Вы открыли продавца!</h1>
                    <p>
                        {{ questMessage }}
                    </p>
                </div>
            </div>

        </b-modal>

        <Loader v-if="loading" />

        <div v-else>
            <h1 class="text-center">Покупка птиц</h1>
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
                    class="mb-2 card-item position-relative shadow overflow-hidden"
                    style="border-radius: 24px !important; padding: 8px"
                >
                    <b-card
                        :title="seller.name"
                        :img-src="`/storage/${seller.image}`"
                        :img-alt="seller.name"
                        img-top
                        tag="article"
                        @click="()=>redirect(seller.id)"

                        body-class="border-0"
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

                            <b-button variant="primary" @click="()=>openThisSeller(seller)">
                                Открыть продавца за {{ seller.price.toLocaleString() }}₽
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
    data: ()=>({
        loading: true,
        questMessage: ''
    }),
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
        async openThisSeller(seller) {
            if (await this.openSeller(seller.id)) {
                this.getUserSellers.push({id: seller.id});
                this.questMessage = seller.quest;
                this.$bvModal.show('modal-open-seller');
            }
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
