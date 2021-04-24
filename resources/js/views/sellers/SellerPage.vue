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
            <p class="my-2">Поздравляем! Вы купили птицу "{{ purchasedBirdName }}"</p>

            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="success" @click="ok()">
                    Oк
                </b-button>
            </template>
        </b-modal>

        <!--        <router-view></router-view>-->

        <b-card
            v-if="!loading"

        >
            <!--            {{ getBird }}-->
            <h2 class="text-center">{{ getSeller.name[1] }}</h2>
            <figure class="text-center">
                <img
                    width="60%" :src="`/storage/${getSeller.image}`"
                    :alt="getSeller.name"
                >
            </figure>
            <!--            <span class="p-2">{{getBird.description[1]}}</span>-->
            <Field :field="getSeller.name"></Field>
            <Field :field="getSeller.description"></Field>
            <Field :field="getSeller.discountText"></Field>
            <Field :field="getSeller.birds_count"></Field>
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

            <hr>
            <h2>Птицы продавца: </h2>

            <!--      open seller      -->
            <b-button
                v-if="this.getUserSellers ? !this.getUserSellers.find(elem => {
                    return elem.id == this.getSeller.id
                }) : true"
                variant="primary"
                @click="() => {openThisSeller(getSeller.id)}"
            >
                Открыть продавца за {{ getSeller.price[1] }}
            </b-button>

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
                            купить за {{ Math.round(bird.price * (1 + getSeller.discount / 100)) }}&#8381;
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

export default {
    name      : "SellerPage",
    components: {
        Field,
    },
    data: function (){
        return {
            loading          : true,
            purchasedBirdName: null,
            sellerAvailable  : (this.getUserSellers ? !this.getUserSellers.find(elem => {
                console.log(elem)
                    return elem.id == this.getSeller.id
                }) : true)
        }
    },
    computed  : {
        ...mapGetters(['getSeller', 'getUserSellers'])
    },
    methods   : {
        ...mapActions(['fetchSeller', 'buyBird', 'openSeller']),
        redirect(seller_id, bird_id) {
            // TODO сделать страницу с птицей продавца. Необязательно
            this.$router.push(`/sellers/${seller_id}/birds/${bird_id}`)
        },
        async birdBuy(ids) {
            let result = await this.buyBird(ids);
            if (result) this.$bvModal.show('modal-bird-buy');
            else this.$bvModal.show('modal-no-money');
        },
        async openThisSeller(sellerId) {
            // TODO сделать без перезагрузки
            if (await this.openSeller(sellerId)) this.$router.go();

            // this.sellerAvailable = true;
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
