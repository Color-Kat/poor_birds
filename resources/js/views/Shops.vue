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
    },
    methods: {
        redirect(id) {
            this.$router.push(`/sellers/${id}`)
        }
    }
}
</script>

<style scoped lang="scss">
.grid-cards {
    //display: grid;
    //grid-template-columns: 1fr 1fr;
    //grid-gap: 8px;
    //column-count: 2;
    column-count: 2;
    //column-gap: 1.5em;
    //grid-auto-columns: max-content;
    //grid-template-rows: fit-content(40%);
    .card-item {
        display: inline-block;
        height: max-content;
        margin: 25px 0;
        width: 100%;
        cursor: pointer;

        transition: all .1s ease-in-out;

        &:hover{
            transform: scale(1.01);
        }

        .card-body{
            border: 2px solid #e5e5e5;
            border-top: 0;
            border-radius: 4px;
            padding: 7px !important;
        }
    }

    @media screen and (min-width: 2000px) {
        & {
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
            column-count: 4 !important;
        }
    }
    @media screen and (min-width: 1300px) {
        & {
            grid-template-columns: 1fr 1fr 1fr;
            column-count: 3;
        }
    }
    @media screen and (max-width: 950px) {
        & {
            grid-template-columns: 1fr !important;
            column-count: 1 !important;
        }
    }

    //.card-item {
    //    position: relative;
    //    padding-bottom: 40px;
    //
    //    .card-btn {
    //        position: absolute;
    //        bottom: 0;
    //        margin-bottom: 8px;
    //        left: 50%;
    //        transform: translateX(-50%);
    //        width: 90%;
    //    }
    //}
}
</style>
