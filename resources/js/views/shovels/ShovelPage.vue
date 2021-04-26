<template>
    <div>
        <b-card
            v-if="!loading"
        >

            <b-alert v-if="!getShovel" variant="warning">
                <span>Такой лопаты нет в продаже:(</span>
                <b-button :to="{name: 'shovels'}">Посмотреть другие</b-button>
            </b-alert>


            <div v-else>
                <!--            {{ getShovel }}-->
                <h2 class="text-center">{{ getShovel.name[1] }}</h2>
                <img width="100%" :src="`/storage/${getShovel.image}`" :alt="getShovel.name">
                <!--            <span class="p-2">{{getShovel.description[1]}}</span>-->
                <Field :field="getShovel.name"></Field>
                <Field :field="getShovel.efficiency"></Field>
                <Field :field="getShovel.price"></Field>

                <b-button v-if="!getShovel.isDonate" class="mt-3" variant="primary">Купить</b-button>
                <b-button v-else class="mt-3" variant="primary">Купить за донат</b-button>

                <hr>

                <h2 class="text-center">Зачем нужны лопаты??</h2>
                <span class="mb-2">Ваши птицы постоянно производят помёт, им не нравится жить в нем, поэтому они
                    начинают нести меньше яиц (за каждые 100 ед.помёта плодоносность падает на 5%). Чтобы птицы
                    всегда исправно несли вам яйца, нужно за ними убираться. Для этого и нужны лопаты. У каждой
                    лопаты есть характеристика "эффективность" - это то, сколько ед.помёта лопата убирает за 1
                    использование.</span>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'

export default {
    name      : "ShovelPage",
    components: {
        Field
    },
    data      : () => ({
        shovel : null,
        loading: true,
    }),
    computed  : {
        ...mapGetters(['getShovel'])
    },
    methods   : {
        ...mapActions(['fetchShovel'])
    },
    async mounted() {
        await this.fetchShovel(this.$route.params.id);
        this.loading = false;
    }
}
</script>

<style scoped>

</style>
