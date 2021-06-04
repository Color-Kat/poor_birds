<template>
    <div>
        <!--    Hello page   -->
        <b-card
            v-if="!getAuth"
            title="Бедные птички😭"
            class="mb-2 text-center"
        >

            <b-card-text class="text-left">
                <p>
                    <b>Бедные птички</b> - игра с <i>сюжетом</i>, в которой вы открываете птицеферму
                    в городе <b>Густоград</b>. Вы покупаете самых разнообразных <b> птиц🦅</b>. Они каждый час
                    несут <b>яйца🥚</b> и <b>гадят💩</b>. <br>
                </p>
                <p>
                    Заходи в игру как можно чаще🕐, собирай прибыль💲, чисть курятники🧹 и
                    зарабатывай на новых птиц💹!
                </p>
                <!--                Бедные птички - это проект, в котором вы с соткой в руках решаете открыть птицеферму! Чтобы купить птиц-->
                <!--                вы выбираете между разными поставщиками (базар, магазин, частник дядя Коля и др.) и приобретаете у них-->
                <!--                птиц; они несут вам яйца, продавая которые, вы будете получать прибыль; покупать новых птиц; и получать-->
                <!--                прибыль еще больше!-->
                <!--                Но птицы тоже не пальцем деланные 🤪 Чтобы они хорошо плодоносили, придется за ними ухаживать:-->
                <!--                убирать помет😅 и просто гладить, чтобы они лучше неслись-->

                <hr>
                Данная игра еще находится в разработке, так что возможны баги, обнуление результатов.
                В игру все еще добавляется новый контент.
            </b-card-text>
            <hr>
            <b-button class="text-center" :to="{name: 'birds'}" variant="primary">Купить пташку!</b-button>
        </b-card>
        <!--    Hello page   -->

        <b-card
            v-else
            title="Бедные птички😭"
            class="mb-2 text-center"
        >

            <b-card-text class="text-left">
                <NavWidget/>

                <hr>
                <h4>Статистика:</h4>
                <h5>
                    <b-badge variant="danger">Налоги: {{ getFines.toFixed(2) }}₽</b-badge>
                    <b-badge variant="success">Всего яиц: {{ getEggsCount }} шт</b-badge>
                    <b-badge variant="primary">Я яиц на сумму: {{ getEggsTotalPrice }}₽</b-badge>
                    <hr>
                    <!--                    <b-badge variant="danger">Налоги: {{ getFines }}₽</b-badge>-->
                    <!--                    <b-badge variant="success">Всего яиц: {{ getEggsCount }} шт</b-badge>-->
                    <b-badge variant="primary">
                        Самая дорогая птица: {{ getMostExpensiveBird.name }} -
                        {{ getMostExpensiveBird.price }}₽
                    </b-badge>
                    <br>
                    <b-badge variant="success">
                        Самая плодоносная птица: {{ getMostFertileBird.name }} -
                        {{ getMostFertileBird.fertility }} яиц/час
                    </b-badge>
                    <br>
                    <b-badge variant="danger">
                        Самая дешевая птица: {{ getCheapestBird.name }} -
                        {{ getCheapestBird.price }}₽
                    </b-badge>
                    <br>
                    <b-badge variant="dark">
                        Самая какающая птица: {{ getPoopingBird.name }} -
                        {{ getPoopingBird.litter }} ед.помёта/час
                    </b-badge>
                </h5>
            </b-card-text>


        </b-card>

        <!--    NEWS    -->
        <b-card>
            <h3>Новости</h3>
            <b-card class="p-1 mb-2">
                Добавлена шахта, в которой можно немного заработать денег.
                Начата разработка банка, в котором можно будет купить Густинианы (валюта игры) за реальные деньги для
                покупки различных эксклюзивных птиц, лопат, контрактов и бригады.
            </b-card>
            <b-card class="p-1 mb-2">
                Добавлены новый раздел - контракты. Там вы можете найти людей, с которыми можно сотрудничать.
                Пока в игре доступно всего 3 контракта. Но это ненадолго;)
            </b-card>
            <b-card class="p-1 mb-2">
                Добавлены новые птицы:
                <ul>
                    <li>Гусь</li>
                    <li>Утка</li>
                    <li>Индюк</li>
                    <li>Петух</li>
                    <li>Генномодифицированный петух</li>
                    <li>Петух-трансгендер</li>
                    <li>и другие</li>
                </ul>
            </b-card>
            <b-card class="p-1 mb-2">
                В приложение добавлены уведомления
            </b-card>
        </b-card>
        <!--    NEWS    -->
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import NavWidget from "../components/navigation/NavWidget";

export default {
    name      : "Index",
    components: {NavWidget},
    computed  : {
        ...mapGetters(['getAuth', 'getUserData', 'getMyBirds', 'getEggs']),
        /**
         * @returns - count fines for all eggs
         */
        getFines() {
            let fines = 0;
            this.getEggs.forEach(elem => {
                fines += +elem.fine;
            });

            return fines;
        },
        /**
         * @returns - counting all eggs
         */
        getEggsCount() {
            let count = 0;
            this.getEggs.forEach(elem => {
                count += +elem.count;
            });

            return Math.round(count);
        },
        /**
         * @returns - counting all eggs price
         */
        getEggsTotalPrice() {
            let price = 0;
            this.getEggs.forEach(elem => {
                price += +elem.price * +elem.count;
            });

            return Math.round(price);
        },
        /**
         * get the most expensive bird
         * @returns price - price of the most expensive bird.
         * @returns name - name of the most expensive bird
         */
        getMostExpensiveBird() {
            let maxPrice = 0;
            let birdName = '';

            this.getMyBirds.forEach(elem => {
                if (+elem.price > maxPrice) {
                    maxPrice = +elem.price;
                    birdName = elem.name
                }
            });

            return {
                price: Math.round(maxPrice),
                name : birdName
            };
        },
        /**
         * get the cheapest bird
         * @returns {{price, name}} - price of cheapest bird, name of cheapest bird
         */
        getCheapestBird() {
            let minPrice = Infinity;
            let birdName = '';

            this.getMyBirds.forEach(elem => {
                if (+elem.price < minPrice) {
                    minPrice = +elem.price;
                    birdName = elem.name
                }
            });

            return {
                price: Math.round(minPrice),
                name : birdName
            };
        },
        /**
         * get the most fertile bird
         * @returns {{fertility, name}}
         */
        getMostFertileBird() {
            let maxFertility = 0;
            let birdName     = '';

            this.getMyBirds.forEach(elem => {
                if (+elem.fertility > maxFertility) {
                    maxFertility = +elem.fertility;
                    birdName     = elem.name
                }
            });

            return {
                fertility: Math.round(maxFertility),
                name     : birdName
            };
        },
        /**
         * get the most pooping bird
         * @returns {{litter, name}}
         */
        getPoopingBird() {
            let maxLitter = 0;
            let birdName  = '';

            this.getMyBirds.forEach(elem => {
                if (+elem.litter > maxLitter) {
                    maxLitter = +elem.litter;
                    birdName  = elem.name
                }
            });

            return {
                litter: Math.round(maxLitter),
                name  : birdName
            };
        },
    }
}
</script>

<style scoped lang="scss">
</style>
