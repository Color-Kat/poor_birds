<template>
    <div>
        <Loader v-if="loading" />

        <b-card
            v-else
            class="shadow"
        >
            <b-alert show v-if="!getBird" variant="warning">
                <h1>Такой птицы нет в продаже:(</h1>
                <b-button :to="{name: 'birds'}" size="sm" class="mt-2" variant="danger">Посмотреть других
                    птиц</b-button>
            </b-alert>


            <div v-else>
                <h1 class="text-center">{{ getBird.name[1] }}</h1>
                <img width="100%" :src="`/storage/${getBird.image}`" :alt="getBird.name">
                <Field :field="getBird.name"></Field>
                <Field :field="getBird.description"></Field>
                <Field :field="getBird.fertility"></Field>
                <Field :field="getBird.care"></Field>
                <Field :field="getBird.demand"></Field>
                <Field :field="getBird.litter"></Field>
                <Field :field="getBird.egg_price"></Field>
                <Field :field="getBird.price"></Field>

                <!--            Если страница продавца, то отобразить кнопку купить-->
                <!--            <b-button class="m-2" variant="primary">Купить</b-button>-->

                <hr>
                <h2 class="text-center">Где купить?</h2>
                <span class="mb-2">
                    Птиц можно покупать у разных продавцов. Они отличаются ценой на птицу и <b-link
                    :to="{name: 'certificates'}">сертификатом</b-link>, который выдают своим птицам.
                    Сертификаты дают различные бонусы к характеристикам птицы
                </span>

                <b-button
                    v-for="seller of getBird.sellers"
                    :to="`/sellers/${seller.id}`"
                    :key="seller.id"
                    variant="primary"
                    class="m-1 w-100 d-flex justify-content-between align-items-center text-right"
                >
                    <img height="60px" :src="`/storage/${seller.image}`" alt="">
                    <span class="h5">
                        {{seller.name }}
                    </span>
                </b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'
import Loader from "../../components/Loader";

export default {
    name      : "BirdPage",
    components: {
        Loader,
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
