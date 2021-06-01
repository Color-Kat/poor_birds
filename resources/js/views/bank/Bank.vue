<template>
    <div id="bank">
        <!--        <Loader v-if="loading"/>-->

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
                            :rate="getCurrencies.GTN[0].rate"
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
                <div id="exchange_currency">
                    <h5>💱Обменять валют</h5>

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
                    <h5>💲Купить <b>густинаны:</b></h5>
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
