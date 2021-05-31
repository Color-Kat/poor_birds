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
            <h5 class="position-absolute" style="right: 0; top: 0">
                <b-badge variant="light">
                    <b>💶</b>На счету: {{ getDonateBalance }} GTN
                </b-badge>
            </h5>
            <!--      BALANCE      -->

            <hr>

            <!--     CREDIT     -->
            <b-alert show variant="danger">
                <div id="credit">
                    <h5>💸Взять кредит</h5>
                    <label for="credit_sum">Сумма кредита в <b>рублях RUB</b>:</label>
                    <b-form-input type="number" id="credit_sum" name="credit_sum"></b-form-input>

                    <span>Нужно выплатить с учетом процентов: <b>200 рублей RUB</b></span>
                </div>
            </b-alert>

            <!--      EXCHANGE GTN      -->
            <b-alert show variant="primary">
                <div id="exchange">
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
                    <div>
                        <b-tabs
                            active-nav-item-class="text-light bg-primary border-primary"
                            nav-class="border-primary"
                            active-tab-class="border-primary"
                            content-class="mt-2"
                        >
                            <b-tab title="RUB" active>
                                <p>Обменять <b>густинаны</b> на <b>₽</b></p>

                                <b-badge variant="primary" v-if="getCurrencies.RUB">
                                    1 {{getCurrencies.RUB[0].currency + '=' +
                                getCurrencies.RUB[0].rate + ' ' +getCurrencies.RUB[0].exchange}}
                                </b-badge>
                            </b-tab>
                            <b-tab title="USD">
                                <p>Обменять доллары на рубли</p>
                            </b-tab>
                            <b-tab title="BTC">
                                <p>Обменять биткойны на рубли</p>
                                <Chart
                                    :chart-data="{
                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                datasets: [{
                                    label: '# of Votes',
                                    data: [12, 19, 3, 5, 2, 3],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            }"
                                    :chart-options="{
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }"
                                />
                            </b-tab>
                        </b-tabs>
                    </div>
<!--                    <b-card no-body>-->
<!--                        <b-tabs card>-->
<!--                            <b-tab title="Tab 1" active>-->
<!--                                <b-card-text>Tab contents 1</b-card-text>-->
<!--                            </b-tab>-->
<!--                            <b-tab title="Tab 2">-->
<!--                                <b-card-text>Tab contents 2</b-card-text>-->
<!--                            </b-tab>-->
<!--                        </b-tabs>-->
<!--                    </b-card>-->


<!--                    <label for="exchange_gtn"><b>GTN</b> Кол-во густинианов:</label>-->
<!--                    <b-form-input type="number" id="exchange_gtn" name="exchange_gtn"></b-form-input>-->

<!--                    <label for="exchange_rub"><b>RUB</b> Кол-во рублей:</label>-->
<!--                    <b-form-input type="number" id="exchange_rub" name="exchange_rub"></b-form-input>-->

<!--                    <hr>-->
<!--                    <h5>Курс:</h5>-->
<!--                    <b>1 GTN густиниан</b> = <b>1.28 RUB рублей</b>-->


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
import Chart from "../../components/bank/Chart";
import {mapActions, mapGetters} from "vuex";

export default {
    name      : "Bank",
    components: {
        Chart
    },
    data      : () => ({
        loading  : true,
        // transaction buttons
        transactionType: 'buy',
        transactionOptions: [
            { text: 'Купить', value: 'buy' },
            { text: 'Продать', value: 'sell' },
        ],

        chartData: {},
        options  : {}
    }),
    computed  : {
        ...mapGetters(['getDonateBalance', 'getCurrencies'])
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

<style scoped>

</style>
