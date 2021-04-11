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
                <!--                <b-card-->
                <!--                    v-for="bird of getSeller.birds"-->
                <!--                    class="mb-2 card-item"-->
                <!--                    :title="bird.name"-->
                <!--                    :img-src="`/storage/${bird.image}`"-->
                <!--                    :img-alt="bird.name"-->
                <!--                    tag="article"-->
                <!--                    @click="()=>redirect(bird.id)"-->
                <!--                    :key="bird.id"-->
                <!--                >-->
                <!--                    <b-card-text>-->
                <!--&lt;!&ndash;                        <div class="d-flex justify-content-between align-items-center">&ndash;&gt;-->
                <!--                            <span class="description">{{ bird.description.slice(0, 100) + '...' }}</span>-->
                <!--&lt;!&ndash;                            <b-badge variant="primary">5000000P</b-badge>&ndash;&gt;-->
                <!--&lt;!&ndash;                        </div>&ndash;&gt;-->
                <!--                    </b-card-text>-->
                <!--                </b-card>-->
                <b-card
                    v-for="bird of getSeller.birds"
                    class="mb-2 card-item"
                    :title="bird.name"
                    :img-src="`/storage/${bird.image}`"
                    :img-alt="bird.name"
                    tag="article"
                    @click="()=>redirect(getSeller.id, bird.id)"
                    :key="bird.id"
                >
                    <b-card-text>
                        <!--                        <div class="d-flex justify-content-between align-items-center">-->
                        <span class="description">{{ bird.description }}</span>
                        <hr>

                        <h4 class="d-inline" style="width: 10px !important; margin: 0 !important;">
                            <b-badge variant="primary">Спрос: {{ bird.demand }} яиц/час</b-badge>

                            <!--         PRICE         -->
                            <b-badge variant="primary">
                                {{
                                    bird.price * (1 + getSeller.discount / 100)
                                }}&#8381;
                            </b-badge>

                            <b-badge variant="primary">Плодоносность: {{ bird.fertility }} яиц/час</b-badge>
                            <b-badge variant="primary">Помет: {{ bird.litter }} ед/час</b-badge>
                        </h4>
                        <!--                            <b-badge variant="primary">5000000P</b-badge>-->
                        <!--                        </div>-->
                    </b-card-text>
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../components/fields/Field'

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
        ...mapActions(['fetchSeller']),
        redirect(seller_id, bird_id) {
            this.$router.push(`/sellers/${seller_id}/birds/${bird_id}`)
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
