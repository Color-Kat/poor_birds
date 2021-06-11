<template>
    <b-card>
        <Loader v-if="loading" />

        <div v-else>
            <h2 class="text-center">Сертификаты</h2>
            <span>
                Сертификат - бумага, которая выдается врачом после осмотра, лечения или
                генного усовершенствования птицы. Птица, у которой есть сертификат будет получать различные
                бонусы, прописанные в сертификате, а так же вы не будете получать штрафы.
                Например, увеличенная
                плодоносность, повышенный
                спрос на яйца и тд.

                <b-alert show variant="info">
                    <h5>Памятка "количество налогов"</h5>
                    <i>Без сертификата - штраф 5 в час</i>, <br>
                    <i>Поддельный сертификат - штраф 3.3 в час</i>,<br>
                    <i>Палёный сертификат - штраф 2 в час</i>,<br>
                    <i>Плохой сертификат - штраф 1.8 в час</i>,<br>
                    <i>Обычный сертификат - штраф 1.5 в час</i>,<br>
                    <i>Путный сертификат - штраф 1.4 в час</i>,<br>
                    <i>Хороший сертификат - штраф 1 в час</i>,<br>
                    <i>Бронзовый сертификат - штраф 0.7 в час</i>,<br>
                    <i>Серебряный сертификат - штраф 0.4 в час</i>,<br>
                    <i>Золотой сертификат - штраф 0.1 в час</i>,<br>
                    <i>Легендарный сертификат - штраф 0</i>.
                </b-alert>
            </span>

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
                        <b-badge variant="warning">Бонус к цене {{ certificate.price_bonus }}%</b-badge>
                        <b-badge variant="danger">Бонус к спросу {{ certificate.demand_bonus }}%</b-badge>
                        <b-badge variant="dark">Бонус к кол-ву помёта {{ certificate.litter_bonus }}%</b-badge>
                        <br>
                        <b-badge variant="primary">Цена {{ certificate.price }}руб</b-badge>
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
    name    : "Store",
    components: {Loader},
    data: ()=>({loading: true}),
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
    async mounted() {
        await this.fetchCertificates();
        this.loading = false;
    },
}
</script>

<style lang="scss" scoped>

</style>
