<template>
    <div id="bank">
        <!--        <Loader v-if="loading"/>-->

        <b-modal id="modal-how-invest" header-bg-variant="info" hide-footer>
            <h3>А как инвестировать?</h3>
            <span class="my-2">
               <span>
                   В разделе "Обмен валют" вы можете совершать операции с вашими счетами. <br>
                    В игре есть 4 валюты: <ul>
                        <li><i>Густинианы <b>(GTN)</b></i> - покупаются за донат</li>
                        <li><i>Рубль <b>(RUB)</b></i></li>
                        <li><i>Доллар <b>(USD)</b></i></li>
                        <li><i>Биткоин <b>(BTC)</b></i></li>
                    </ul>
                    <br>
                    Густинианы - это элитная валюта, за которую можно купить то, что нельзя за другие валюты.
                    Они покупаются за донат в разделе "Купить густинианы (GTN)". <br>
               </span>

                <h4>Перейдем к разбору раздела "Обмен валют"</h4>
                <p>
                    Сначала выбираем тип сделки: купить или продать. <br>
                    Затем выбираем какую валюту мы хотим купить/продать. <br>
                    В появившемся поле вводим сумму которую мы хотим обменять/продать.
                    В поле ниже будет выведена сумма, которую мы получим при обмене/продажи. <br>
                    Чтобы совершить транзакцию, нажимаем на кнопку купить/продать.
                </p>
                <hr>

                <h4>Как заработать на инвестициях?</h4>
                <span>
                    При обмене валют можно хорошо заработать. Рассмотрим 2 ситуации: <br>

                    <p>
                        <b>USD или BTC</b> - курс доллара и биткоина постоянно то растет, то падает.
                        Чтобы на этом заработать, нужно ждать самого низкого курса, чтобы купить валюту.
                        А потом ждать повышения этого курса, чтобы максимально выгодно продать её.
                        <b>Пример:</b> У маши было 10к рублей. Она купила на них 0,00359 BTC.
                        А через 2 дня курс биткоина увеличился. И у Маши 0,00359 BTC стали стоить не 10к,
                        а 19к рублей.
                    </p>

                    <p>
                        <b>Продажа GTN</b> - если вы хотите обменять лишние густинианы на рубли, то
                        подождите подходяшего курса, когда 1 GTN будет стоить максимум рублей (курс изменяется каждый час).
                        Чтобы было проще ориентироваться - смотрите на график. (Обратите внимание, что информация
                        в графике показывает курс RUB к GTN, а это значит, что нужно ждать самого низкого курса, чтобы
                        получить больше RUB при продаже GTN).
                    </p>
                </span>
            </span>
        </b-modal>

        <b-card>
            <h2>🏦Банк</h2>
            <p>
                Это главный банк Густограда. В нём вы можете купить
                <b>💶густинаны💶</b>, обменять их на обычные деньги и,
                конечно, взять кредит под бешеные проценты!
            </p>

            <!--      BALANCE      -->
            <BalanceWidget currency="GTN" :count="getUserWallets.GTN"/>
            <!--      BALANCE      -->

            <hr>

            <!--     WALLETS     -->
            <b-alert show variant="secondary">
                <div id="wallets">
                    <h5>👛Ваши счета</h5>

                    <div class="container" v-if="Object.values(getCurrencies).length">
                        <!--             GTN           -->
                        <Wallet
                            currency="GTN"
                            :count="getUserWallets.GTN"
                            :rate="getCurrencies.RUB[0].rate"
                            exchange="RUB"
                        />

                        <!--             BTC           -->
                        <Wallet
                            currency="BTC"
                            :count="getUserWallets.BTC"
                            :rate="getCurrencies.BTC[0].rate"
                            exchange="RUB"
                        />

                        <!--             BTC           -->
                        <Wallet
                            currency="USD"
                            :count="getUserWallets.USD"
                            :rate="getCurrencies.USD[0].rate"
                            exchange="RUB"
                        />
                    </div>
                </div>
            </b-alert>
            <!--      WALLETS      -->

            <hr>

            <!--     CREDIT     -->
            <b-alert show variant="danger">
                <div id="credit">
                    <h5>💸Взять кредит (в разработке)</h5>
                    <label for="credit_sum">Сумма кредита в <b>рублях RUB</b>:</label>
                    <b-form-input type="number" id="credit_sum" name="credit_sum"></b-form-input>

                    <span>Нужно выплатить с учетом процентов: <b>200 рублей RUB</b></span>
                </div>
            </b-alert>

            <!--      EXCHANGE GTN      -->
            <b-alert show variant="primary">
                <div id="exchange_currency" class="position-relative">
                    <div class="m-1 position-absolute w-100 text-right">
                        <b-badge
                            v-b-toggle.collapse-shovel
                            pill size="sm"
                            variant="dark"
                            @click="()=>{$bvModal.show('modal-how-invest')}"
                        >?</b-badge>
                    </div>

                    <h5>💱Обмен валют</h5>

                    <!--          TRANSACTION TYPE          -->
                    <b-form-group label="Выберите тип сделки:" v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                            id="btn-radios-1"
                            class="w-100"
                            button-variant="primary"
                            v-model="transactionType"
                            :options="transactionOptions"
                            :aria-describedby="ariaDescribedby"
                            name="radios-btn-default"
                            buttons
                        ></b-form-radio-group>
                    </b-form-group>
                    <!--          TRANSACTION TYPE          -->

                    <!--          SELECT CURRENCY          -->
                    <div class="mt-2" v-if="getCurrencies.RUB">
                        <b-tabs
                            active-nav-item-class="text-light bg-primary border-primary"
                            nav-class="border-primary"
                            active-tab-class="border-primary"
                            content-class="mt-2"
                            lazy
                        >
                            <!--   GTN can't buy (RUB can't sell to GTN)   -->
                            <CurrencyTab
                                v-if="transactionType !== 'sell'"
                                :currencies="getCurrencies.RUB"
                                :type="transactionType"
                            />

                            <CurrencyTab :currencies="getCurrencies.USD" :type="transactionType"/>

                            <CurrencyTab :currencies="getCurrencies.BTC" :type="transactionType"/>
                        </b-tabs>
                    </div>
                </div>
            </b-alert>

            <!--      BUY GTN      -->
            <b-alert show variant="success">
                <div id="buy-gtn">
                    <h5>💲Купить <b>густинаны (GTN):</b></h5>
                    <span>
                        Для покупки перейдите
                        <b-link :to="{name: 'payment'}">сюда</b-link>
                    </span>
                </div>
            </b-alert>
        </b-card>
    </div>
</template>

<script>
import Loader from "../../components/Loader";
import Chart from "../../components/chart/Chart";
import BalanceWidget from "../../components/wallets/BalanceWidget";
import CurrencyTab from "../../components/currency/CurrencyTab";
import {mapActions, mapGetters} from "vuex";
import Wallet from "../../components/wallets/Wallet";

export default {
    name      : "Bank",
    components: {
        Wallet,
        Chart,
        CurrencyTab,
        BalanceWidget
    },
    data      : () => ({
        loading: true,
        // transaction buttons
        transactionType   : 'buy',
        transactionOptions: [
            {text    : 'Купить',
                value: 'buy'
            },
            {text    : 'Продать',
                value: 'sell'
            },
        ],

        // chart
        chartData: {},
        options  : {}
    }),
    computed  : {
        ...mapGetters(['getUserWallets', 'getCurrencies']),
    },
    methods   : {
        ...mapActions(['fetchCurrencies'])
    },
    async created() {
        let res = await this.fetchCurrencies();
        if (res) this.loading = false;
        console.log(this.getCurrencies);
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
#wallets{
    .container {
        display: grid;
        padding: 0;
        margin: 0 !important;
        grid-template-columns: 1fr 1fr;
        grid-gap: 7px;

        @media (max-width: 630px) {
            grid-template-columns: 1fr;
        }
    }
}
</style>
