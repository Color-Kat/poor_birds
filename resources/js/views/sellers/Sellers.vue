<template>
    <b-card>
        <h2 class="text-center">Покупка птиц</h2>
        <span>Вы можете покупать птиц у разных поставщиков. У каждого из которых разные полезные фишки.
            На базаре птицы дешевле, но у них нет сертификата, поэтому придется платить штрафы или покупать
            сертификат отдельно. Во всяких других организациях - другие условия: дороже яйца, но есть готовый
                сертификат. Сертификаты бывают разные: какие-то повышают цену яиц, какие-то спрос на яйца и так
                далее</span>

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

                        <b-button variant="primary">
                            Открыть продавца за {{seller.price}}₽
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "Store",
    mounted() {
        this.fetchSellers();
        // setTimeout(()=>console.log(this.getUserSellers), 1000);
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
        ...mapActions(['fetchSellers']),
        checkAvailable(sellerId) {
            console.log(2132)
            return this.getUserSellers.find(elem => {
                console.log(elem)
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .seller-overlay{
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        z-index: 1000;
    }
</style>
