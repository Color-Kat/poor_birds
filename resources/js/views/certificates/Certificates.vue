<template>
    <div id="store">
        <b-card>
            <h2 class="text-center">Сертификаты</h2>
            <span>Сертификат - бумага, которая выдается врачом после осмотра, лечения или
                    генного усовершенствования птицы. Птица, у которой есть сертификат будет получать различные
                    бонусы, прописанные в сертификате. Например, увеличенная плодоносность, повышенный спрос на
                    яйца и тд. Каждой птице можно купить только один сертификат. При покупке второго, первый
                    удаляется. Так же, если покупать птиц у некоторых продавцов, у них уже будет готовый
                    сертификат (Какой сертификат, зависит от продавца)</span>

            <hr>
            <h2>Сертификаты:</h2>

            <div class="mt-2 grid-cards-columns grid-cards-columns-small">
                <b-card
                    v-for="certificate of getCertificates"
                    class="mb-2 card-item"
                    :title="certificate.name"
                    :img-src="`/storage/certificates/${certificate.grade}.jpg`"
                    :img-alt="certificate.name"
                    img-top
                    tag="article"

                    @click="()=>redirect(certificate.id)"
                    :key="certificate.id"
                >
                    <b-card-text>
                        <b-badge>Бонус к плодовитости {{ certificate.fertility_bonus }}%</b-badge>
                        <b-badge>Бонус к цене {{ certificate.fertility_bonus }}%</b-badge>
                        <b-badge>Цена {{ certificate.price }}руб</b-badge>
                    </b-card-text>

                    <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "Store",
    mounted() {
        // this.$store.dispatch('fetchcertificates');
    },
    computed: {
        ...mapGetters([
            'getCertificates',
        ])
    },
    methods : {
        redirect(id) {
            this.$router.push(`/certificates/${id}`)
        }
    }
}
</script>

<style lang="scss">

</style>
