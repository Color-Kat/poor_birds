<template>
    <b-card>
        <b-modal
            id="modal-eggs"
            title="Продажа яиц"
            hide-footer
            header-bg-variant="danger"
            header-text-variant="light"
        >
            <p class="my-2">Вы не можете продавать один вид яиц чаще, чем один раз в час :((</p>
        </b-modal>

        <h2 class="text-center">Склад ваших яиц ;)</h2>
        <span>
            Эти яйца несут ваши птицы. И у каждого вида птиц - свои яйца!
            Так же характеристики яйца изменяют
            сертификаты птицы. <br>
            В этом списке показаны все ваши яйца, которые
            снесли ваши птицы. У каждого яйца 2 характеристики - <b>спрос</b> и <b>цена яйца</b>.
            Каждый час вы можете продавать такое кол-во яиц, которое указано в спросе.
            </span>

        <hr>
        <div>
            <h3>Выбрать лопату:</h3>
            <div class="shovels-list">

                <div
                    v-for="shovel of getUserShovels"
                    class="shovel-item text-center d-flex justify-content-center"
                    :class="{ active: !!shovel.pivot.isActive }"
                    @click="(e)=>selectShovel(shovel, e)"
                >
                    <img :src="`/storage/${shovel.image}`" alt="">
                    <div class="d-flex justify-content-between">
<!--                        <span>{{ shovel.name }}</span>-->
                        <b-badge variant="success">{{ shovel.efficiency }}ед.</b-badge>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <h2>Склад:</h2>

        <div v-if="getEggs.every(elem => elem.count == 0 && elem.litter == 0)">
            У вас пока нет яиц...
        </div>

        <div class="mt-2">
            <b-card
                v-for="egg of getEggs"
                class="mb-2 w-100"
                tag="article"
                :key="egg.id"
                body-class="p-3"
                v-if="egg.count > 0 || egg.litter > 0"
            >
                <b-card-text
                    class="d-flex justify-content-between"
                >
                    <!--          name and clean          -->
                    <div
                        style="font-size: 1.1em; width: max-content"
                        class="d-flex align-items-center flex-wrap mr-3"
                    >
                        <span class="d-flex justify-content-center">
                            <b>{{ egg.name }}</b>
                            <span class="ml-1">x{{ egg.birds_count }}</span>
                        </span>
                        <span class="">
                            <b-badge variant="dark" class="egg-litter">Помёт: {{ egg.litter }}ед.</b-badge>
                            <br>
                            <b-button class="p-1" variant="light" @click="(e)=>cleanHandler(egg, e)">
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
                                    egg.count
                                }}🥚
                            </b-badge>
                            <b-badge variant="danger" class="my-1 ml-1 d-flex align-items-center">Спрос {{ egg.demand }}
                                яиц/час
                            </b-badge>
                            <b-badge class="my-1 ml-1 d-flex align-items-center">{{ egg.price }}&#8381; цена яйца
                            </b-badge>
                            <b-badge variant="warning" class="my-1 ml-1 d-flex align-items-center">Всего: {{
                                    egg.price * egg.count
                                }}&#8381;
                            </b-badge>
                        </div>

                        <span>
                            <b-button
                                variant="primary"
                                class="mt-2"
                                @click="e=>{
                                    sellingEggs(egg, e);
                                }"
                                :disabled="!!egg.collected || egg.count == 0"
                            >
                                Продать {{ egg.demand < egg.count ? egg.demand : egg.count }}🥚
                                за {{ (egg.demand < egg.count ? egg.demand : egg.count) * egg.price }}&#8381;
                            </b-button>
                        </span>
                    </div>
                </b-card-text>

                <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
            </b-card>

        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name    : "EggsPage",
    methods : {
        ...mapActions(['fetchUserEggs', 'sellEggs', 'clean']),
        async sellingEggs(egg, event) {
            let eggs_count = await this.sellEggs(egg.id);

            if (eggs_count !== false) {
                egg.count             = eggs_count; // update number of eggs
                event.target.disabled = true; // disable button to ban selling eggs
            } else {
                // show modal ( на всякий случай)) )
                this.$bvModal.show('modal-eggs');
            }
        },
        async cleanHandler(egg, event) {
            let btn = event.target;

            btn.disabled = true;

            setTimeout(() => {
                btn.disabled = false;
            }, 1000);

            let litter = await this.clean(egg.id);
            egg.litter = litter;
        },
        selectShovel(shovel, e) {
            this.getUserShovels.forEach(elem => {
                // console.log(elem, shovel)
                if (elem.id != shovel.id) elem.pivot.isActive = 0;
                else elem.pivot.isActive = 1;
            })
            // e.target.classList.add('active');
        }
    },
    computed: {...mapGetters(['getEggs', 'getUserShovels'])},
    mounted() {
        this.fetchUserEggs();
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
.shovels-list{
    display: flex;

    .shovel-item{
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

        &.active{
            border: 5px solid #007bff;
        }
        &:hover{
            border: 5px solid #82b3ff;
        }


        * {pointer-events: none;}
        img {width: 100%;}
        div{
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
