<template>
    <div class="d-flex justify-content-center">
        <!--    Hello page   -->
        <div
            class="container px-1 px-lg-5"
            v-if="!getAuth"
            style="border-radius: 24px; padding: 8px;"
        >

            <!--      SLIDE 1      -->
            <div class="row gx-5 align-items-center">
                <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up">
                    <h1 class="page-header-ui-title">Бедные птички</h1>

                    <p class="page-header-ui-text mb-5">
                        Добро пожаловать в <b class="m-0">Бедные птички</b>!
                        Это экономическая игра с сюжетом, в которой нужно покупать птиц,
                        собирать их яйца и зарабатывать игровые деньги на покупку новых птиц!
                    </p>

                    <b-button class="fw-500 me-3" variant="primary" :to="{name: 'registration'}">
                        Зарегистрироваться
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="feather feather-arrow-right ms-2"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </b-button>
                    <b-link
                        class="btn btn-lg btn-primary-soft text-primary fw-500"
                        :to="{name: 'birds'}"
                    >Птицы
                    </b-link>
                </div>
                <div
                    class="col-lg-6 d-none d-lg-block aos-init aos-animate" data-aos="fade-up" data-aos-delay="100"
                >
                    <img class="img-fluid" src="/logo.png">
                </div>
            </div>
            <!--      SLIDE 1      -->

            <!--      SLIDE 2      -->
            <div class="container mt-5 pt-2">
                <div class="row d-flex justify-content-center">
                    <ShortTip
                        title="Покупайте птиц"
                        text="Они будут нести яйца и производить помёт ровно каждый час!"
                        image="/assets/images/money.png"
                    />

                    <ShortTip
                        title="Продавайте яйца"
                        text="Получайте игровые деньги, продавая яйца птиц!"
                        image="/assets/images/egg.png"
                    />

                    <ShortTip
                        title="Убирайте помёт"
                        text="Покупайте лопаты, чтобы убирать птичий помёт!"
                        image="/assets/images/shovel.png"
                    />

                </div>
            </div>
            <!--      SLIDE 2      -->


            <!--      SLIDE 3      -->
            <div class="container mt-5">

                <hr>

                <h1 class="text-center mb-5" style="font-family: Montserrat">Подробнее</h1>

                <!--                <div class="row">-->
                <!--                    <div class="col-md-7">-->
                <!--                        <h2 style="font-family: Montserrat">Покупка птиц</h2>-->
                <!--                        <p class="lead">-->
                <!--                            Чтобы купить птицу, игроку сначала нужно найти продавца, который-->
                <!--                            продаст ему эту птицу и заключить с ним договор-->
                <!--                            Продавцы отличаются наценкой на птиц и бонусами, которые дают своим птицам.-->
                <!--                        </p>-->
                <!--                    </div>-->
                <!--                    <div class="col-md-5 d-flex justify-content-center align-items-center justify-content-md-end">-->
                <!--                        <img-->
                <!--                            class="img-fluid"-->
                <!--                            src="/assets/images/seller.png"-->
                <!--                        >-->
                <!--                    </div>-->
                <!--                </div>-->


                <Tip
                    title="Покупка птиц"
                    text="Чтобы купить птицу, игроку сначала нужно найти продавца, который
                        продаст ему эту птицу и заключить с ним договор
                        Продавцы отличаются наценкой на птиц и бонусами, которые дают своим птицам."
                    image="/assets/images/seller.png"
                />
                <hr>

                <Tip
                    title="Уборка"
                    text="Птицы постоянно производят помёт!
                        Каждые 200ед помёта уменьшают плодоносность на 5%.
                        Чтобы птицы всегда исправно неслись, нужно убираться.
                        Для этого есть лопаты, которыми можно убирать птичий помёт"
                    image="/assets/images/shovel.png"
                    :reverse="true"
                />
                <hr>

                <Tip
                    title="Сертификаты"
                    text="Сертификат - бумажка от врача, которая даёт птицам самые разные бонусы:
                          повышенная плодоносность, увеличенная цена яйца, уменьшенное кол-во помёта и тд.
                          У одного вида птиц может быть только один сертификат!"
                    image="/assets/images/certificate.jpg"
                />
                <hr>

                <Tip
                    title="Сюжет"
                    text="В игре есть интересный и забавный сюжет с нотками драмы и трагедии и эпичным финалом
                          Сюжет открывается при открытии продавцов и покупке новых птиц."
                    image="/assets/images/story.png"
                    :reverse="true"
                />
                <hr>
            </div>
            <!--      SLIDE 3      -->

        </div>


        <!--        <b-card-->
        <!--            v-if="!getAuth"-->
        <!--            title="Бедные птички😭"-->
        <!--            class="mb-2 text-center col-lg-9 col-md-10 col-sm-12"-->
        <!--            style="border-radius: 24px; padding: 8px;"-->
        <!--        >-->

        <!--           -->
        <!--            &lt;!&ndash;            &ndash;&gt;-->
        <!--            &lt;!&ndash;            <b-card&ndash;&gt;-->
        <!--            &lt;!&ndash;                style="border-right: 24px;&ndash;&gt;-->
        <!--            &lt;!&ndash;                overflow: hidden"&ndash;&gt;-->
        <!--            &lt;!&ndash;                class="shadow"&ndash;&gt;-->
        <!--            &lt;!&ndash;                body-class="row d-flex align-items-center"&ndash;&gt;-->
        <!--            &lt;!&ndash;            >&ndash;&gt;-->
        <!--            &lt;!&ndash;                &lt;!&ndash;         TEXT       &ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;                <span class="col text-center" style="font-family: Montserrat; font-size: 1.1rem">&ndash;&gt;-->
        <!--            &lt;!&ndash;                     <b  class="m-0">Бедные птички</b>&ndash;&gt;-->
        <!--            &lt;!&ndash;                     - это экономическая игра c сюжетом, в которой нужно покупать птиц,&ndash;&gt;-->
        <!--            &lt;!&ndash;                     собирать их яйца и зарабатывать игровые деньги на новых птиц!&ndash;&gt;-->
        <!--            &lt;!&ndash;                </span>&ndash;&gt;-->

        <!--            &lt;!&ndash;                &lt;!&ndash;         IMAGE       &ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;                <span class="row">&ndash;&gt;-->
        <!--            &lt;!&ndash;                    <img src="/logo.png" alt="" class="col" style="width: 200px !important" >&ndash;&gt;-->
        <!--            &lt;!&ndash;                </span>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </b-card>&ndash;&gt;-->
        <!--            &lt;!&ndash;       SLIDE 1     &ndash;&gt;-->

        <!--            <b-button-->
        <!--                class="text-center px-3 mt-3" :to="{name: 'birds'}"-->
        <!--                variant="primary"-->
        <!--            >Купить птиц!-->
        <!--            </b-button>-->
        <!--        </b-card>-->
        <!--    Hello page   -->

        <b-card
            v-else
            title="Бедные птички😭"
            class="mb-2 text-center card-rounded"
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

            <!--    NEWS    -->
            <b-card style="border-radius: 24px;" class="shadow">
                <h3>Новости</h3>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    03.07.2021 - сделан редизайн игры. Полностью завершён сюжет.
                </b-card>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    28.06.2021 - оптимизация игры.
                </b-card>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    05.06.2021 - релиз игры.
                </b-card>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    Добавлен банк, в котором можно купить различные валюты и играть на их курсе.
                </b-card>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    Добавлена шахта, в которой можно немного заработать денег.
                    Начата разработка банка, в котором можно будет купить Густинианы (валюта игры) за реальные деньги
                    для
                    покупки различных эксклюзивных птиц, лопат, контрактов и бригады.
                </b-card>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    Добавлены новый раздел - контракты. Там вы можете найти людей, с которыми можно сотрудничать.
                    Пока в игре доступно всего 3 контракта. Но это ненадолго;)
                </b-card>
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
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
                <b-card class="p-1 mb-2 shadow" style="border-radius: 24px;">
                    В приложение добавлены уведомления
                </b-card>
            </b-card>
            <!--    NEWS    -->
        </b-card>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import NavWidget from "../components/navigation/NavWidget";
import ShortTip from "../components/hello/ShortTip";
import Tip from "../components/hello/Tip";

export default {
    name      : "Index",
    components: {
        Tip,
        ShortTip,
        NavWidget
    },
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
