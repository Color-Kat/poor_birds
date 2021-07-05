<template>
    <b-card class="shadow card-rounded">
        <Loader v-if="loading" />

        <div v-else>
            <h2 class="text-center">Сертификаты</h2>
            <span>
                Сертификат - бумага, которая выдается врачом после осмотра, лечения или
                генного усовершенствования птицы. Птица, у которой есть сертификат будет получать различные
                бонусы, прописанные в сертификате, а так же вы не будете получать налогы.
                Например, увеличенная
                плодоносность, повышенный
                спрос на яйца и тд.

                <b-alert show variant="info">
                    <h5>Памятка "количество налогов"</h5>
                    <i>Без сертификата - налог 5 руб в час</i>, <br>
                    <i>Поддельный сертификат - налог 3.3 руб в час</i>,<br>
                    <i>Палёный сертификат - налог 2 руб в час</i>,<br>
                    <i>Плохой сертификат - налог 1.8 руб в час</i>,<br>
                    <i>Обычный сертификат - налог 1.5 руб в час</i>,<br>
                    <i>Путный сертификат - налог 1.4 руб в час</i>,<br>
                    <i>Хороший сертификат - налог 1 руб в час</i>,<br>
                    <i>Бронзовый сертификат - налог 0.7 руб в час</i>,<br>
                    <i>Серебряный сертификат - налог 0.4 руб в час</i>,<br>
                    <i>Золотой сертификат - налог 0.1 руб в час</i>,<br>
                    <i>Легендарный сертификат - налог 0 руб</i>.
                </b-alert>
            </span>

            <hr>
            <h2>Сертификаты:</h2>

            <div class="mt-2 grid-cards-columns grid-cards-columns-small">
                <b-card
                    v-for="certificate of getCertificates"
                    class="mb-2 card-item shadow"
                    :title="certificate.name"
                    :img-src="`/storage/certificates/${certificate.grade}.jpg`"
                    :img-alt="certificate.name"
                    tag="article"

                    body-class="border-0"
                    style="border-radius: 24px !important; padding: 8px"

                    @click="()=>redirect(certificate.id)"
                    :key="certificate.id"
                >
                    <b-card-text>
                        <b-badge variant="success">Бонус к плодовитости {{ certificate.fertility_bonus.toLocaleString() }}%</b-badge>
                        <b-badge variant="warning">Бонус к цене {{ certificate.price_bonus.toLocaleString() }}%</b-badge>
                        <b-badge variant="danger">Бонус к спросу {{ certificate.demand_bonus.toLocaleString() }}%</b-badge>
                        <b-badge variant="dark">Бонус к кол-ву помёта {{ certificate.litter_bonus.toLocaleString() }}%</b-badge>
                        <br>
                        <b-badge variant="primary">Цена {{ certificate.price.toLocaleString() }}руб</b-badge>
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
