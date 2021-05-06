<template>
    <div>
        <!--    NO MONEY MODAL    -->
        <b-modal id="modal-no-money" header-bg-variant="danger">
            <p class="my-2">К сожалению у вас нет денег на птицу "{{ purchasedBirdName }}"</p>

            <template #modal-footer="{ ok }">
                <b-button size="sm" @click="ok()">
                    Oк(
                </b-button>
            </template>
        </b-modal>

        <!--    YOU BUY BIRD MODAL    -->
        <b-modal id="modal-bird-buy" title="Поздравляем! Вы купили птицу" hide-header>
            <p class="my-2">Поздравляем! Вы купили птицу "{{ purchasedBirdName }}". <b-link :to="{name: 'my_birds'}">Мои
                птицы</b-link></p>

            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="success" @click="ok()">
                    Oк
                </b-button>
            </template>
        </b-modal>

        <Loader v-if="loading" />

        <b-card v-else >
            <h2 class="text-center">{{ getSeller.name[1] }}</h2>
            <figure class="text-center">
                <img
                    width="60%" :src="`/storage/${getSeller.image}`"
                    :alt="getSeller.name"
                >
            </figure>
            <Field :field="getSeller.name"></Field>
            <Field :field="getSeller.description"></Field>
            <Field :field="getSeller.discountText"></Field>
<!--            <Field :field="getSeller.birds_count"></Field>-->
            <Field :field="getSeller.price"></Field>

            <b-button
                v-if="getSeller.certificate_id"
                class="mt-2"
                variant="warning"
                :to="`/certificates/${getSeller.certificate_id}`"
            >
                {{
                    getSeller.certificate_name
                }}
            </b-button>
            <b-alert class="mt-3" v-else show variant="warning">Этот продавец не выдает птицам <b-link
                :to="{name:'certificates'}">сертификаты
            </b-link>!
            </b-alert>

            <hr>
            <h2>Птицы продавца: </h2>

            <!--      open seller      -->
            <span v-if="!checkSellerAvailable">
                У вас не заключён договор с этим продавцов. Заключите договор, чтобы покупать птиц:
                <b-button
                    variant="primary"
                    @click="() => {openThisSeller(getSeller.id)}"
                    size="sm"
                >
                    Заключить договор за <b>{{ getSeller.price[1] }}</b>
                </b-button>
            </span>

            <div
                class="mt-2 grid-cards-columns"
                v-else
            >
                <b-card
                    v-for="bird of getSeller.birds"
                    class="mb-2 card-item"
                    :title="bird.name"
                    :img-src="`/storage/${bird.image}`"
                    :img-alt="bird.name"
                    tag="article"
                    :key="bird.id"
                >
                    <b-card-text>
                        <span class="description">{{ bird.description }}</span>
                        <hr>

                        <h6 class="d-inline" style="width: 10px !important; margin: 0 !important;">
                            <b-badge variant="warning">Плодоносность: {{ bird.fertility }} яиц/час
                            </b-badge>
                            <b-badge variant="danger">Спрос: {{ bird.demand }} яиц/час
                            </b-badge>
                            <b-badge variant="success">Бонус за заботу: {{ bird.care }}%
                            </b-badge>
                            <b-badge variant="dark">Помет: {{ bird.litter }} ед/час
                            </b-badge>
                            <b-badge variant="primary">Цена яйца: {{ bird.egg_price }}&#8381;
                            </b-badge>
                        </h6>

                        <hr>

                        <b-button
                            variant="primary"
                            @click="()=>{
                                birdBuy({bird_id: bird.id, sold_bird_id: bird.pivot.id});
                                purchasedBirdName = bird.name
                            }"

                        >
                            купить за <b>{{ Math.round(bird.price * (1 + getSeller.discount / 100)) }}&#8381;</b>
                        </b-button>
                    </b-card-text>
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'
import Loader from "../../components/Loader";

export default {
    name      : "SellerPage",
    components: {
        Loader,
        Field,
    },
    data      : function () {
        return {
            loading          : true,
            purchasedBirdName: null,
            sellerAvailable  : false
        }
    },
    computed  : {
        ...mapGetters(['getSeller', 'getUserSellers']),
        checkSellerAvailable: function () {
            return this.sellerAvailable || (
                this.getUserSellers
                    ? this.getUserSellers.find(elem => {
                        return elem.id == this.getSeller.id
                    })
                    : false
            );
        }
    },
    methods   : {
        ...mapActions(['fetchSeller', 'buyBird', 'openSeller']),
        // redirect(seller_id, bird_id) {
        //     this.$router.push(`/sellers/${seller_id}/birds/${bird_id}`)
        // },
        async birdBuy(ids) {
            let result = await this.buyBird(ids);
            if (result) this.$bvModal.show('modal-bird-buy');
            else this.$bvModal.show('modal-no-money');
        },
        async openThisSeller(sellerId) {
            if (await this.openSeller(sellerId)) this.sellerAvailable = true;
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
