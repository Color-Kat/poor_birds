<template>
    <div>
        <router-view></router-view>
        <b-card
            v-if="!loading"

        >
            <!--            {{ getBird }}-->
            <h2 class="text-center">{{ getSeller.name[1] }}</h2>
            <figure class="text-center">
                <img
                    width="60%" :src="`/storage/${getSeller.image}`"
                    :alt="getSeller.name"
                >
            </figure>
            <!--            <span class="p-2">{{getBird.description[1]}}</span>-->
            <Field :field="getSeller.name"></Field>
            <Field :field="getSeller.description"></Field>
            <Field :field="getSeller.discountText"></Field>
            <Field :field="getSeller.birds_count"></Field>
            <Field :field="getSeller.price"></Field>

            <hr>
            <h2>Птицы продавца</h2>

            <!--            <pre>{{ getSeller.birds }}</pre>-->
            <!--                    -->

            <div class="mt-2 grid-cards-columns">
                <b-card
                    v-for="bird of getSeller.birds"
                    class="mb-2 card-item"
                    :title="bird.name"
                    :img-src="`/storage/${bird.image}`"
                    :img-alt="bird.name"
                    tag="article"
                    :key="bird.id"
                >
<!--                    @click="()=>redirect(getSeller.id, bird.id)"-->
                    <b-card-text>
                        <!--                        <div class="d-flex justify-content-between align-items-center">-->
                        <span class="description">{{ bird.description }}</span>
                        <hr>

<!--                        // TODO добавить серитификат-->
                        <h6 class="d-inline" style="width: 10px !important; margin: 0 !important;">
                            <b-badge variant="danger">Спрос: {{ bird.demand }} яиц/час</b-badge>
                            <b-badge variant="warning">Плодоносность: {{ bird.fertility }} яиц/час</b-badge>
                            <b-badge variant="success">Бонус за заботу: {{ bird.fertility }} яиц/час</b-badge>
                            <b-badge variant="dark">Помет: {{ bird.litter }} ед/час</b-badge>
                            <b-badge variant="primary">Цена яйца: {{ bird.egg_price }}&#8381;</b-badge>
                        </h6>

                        <hr>

                        <b-button variant="primary" @click="()=>{buyBird(bird.pivot.id)}">
                            купить за {{Math.round(bird.price * (1 + getSeller.discount / 100)) }}&#8381;
                        </b-button>
                    </b-card-text>
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'

export default {
    name      : "SellerPage",
    components: {
        Field,
    },
    data      : () => ({
        bird   : null,
        loading: true
    }),
    computed  : {
        ...mapGetters(['getSeller'])
    },
    methods   : {
        ...mapActions(['fetchSeller', 'buyBird']),
        redirect(seller_id, bird_id) {
            // <!--TODO сделать страницу с птицей продавца-->
            this.$router.push(`/sellers/${seller_id}/birds/${bird_id}`)
        },
    },
    async mounted() {
        await this.fetchSeller(this.$route.params.id);

        this.loading = false;
    }
}
</script>

<style scoped>

</style>
