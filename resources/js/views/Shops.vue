<template>
    <div id="store">
        <b-card>
            <h2 class="text-center">Покупка птиц</h2>
            <span>Вы можете покупать птиц у разных поставщиков. У каждого из которых разные полезные фишки.
            На базаре птицы дешевле, но у них нет сертификата, поэтому придется платить штрафы или покупать
            сертификат отдельно. Во всяких других организациях - другие условия: дороже яйца, но есть готовый
                сертификат. Сертификаты бывают разные: какие-то повышают цену яиц, какие-то спрос на яйца и так
                далее</span>

            <div class="mt-2 grid-cards">
                <b-card
                    class="mb-2 card-item"
                    v-for="seller of getSellers"
                    :title="seller.name"
                    :img-src="`/storage/${seller.image}`"
                    :img-alt="seller.name"
                    img-top
                    tag="article"

                    :key="seller.id"
                >
                    <b-card-text>
                        {{ seller.description }}
                    </b-card-text>

                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>
                </b-card>


                <!--                <b-card-->
                <!--                    title="Card Title"-->
                <!--                    img-src="https://picsum.photos/600/300/?image=25"-->
                <!--                    img-alt="Image"-->
                <!--                    img-top-->
                <!--                    tag="article"-->
                <!--                    style="max-width: 20rem;"-->
                <!--                    class="mb-2"-->
                <!--                >-->
                <!--                    <b-card-text>-->
                <!--                        Some quick example text to build on the card title and make up the bulk of the card's content.-->
                <!--                    </b-card-text>-->

                <!--                    <b-button href="#" variant="primary">Go somewhere</b-button>-->
                <!--                </b-card>-->
            </div>

        </b-card>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "Store",
    mounted() {
        // this.$store.dispatch('fetchBirds');
    },
    computed: {
        ...mapGetters([
            'getSellers',
        ])
    }
}
</script>

<style scoped lang="scss">
.grid-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;

    @media screen and (min-width: 2000px) {
        & {
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
        }
    }
    @media screen and (min-width: 1300px) {
        & {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 950px) {
        & {
            grid-template-columns: 1fr !important;
        }
    }

    .card-item {
        position: relative;
        padding-bottom: 40px;

        .card-btn {
            position: absolute;
            bottom: 0;
            margin-bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
        }
    }
}
</style>
