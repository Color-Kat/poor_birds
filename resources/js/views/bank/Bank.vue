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
                    <b>💶</b>На счету: {{getDonateBalance}} GTN
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
                    <h5>💱Обменять <b>густинаны</b> на ₽</h5>

                    <label for="exchange_gtn"><b>GTN</b> Кол-во густинианов:</label>
                    <b-form-input type="number" id="exchange_gtn" name="exchange_gtn"></b-form-input>

                    <label for="exchange_rub"><b>RUB</b> Кол-во рублей:</label>
                    <b-form-input type="number" id="exchange_rub" name="exchange_rub"></b-form-input>

                    <hr>
                    <h5>Курс:</h5>
                    <b>1 GTN густиниан</b> = <b>1.28 RUB рублей</b>
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
import {mapActions, mapGetters} from "vuex";
export default {
    name: "Bank",
    components: {Loader},
    data: ()=>({
        loading: true
    }),
    computed:{
        ...mapGetters(['getDonateBalance', 'getCurrencies'])
    },
    methods: {
        ...mapActions(['fetchCurrencies'])
    },
    async created() {
        let res = await this.fetchCurrencies();
        if(res) this.loading = false;
        console.log(this.getCurrencies);
    }
}
</script>

<style scoped>

</style>
