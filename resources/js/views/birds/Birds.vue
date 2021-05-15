<template>
    <b-card>
        <Loader v-if="loading" />

            <div v-else>
                <h2 class="text-center">Список птиц</h2>
                <span>В этом списке находятся все птицы. У них самые разные характеристики: плодоносность, спрос на яйца,
                    количество помёта в час, бонус за заботу, цена одного яйца. Но это просто список всех птиц в игре,
                    купить птиц можно только у <b-link :to="{name: 'sellers'}">продавцов</b-link>. На странице самой
                    птицы так же есть информация, где её можно купить
                </span>

                <hr>
                <h2>Птицы:</h2>

                <div class="mt-2 grid-cards-columns">
                    <b-card
                        v-for="bird of getBirds"
                        class="mb-2 card-item"
                        :title="bird.name"
                        :img-src="`/storage/${bird.image}`"
                        :img-alt="bird.name"
                        img-top
                        tag="article"

                        @click="()=>redirect(bird.id)"
                        :key="bird.id"
                    >
                        <b-card-text>
                            {{ bird.description.slice(0, 100) }}
                            {{ bird.description.length > 100 ? '...' : '' }}
                            <hr>
                            <b-badge variant="warning">
                                Плодоносность: {{bird.fertility}} яиц/час
                            </b-badge>
                            <b-badge variant="dark">
                                Помёт: {{bird.litter}} ед/час
                            </b-badge>
                            <b-badge variant="danger">
                                Спрос: {{bird.demand}} яиц/час
                            </b-badge>
                            <h4>
                                <b-badge variant="primary">
                                    Цена: {{bird.price}}₽
                                </b-badge>
                            </h4>
                        </b-card-text>

                        <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
                    </b-card>
                </div>
            </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Loader from "../../components/Loader";

export default {
    name      : "Store",
    components: {Loader},
    data      : () => ({loading: true}),
    async mounted() {
        // this.$store.dispatch('fetchBirds');
        await this.fetchBirds();
        this.loading = false
    },
    computed: {
        ...mapGetters([
            'getBirds',
        ])
    },
    methods : {
        redirect(id) {
            this.$router.push(`/birds/${id}`)
        },
        ...mapActions(['fetchBirds'])
    }
}
</script>

<style lang="scss">

</style>
