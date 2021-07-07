<template>
    <div>
        <!-- --- BIRDS MODALS ---    -->
        <!--    NO MONEY MODAL    -->
        <b-modal id="modal-no-money" header-bg-variant="danger" hide-footer>
            <p class="my-2">К сожалению у вас нет денег на птицу "{{ purchasedBird ? purchasedBird.name : '' }}"</p>
        </b-modal>

        <!--    YOU BUY BIRD QUEST    -->
        <b-modal
            id="modal-bird-buy" title="Поздравляем! Вы купили птицу" header-bg-variant="success"
            header-text-variant="light" hide-header body-bg-variant="dark" hide-footer
        >

            <div
                class="quest-box"
            >
                <div class="quest-box-inner">
                    <h4>
                        Поздравляем, Вы купили птицу "{{ purchasedBird ? purchasedBird.name : '' }}"!
                    </h4>
                    <p
                        v-if="!((JSON.parse(localStorage.getItem('birds_purchased_list')) || [])
                                .includes(purchasedBird ? purchasedBird.id : ''))"
                    >
                        {{ purchasedBird ? purchasedBird.quest : '' }}
                        <br>
                    </p>
                    <b-link :to="{name: 'my_birds'}">Мои птицы</b-link>
                </div>
            </div>
        </b-modal>
        <!-- --- BIRDS MODALS ---    -->

        <!-- --- SELLERS MODALS ---    -->
        <!--      NO MONEY      -->
        <b-modal id="modal-no-money-seller" header-bg-variant="danger" hide-footer>
            <p class="my-2">К сожалению у вас нет денег на открытие продавца</p>
        </b-modal>

        <!--    OPEN SELLER QUEST    -->
        <!--      OPEN SELLER AND QUEST      -->
        <b-modal
            id="modal-open-seller" hide-footer hide-header
            body-bg-variant="dark"
        >
            <div class="quest-box">
                <div class="quest-box-inner">
                    <h4>Вы открыли продавца!</h4>
                    <p>
                        {{ questMessage }}
                    </p>
                </div>
            </div>

        </b-modal>
        <!-- --- SELLERS MODALS ---    -->

        <Loader v-if="loading"/>

        <b-card v-else class="shadow">
            <!--      seller not found      -->
            <b-alert show v-if="!getSeller" variant="warning">
                <h1>Такого продавца не существует :(</h1>
                <b-button :to="{name: 'sellers'}" size="sm" class="mt-2" variant="danger">
                    Посмотреть существующих продавцов
                </b-button>
            </b-alert>

            <div v-else>
                <h1 class="text-center mb-3">{{ getSeller.name[1] }}</h1>
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
                    class="mt-2 w-100"
                    variant="warning"
                    :to="`/certificates/${getSeller.certificate_id}`"
                >
                    {{
                        getSeller.certificate_name
                    }}
                </b-button>
                <b-alert class="mt-3" v-else show variant="warning">Этот продавец не выдает птицам
                    <b-link
                        :to="{name:'certificates'}"
                    >сертификаты
                    </b-link>
                    !
                </b-alert>

                <hr>
                <h2>Птицы продавца: </h2>

                <!--      open seller      -->
                <span v-if="!checkSellerAvailable">
                У вас не заключён договор с этим продавцов. Заключите договор, чтобы покупать птиц:
                <b-button
                    variant="primary"
                    @click="() => {openThisSeller(getSeller)}"
                    class="w-100"
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
                        class="mb-2 card-item shadow"
                        :title="bird.name"
                        :img-src="`/storage/${bird.image}`"
                        :img-alt="bird.name"
                        tag="article"
                        :key="bird.id"
                        style="border-radius: 24px; padding: 8px"
                    >
                        <b-card-text>
                        <span class="description">
                            {{ bird.description.slice(0, 100) }}
                            {{ bird.description.length > 100 ? '...' : '' }}
                        </span>
                            <hr>

                            <h6 class="d-inline" style="width: 10px !important; margin: 0 !important;">
                                <b-badge variant="warning">Плодоносность: {{ bird.fertility }} яиц/час</b-badge>
                                <b-badge variant="danger">Спрос: {{ bird.demand }} яиц/час</b-badge>
                                <b-badge variant="success">Бонус за заботу: {{ bird.care }}%</b-badge>
                                <b-badge variant="dark">Помет: {{ bird.litter }} ед/час</b-badge>
                                <b-badge variant="primary">Цена яйца: {{ bird.egg_price }}&#8381;</b-badge>
                            </h6>

                            <hr>

                            <b-button
                                variant="primary"
                                @click="()=>birdBuy(bird)"
                                class="rounded-lg"
                            >
                                купить за <b>{{ Math.round(bird.price * (1 + getSeller.discount / 100)) }}&#8381;</b>
                            </b-button>
                        </b-card-text>
                    </b-card>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'
import Loader from "../../components/Loader";
import StoryModal from "../../components/StoryModal";

export default {
    name      : "SellerPage",
    components: {
        StoryModal,
        Loader,
        Field,
    },
    data      : function () {
        return {
            loading          : true,
            purchasedBirdName: null,
            sellerAvailable  : false,
            questMessage     : '',
            birdQuestMessage : '',
            purchasedBird    : null
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
        },
        localStorage        : () => localStorage
    },
    methods   : {
        ...mapActions(['fetchSeller', 'buyBird', 'openSeller']),
        async birdBuy(bird) {
            // buy bird from seller_id, bird_id
            let result = await this.buyBird({
                bird_id     : bird.id,
                sold_bird_id: bird.pivot.id
            });

            this.purchasedBird = bird;

            // successful purchased
            if (result) {
                this.$bvModal.show('modal-bird-buy'); // show success modal with quest and bird name

                /* Add the bird to the purchased list
                 * to remember it for displaying bird quest message in SellerPage.vue the next time
                 * you buy this bird
                */
                setTimeout(() => {
                    // get previous list or empty array
                    let purchased_list = (
                        JSON.parse(localStorage.getItem("birds_purchased_list"))
                        || []
                    );

                    // check if element already exists in list and update list
                    if (!purchased_list.includes(bird.id)) localStorage.setItem(
                        "birds_purchased_list",
                        JSON.stringify(purchased_list.concat(bird.id))// add new item to list
                    );
                }, 1000);

                // play purchased sound
                let buy_song    = new Audio();
                buy_song.volume = 0.5;
                buy_song.src    = '/assets/sounds/buy.mp3';
                buy_song.play()
            } else this.$bvModal.show('modal-no-money'); // no money message
        },
        async openThisSeller(seller) {
            if (await this.openSeller(seller.id)) {
                this.sellerAvailable = true;
                this.questMessage    = seller.quest;
                this.$bvModal.show('modal-open-seller');
            } else this.$bvModal.show('modal-no-money-seller');
        }
    },
    async mounted() {
        await this.fetchSeller(this.$route.params.id);

        this.loading = false;
    }
}
</script>

<style scoped lang="scss">

</style>
