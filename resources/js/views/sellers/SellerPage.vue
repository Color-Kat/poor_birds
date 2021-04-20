<template>
    <div>
        <b-modal id="modal-bird-buy" title="Поздравляем! Вы купили птицу" hide-header>
            <p class="my-2">Поздравляем! Вы купили птицу "{{purchasedBirdName}}"</p>

            <template #modal-footer="{ ok, cancel, hide }">
                <b-button size="sm" variant="success" @click="ok()">
                    Oк
                </b-button>
            </template>
        </b-modal>

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

                        <h6 class="d-inline" style="width: 10px !important; margin: 0 !important;">
                            <b-badge variant="warning">Плодоносность: {{
                                    Math.round(bird.fertility * (1 + getSeller.fertility_bonus / 100))
                                }} яиц/час
                            </b-badge>
                            <b-badge variant="danger">Спрос: {{
                                    Math.round(bird.demand * (1 +
                                        getSeller.demand_bonus / 100))
                                }} яиц/час
                            </b-badge>
                            <b-badge variant="success">Бонус за заботу: {{
                                    Math.round(bird.care * (1 +
                                        getSeller.care_bonus / 100))
                                }}%
                            </b-badge>
                            <b-badge variant="dark">Помет: {{
                                    Math.round(bird.litter * (1 +
                                        getSeller.litter_bonus / 100))
                                }} ед/час
                            </b-badge>
                            <b-badge variant="primary">Цена яйца: {{
                                    Math.round(bird.egg_price * (1 +
                                        getSeller.price_bonus / 100))
                                }}&#8381;
                            </b-badge>
                        </h6>

                        <hr>

                        <b-button
                            variant="primary"
                            @click="()=>{
                                birdBuy({bird_id: bird.id, sold_bird_id: bird.pivot.id});
                                purchasedBirdName = bird.name
                            }"

                        >
                            купить за {{ Math.round(bird.price * (1 + getSeller.discount / 100)) }}&#8381;
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
        loading: true,
        purchasedBirdName: null
    }),
    computed  : {
        ...mapGetters(['getSeller'])
    },
    methods   : {
        ...mapActions(['fetchSeller', 'buyBird']),
        redirect(seller_id, bird_id) {
            // TODO сделать страницу с птицей продавца. Необязательно
            this.$router.push(`/sellers/${seller_id}/birds/${bird_id}`)
        },
        async birdBuy(ids) {
            let result = await this.buyBird(ids);
            if (result) this.$bvModal.show('modal-bird-buy');
        }
    },
    async mounted() {
        await this.fetchSeller(this.$route.params.id);

        this.loading = false;
    }
}
</script>

<style scoped>

</style>
