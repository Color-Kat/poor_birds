<template>
    <div class="shadow">
        <b-modal id="modal-shovel-buy" header-bg-variant="success" hide-footer>
            <p class="my-4">Поздравляем! Вы купили новую лопату</p>
        </b-modal>

        <b-modal id="modal-shovel-no-money" header-bg-variant="danger" hide-footer>
            <p class="my-4">У вас недостаточно средств</p>
        </b-modal>

        <b-modal id="modal-shovel-no-gtn" header-bg-variant="danger" hide-footer>
            <p class="my-2">Недостаточно средств на счету. Ваш баланс {{ getUserWallets.GTN }} GTN</p>
        </b-modal>

        <Loader v-if="loading" />

        <b-card v-else>
            <b-alert show v-if="!getShovel" variant="warning">
                <span>Такой лопаты нет в продаже :(</span>
                <b-button :to="{name: 'shovels'}" size="sm" class="mt-2" variant="danger">
                    Посмотреть существующие лопаты
                </b-button>
            </b-alert>

            <div v-else>
                <!--            {{ getShovel }}-->
                <h2 class="text-center">{{ getShovel.name[1] }}</h2>
                <img width="100%" :src="`/storage/${getShovel.image}`" :alt="getShovel.name">
                <!--            <span class="p-2">{{getShovel.description[1]}}</span>-->
                <Field :field="getShovel.name"></Field>
                <Field :field="getShovel.efficiency"></Field>
                <Field :field="getShovel.price"></Field>

                <div v-if="getUserShovelsIds.indexOf(getShovel.id) == -1">
                    <b-button
                        v-if="!getShovel.isDonate"
                        class="mt-3"
                        variant="primary"
                        @click="(e)=>{buy(getShovel, e);}"
                    >
                        Купить
                    </b-button>
                    <b-button
                        v-else class="mt-3"
                        variant="warning"
                        @click="(e)=>{buy(getShovel, e);}"
                    >Купить за густинианы</b-button>
                </div>

                <b-alert show variant="warning" class="mt-3" v-else>Эта лопата уже куплена!</b-alert>

                <hr>

                <h2 class="text-center">Зачем нужны лопаты??</h2>
                <span class="mb-2">Ваши птицы постоянно производят помёт, им не нравится жить в нем, поэтому они
                    начинают нести меньше яиц (за каждые 100 ед.помёта плодоносность падает на 5%). Чтобы птицы
                    всегда исправно несли вам яйца, нужно за ними убираться. Для этого и нужны лопаты. У каждой
                    лопаты есть характеристика "эффективность" - это то, сколько ед.помёта лопата убирает за 1
                    использование.</span>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'
import Loader from "../../components/Loader";

export default {
    name      : "ShovelPage",
    components: {
        Loader,
        Field
    },
    data      : () => ({
        shovel : null,
        loading: true,
    }),
    computed  : {
        ...mapGetters(['getShovel', 'getUserShovelsIds', 'getUserWallets'])
    },
    methods   : {
        ...mapActions(['fetchShovel', 'buyShovel', 'fetchUser']),
        async buy(shovel, e) {
            let result = await this.buyShovel(shovel.id);

            // shovel is buying
            if (result) {
                e.target.disabled=true; // disable button
                this.$bvModal.show('modal-shovel-buy');

                if (this.getShovel.isDonate) this.fetchUser(); // update currencies data if donate

                // play buy song
                let buy_song = new Audio();
                buy_song.volume=0.3;
                buy_song.src = '/assets/sounds/buy.mp3';
                buy_song.play();
            } else {
                // modals
                if (this.getShovel.isDonate) this.$bvModal.show('modal-shovel-no-gtn'); // for gtn
                else this.$bvModal.show('modal-shovel-no-money'); // for rub
            }
        }
    },
    async mounted() {
        await this.fetchShovel(this.$route.params.id);
        this.loading = false;
    }
}
</script>

<style scoped>

</style>
