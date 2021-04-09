<template>
    <div>

        <b-card
            v-if="!loading"
        >
<!--            {{ getBird }}-->
            <h2 class="text-center">{{getSeller.name[1]}}</h2>
            <img width="100%" :src="`/storage/${getSeller.image}`" :alt="getSeller.name">
<!--            <span class="p-2">{{getBird.description[1]}}</span>-->
            <Field :field="getSeller.name"></Field>
            <Field :field="getSeller.description"></Field>
            <Field :field="getSeller.discount"></Field>
            <Field :field="getSeller.birds_count"></Field>
            <Field :field="getSeller.price"></Field>

            <b-button class="m-2" variant="primary">Посмотреть товары</b-button>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../components/fields/Field'

export default {
    name   : "SellerPage",
    components: {
        Field
    },
    data   : () => ({
        bird: null,
        loading : true
    }),
    computed: {
        ...mapGetters(['getSeller'])
    },
    methods: {
        ...mapActions(['fetchSeller'])
    },
    async mounted() {
        await this.fetchSeller(this.$route.params.id);

        this.loading = false;
    }
}
</script>

<style scoped>

</style>
