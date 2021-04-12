<template>
    <div id="store">
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
                <b-card
                    v-for="seller of getSellers"
                    class="mb-2 card-item"
                    :title="seller.name"
                    :img-src="`/storage/${seller.image}`"
                    :img-alt="seller.name"
                    img-top
                    tag="article"

                    @click="()=>redirect(seller.id)"
                    :key="seller.id"
                >
                    <b-card-text>
                        {{ seller.description }}
                    </b-card-text>

                    <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "Store",
    mounted() {
        // this.$store.dispatch('fetchBirds');
    },
    computed: {
        ...mapGetters([
            'getSellers',
        ])
    },
    methods : {
        redirect(id) {
            this.$router.push(`/sellers/${id}`)
        }
    }
}
</script>

<style lang="scss">

</style>
