<template>
    <b-card class="shadow card-rounded">
        <!--    DEMAND WARNING!    -->
        <b-modal
            id="modal-eggs"
            title="Продажа яиц"
            hide-footer
            header-bg-variant="danger"
            header-text-variant="light"
        >
            <p class="my-2">Вы не можете продавать один вид яиц чаще, чем один раз в час :(</p>
        </b-modal>

        <!--    NO SELECTED SHOVEL    -->
        <b-modal id="modal-no-selected-shovel" header-bg-variant="warning" hide-footer>
            <p class="my-2">У вас не выбрана лопата!</p>
        </b-modal>

        <!--    BRIGADE    -->
        <b-modal id="modal-brigade" header-bg-variant="success" hide-footer>
            <p class="my-2">Бригада сделала свою работу!</p>
        </b-modal>
        <b-modal id="modal-brigade-no-money" header-bg-variant="danger" hide-footer>
            <p class="my-2">Недостаточно средств на счету. Ваш баланс {{ getUserWallets.GTN }} GTN</p>
        </b-modal>
        <!--    BRIGADE    -->

        <!--    LOADER    -->
        <Loader v-if="loading"/>

        <div class="position-relative">
            <!--      tooltip toggle       -->
            <div class="m-1 position-absolute w-100 text-right">
                <b-badge
                    v-b-toggle.collapse-shovel
                    pill size="sm"
                    variant="dark"
                    @click="()=>{
                            // toggle tooltip
                            localStorage.setItem(
                                'tooltip-eggs',
                                !( (localStorage.getItem('tooltip-eggs') || 'false') == 'true' )
                            )
                        }"
                >?
                </b-badge>
            </div>

            <h2 class="text-center">Склад ваших яиц</h2>

            <!--         collapse tooltip (from localStorage)       -->
            <b-collapse :visible="localStorage.getItem('tooltip-eggs') == 'true'" id="collapse-shovel">
                <p>
                    Это склад яиц, которые несут ваши птицы.У каждой птицы - свой вид яиц.
                    А у каждого яйца - свои характеристики: <b>цена яйца</b> и <b>спрос</b>
                    Ваши птицы <b>каждый час</b> несут яйца, которые сразу отправляются сюда, на склад.
                    Тут их можно продать по цене, которая указана в характеристиках яйца.
                    Но нельзя продать любое количество яиц сразу. Их просто никто не купит,
                    поэтому каждый час можно продавать только такое количество яиц, которое указано в спросе.
                    Каждый час вам приходит налог на птиц. Чем лучше сертификат птицы, тем меньше налог.
                </p>
            </b-collapse>

            <hr>

            <p>
                <NavWidget/>
            </p>
            <hr>
            <div>
                <h3>Выбрать лопату:</h3>
                <div class="shovels-list" v-if="getUserShovels.length > 0">
                    <div
                        v-for="shovel of getUserShovels"
                        class="shovel-item text-center d-flex justify-content-center shadow-sm"
                        :class="{ active: !!+shovel.pivot.isActive }"
                        @click="(e)=>selectShovelHandler(shovel, e)"
                    >
                        <img
                            :src="`/storage/${shovel.image}`" :alt="shovel.name" style="position:absolute;
                        max-width: 90%; max-height: 90%"
                        >
                        <div class="d-flex justify-content-between">
                            <!--                        <span>{{ shovel.name }}</span>-->
                            <b-badge variant="success">{{ shovel.efficiency }}ед.</b-badge>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <span>Чтобы убирать помёт за птицами, нужно купить лопату:</span>
                    <b-button :to="{name: 'shovels'}" class="mt-2" size="sm" variant="primary">Купить лопату</b-button>
                </div>
            </div>
            <hr>
            <h2 class="d-flex justify-content-between mb-3">
                <span>Склад:</span>
                <!--       count all fines         -->
                <b-button
                    variant="danger"
                    v-if="!getEggs.every(elem => +elem.fine == 0)"
                    @click="payOffFinesHandler"
                    class="shadow rounded-pill px-sm-4 px-2"
                    v-b-tooltip="'Если сумма налогов и штрафов будет больше 300, то у вас не будет доступа к яйцам!'"
                >
                    <span style="font-weight: 1000 !important;">
                        Погасить налоги
                        {{ getFines }} ₽
                    </span>
                </b-button>
            </h2>

            <b-alert show variant="danger" v-if="getFines > 300">
                У вас куча непогашенных штрафов!
                Доступ к ферме заблокирован. Погасите все долги
            </b-alert>

            <div v-else-if="getEggs.every(elem => +elem.count == 0 && +elem.litter == 0)">
                У вас пока нет яиц...
            </div>

            <div class="mt-2" v-else>
                <!--        EGG        -->
                <b-card
                    v-for="egg of getEggs"
                    class="mb-2 w-100 shadow"
                    tag="article"
                    :key="egg.id"
                    body-class="p-3"

                    v-if="+egg.count > 0 || +egg.litter > 0"

                    style="border-radius: 24px !important; padding: 12px;"
                >
                    <b-card-text
                        class="d-flex justify-content-between"
                    >
                        <!--          name and clean          -->
                        <div
                            style="font-size: 1.1em; width: max-content; align-content: space-between"
                            class="d-flex flex-wrap mr-3"
                        >
                        <span class="d-flex justify-content-center">
                            <b>{{ egg.name }}</b>
                            <span class="ml-1">x{{ egg.birds_count }}</span>
                        </span>
                            <span class="">
                            <b-badge variant="dark" class="egg-litter">Помёт: {{ +egg.litter }}ед.</b-badge>
                            <br>
                            <b-button
                                class="p-1 shadow-sm"
                                variant="light"
                                @click="(e)=>cleanHandler(egg, e)"
                                :disabled="+egg.litter == 0"
                            >
                                <img
                                    style="pointer-events: none"
                                    height="30px"
                                    src="https://user-images.githubusercontent.com/15840617/31617371-ae68471e-b297-11e7-9981-269c9bb17330.png"
                                    alt="Убрать"
                                >
                                <span style="pointer-events: none">Убраться</span>
                            </b-button>
                        </span>
                        </div>


                        <!--   characteristics and sell eggs button   -->
                        <div class="d-flex justify-content-end flex-wrap egg-characteristics">
                            <div class="d-flex justify-content-end flex-wrap">
                                <b-badge variant="success" class="my-1 ml-1 d-flex align-items-center">{{
                                        Math.floor(+egg.count)
                                    }}🥚
                                </b-badge>
                                <b-badge variant="danger" class="my-1 ml-1 d-flex align-items-center">Спрос
                                    {{ +egg.demand }}
                                    яиц/час
                                </b-badge>
                                <b-badge class="my-1 ml-1 d-flex align-items-center">{{ +egg.price }}&#8381; цена яйца
                                </b-badge>
                                <b-badge variant="warning" class="my-1 ml-1 d-flex align-items-center">Всего: {{
                                        (+egg.price * +egg.count).toFixed(2)
                                    }}&#8381;
                                </b-badge>
                            </div>

                            <span>
                            <b-button
                                variant="primary"
                                class="mt-2 shadow"
                                @click="e=>{
                                    sellingEggs(egg, e);
                                }"
                                :disabled="!!+egg.collected || +egg.count == 0"
                            >
                                Продать {{ Math.floor(+egg.demand < +egg.count ? +egg.demand : +egg.count) }}🥚
                                за {{
                                    ((+egg.demand < +egg.count ? +egg.demand : +egg.count) * +egg.price).toFixed(2)
                                }}&#8381;
                            </b-button>
                        </span>
                        </div>
                    </b-card-text>
                </b-card>
                <!--        EGG        -->
            </div>

            <hr>

            <!--       SEll IN ONE CLICK        -->
            <div class="text-center">
                <h2>Продать яйца в один клик</h2>

                <div class="d-lg-flex justify-content-between d-block">
                    <img
                        src="/assets/brigade.png"
                        style="max-height: 300px; max-width: 100%"
                        alt="бригада"
                    >
                    <span class="p-3">
                            <p class="text-left">
                                Вы можете нанять бригаду, которая уберётся за птицами и
                                увезёт их яйца в Москву на продажу. Она разберётся
                                со всеми проблемами и налогами. Но это платная услуга,
                                и покупается она только за <b-link :to="{name: 'payment'}">густинианы</b-link>.
                                <br>
                            </p>
                            <b-button
                                variant="warning"
                                class="shadow-lg btn-lg"
                                @click="brigadeHireHandler"
                            >Нанять за 20 густинианов</b-button>
                        </span>
                </div>
            </div>
            <!--       SEll IN ONE CLICK        -->
        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "../../components/Loader";
import NavWidget from "../../components/navigation/NavWidget";

export default {
    name      : "EggsPage",
    components: {
        NavWidget,
        Loader
    },
    data      : () => ({
        fines  : null,
        loading: true
    }),
    methods   : {
        ...mapActions(['fetchUserEggs', 'sellEggs', 'clean', 'selectShovel', 'payOffFines', 'brigadeHire', 'fetchUser']),
        /** sell eggs request, then update data*/
        async sellingEggs(egg, event) {
            let eggs_count = await this.sellEggs(+egg.id);

            if (eggs_count !== false) {
                egg.count             = eggs_count; // update number of eggs
                event.target.disabled = true; // disable button to ban selling eggs

                let money_song    = new Audio();
                money_song.volume = 0.5;
                money_song.src    = '/assets/sounds/money.mp3';
                money_song.play()
            } else {
                // show modal
                this.$bvModal.show('modal-eggs');
            }
        },
        /** clean request and update litter count  */
        async cleanHandler(egg, event) {
            // disable button for 1 sec
            let btn      = event.target;
            btn.disabled = true;
            setTimeout(() => {
                btn.disabled = false;
            }, 1000);

            let litter = await this.clean(egg.id); // get litter count

            // no selected shovels
            if (typeof litter !== 'number') {
                this.$bvModal.show('modal-no-selected-shovel');
                return;
            }
            egg.litter = litter; // decrease litter count
        },
        /** select shovel request */
        async selectShovelHandler(shovel, e) {
            if (e.target.classList.contains('active')) return; // already selected
            let res = await this.selectShovel(shovel.id); // select shovel

            if (res) {
                // set isActive to show active class
                this.getUserShovels.forEach(elem => {
                    // console.log(elem, shovel)
                    if (elem.id != shovel.id) elem.pivot.isActive = 0;
                    else elem.pivot.isActive = 1;
                });
            }
        },
        async payOffFinesHandler() {
            let result = await this.payOffFines(); // send request and get new count of fines

            if (result !== false) this.fines = +result; // update count of fines
        },
        async brigadeHireHandler() {
            let userBalance = this.getUserWallets.GTN; // get GTN balance

            // the brigade costs 20 gtn
            if (userBalance < 20) {
                this.$bvModal.show('modal-brigade-no-money');
                return;
            }

            let result = await this.brigadeHire();

            if (result) {
                // cleaning song
                let cleaning_song    = new Audio();
                cleaning_song.volume = 0.5;
                cleaning_song.src    = '/assets/sounds/cleaning.mp3';
                cleaning_song.play();

                this.fetchUser(); // update user currencies

                this.$bvModal.show('modal-brigade'); // show message
                this.fetchUserEggs(); // update eggs list
            } else {
                // no money or server error
                // show modal
                this.$bvModal.show('modal-brigade-no-money');
            }
        }
    },
    computed  : {
        ...mapGetters(['getEggs', 'getUserShovels', 'getUserWallets']),
        Math   : () => Math,
        console: () => console,
        // count fines from eggs
        getFines() {
            if (!this.getEggs.length) return 0; // no data to counting

            // if fines don't exist we need update it
            let fines = this.fines;
            if (fines === null) {
                this.getEggs.forEach(elem => {
                    fines += +elem.fine;
                });
            }
            return fines.toFixed(2);
        },
        localStorage: () => localStorage // for toggle tooltip
    },
    async mounted() {
        await this.fetchUserEggs();
        this.loading = false
    }
}
</script>

<style scoped lang="scss">
.egg-characteristics {
    @media (min-width: 544px) {
        & {
            font-size: 1.2rem;
        }
    }
}

@media (max-width: 544px) {
    button {
        //height: 2rem;
        font-size: 0.8rem;
        padding: 0.2em 0.5em;
        //display: flex;
        //align-items: center;
    }
}

.shovels-list {
    display: flex;
    flex-wrap: wrap;

    .shovel-item {
        position: relative;
        border: 4px solid #adadad;
        border-radius: 10px;
        height: 120px;
        width: 120px;
        padding: 3px;
        margin-right: 6px;
        margin-bottom: 6px;
        transition: all .2s ease-in-out;
        cursor: pointer;

        &.active {
            border: 5px solid #007bff;
        }

        &:hover {
            border: 5px solid #82b3ff;
        }


        * {
            pointer-events: none;
        }

        img {
            width: 100%;
        }

        div {
            position: absolute;
            bottom: 0;
            flex-wrap: wrap;
            font-weight: 700;
            margin: 10px;
            justify-content: center !important;
            color: #585858;
        }
    }
}
</style>
