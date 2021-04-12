<template>
    <div>
        <b-card
            v-if="!loading"
        >

            <b-alert v-if="!getBird" variant="warning">
                <span>Такой птицы нет в продаже:(</span>
                <b-button :to="{name: 'birds'}">Посмотреть других птиц</b-button>
            </b-alert>


            <div v-else>
                <!--            {{ getBird }}-->
                <h2 class="text-center">{{ getBird.name[1] }}</h2>
                <img width="100%" :src="`/storage/${getBird.image}`" :alt="getBird.name">
                <!--            <span class="p-2">{{getBird.description[1]}}</span>-->
                <Field :field="getBird.name"></Field>
                <Field :field="getBird.description"></Field>
                <Field :field="getBird.fertility"></Field>
                <Field :field="getBird.care"></Field>
                <Field :field="getBird.demand"></Field>
                <Field :field="getBird.litter"></Field>
                <Field :field="getBird.price"></Field>

                <!--            Если страница продавца, то отобразить кнопку купить-->
                <!--            <b-button class="m-2" variant="primary">Купить</b-button>-->

                <hr>
                <h2 class="text-center">Где купить?</h2>
                <!--            TODO описание   -->
                <span class="mb-2">Птицы могут продаваться у разных продавцов. У каких-то дешевле, у каких-то дороже.
            Но птицы у разных продавцов отличаются: у кого-то бонус к спросу, у кого-то на кол-во поноса...</span>
                <b-button
                    v-for="seller of getBird.sellers"
                    :to="`/sellers/${seller.id}`"
                    :key="seller.id"
                    variant="primary"
                    class="m-1"
                >
                    <img height="30px" :src="`/storage/${seller.image}`" alt="">
                    {{
                        seller.name
                    }}
                </b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'

export default {
    name      : "BirdPage",
    components: {
        Field
    },
    data      : () => ({
        bird   : null,
        loading: true,
    }),
    computed  : {
        ...mapGetters(['getBird'])
    },
    methods   : {
        ...mapActions(['fetchBird'])
    },
    async mounted() {
        await this.fetchBird({
            bird_id  : this.$route.params.bird_id,
            seller_id: this.$route.params.seller_id
        });
        this.loading = false;
    }
}
</script>

<style scoped>

</style>
