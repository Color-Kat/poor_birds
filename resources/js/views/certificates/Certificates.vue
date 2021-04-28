<template>
    <b-card>
        <h2 class="text-center">Сертификаты</h2>
        <span>Сертификат - бумага, которая выдается врачом после осмотра, лечения или
                    генного усовершенствования птицы. Птица, у которой есть сертификат будет получать различные
                    бонусы, прописанные в сертификате. Например, увеличенная плодоносность, повышенный спрос на
                    яйца и тд. Сертификат можно получить, покупая птиц у некоторых продавцов</span>

        <hr>
        <h2>Сертификаты:</h2>

        <div class="mt-2 grid-cards-columns grid-cards-columns-small">
            <b-card
                v-for="certificate of getCertificates"
                class="mb-2 card-item"
                :title="certificate.name"
                :img-src="`/storage/certificates/${certificate.grade}.jpg`"
                :img-alt="certificate.name"
                tag="article"

                @click="()=>redirect(certificate.id)"
                :key="certificate.id"
            >
                <b-card-text>
                    <b-badge variant="success">Бонус к плодовитости {{ certificate.fertility_bonus }}%</b-badge>
                    <b-badge variant="warning">Бонус к цене {{ certificate.fertility_bonus }}%</b-badge>
                    <b-badge variant="primary">Цена {{ certificate.price }}руб</b-badge>
                </b-card-text>

                <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
            </b-card>
        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name    : "Store",
    computed: {
        ...mapGetters([
            'getCertificates',
        ])
    },
    methods : {
        redirect(id) {
            this.$router.push(`/certificates/${id}`)
        },
        ...mapActions(['fetchCertificates'])
    },
    mounted() {
        this.fetchCertificates();
    },
}
</script>

<style lang="scss" scoped>

</style>
