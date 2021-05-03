<template>
    <div>
        <!-- successfully purchase -->
        <b-modal id="modal-success-purchase" header-bg-variant="success" hide-footer>
            <p class="my-2">Вы успешно купили сертификат!</p>
        </b-modal>

        <!-- not enough money -->
        <b-modal id="modal-money-purchase" header-bg-variant="danger" hide-footer>
            <p class="my-2">У вас недостаточно денег!</p>
        </b-modal>

        <Loader v-if="loading" />
        <b-card v-else>

            <b-alert v-if="!getCertificate" variant="warning">
                <span>Такой сертификат нельзя получить:(</span>
                <b-button :to="{name: 'birds'}">Посмотреть другие сертификаты</b-button>
            </b-alert>


            <div v-else>
                <!--            {{ getCertificate }}-->
                <h2 class="text-center">{{ getCertificate.name[1] }}</h2>
                <div class="d-flex justify-content-center">
                   <img width="30%" :src="`/storage/certificates/${getCertificate.grade_id}.jpg`"
                        :alt="getCertificate.name">

               </div>
                <h6 class="p-2 d-flex justify-content-center" width="100%"><b>{{getCertificate.grade}}</b></h6>

                <Field :field="getCertificate.name"></Field>
                <Field :field="getCertificate.fertility_bonus"></Field>
                <Field :field="getCertificate.care_bonus"></Field>
                <Field :field="getCertificate.demand_bonus"></Field>
                <Field :field="getCertificate.litter_bonus"></Field>
                <Field :field="getCertificate.price_bonus"></Field>
                <Field :field="getCertificate.price"></Field>

<!--                <b-button variant="primary" class="mt-3">Купить</b-button>-->
                <b-dropdown
                    id="dropdown-select-bird"
                    text="Купить для"
                    class="mt-3"
                    variant="primary"
                    v-b-tooltip.hover
                    title="Сертификат при покупке сертификата старый удаляется"
                >
                    <b-dropdown-item
                        v-for="myBird of getMyBirds"
                        :key="myBird.id"
                        @click="()=>buyCertificateHandler(myBird, getCertificate)"
                    >{{ myBird.name }} x {{ myBird.count }}</b-dropdown-item>
                </b-dropdown>

                <hr>
                <h2 class="text-center">Что такое сертификат?</h2>
                <span class="mb-2">Сертификат - бумага, которая выдается врачом после осмотра, лечения или
                    генного усовершенствования птицы. Птица, у которой есть сертификат будет получать различные
                    бонусы, прописанные в сертификате. Например, увеличенная плодоносность, повышенный спрос на
                    яйца и тд. Сертификат можно получить, если покупать птиц у некоторых продавцов, которые
                    выдают сертификат своим птица.
                </span>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'
import Loader from "../../components/Loader";

export default {
    name      : "CertificatePage",
    components: {
        Loader,
        Field
    },
    data      : () => ({
        certificate   : null,
        loading: true,
    }),
    computed  : {
        ...mapGetters(['getCertificate', 'getMyBirds'])
    },
    methods   : {
        ...mapActions(['fetchCertificate', 'fetchUserBirds', 'buyCertificate']),
        async buyCertificateHandler(my_bird, certificate) {
            let result = await this.buyCertificate({
                id: my_bird.bird_seller_user_id,
                certificate_id: certificate.id
            });

            if (result) this.$bvModal.show('modal-success-purchase');
            else this.$bvModal.show('modal-money-purchase');
        }
    },
    async mounted() {
        await this.fetchCertificate(this.$route.params.id);
        await this.fetchUserBirds();
        this.loading = false;
    }
}
</script>

<style scoped>

</style>
