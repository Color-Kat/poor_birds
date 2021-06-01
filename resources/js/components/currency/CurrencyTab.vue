<template>
    <b-tab :title="getLatest.currency">
        <CurrencyTabHead :currency="getLatest.currency" :exchange="getLatest.exchange" :type="type"/>

        <!--    Rate for currency    -->
        <CurrencyTabRate
            :currency="getLatest.currency"
            :exchange="getLatest.exchange"
            :rate="getLatest.rate"
            :type="type"
            :isIncrease="getLatest.rate >= getPrevious.rate"
        />

        <CurrencyTabExchange
            :currency="getLatest.currency"
            :exchange="getLatest.exchange"
            :rate="getLatest.rate"
            :type="type"
        />

        <hr>
        <h4>{{`Курс ${getLatest.currency} к ${getLatest.exchange}`}}</h4>

        <Chart
            :chart-data="getChartData"
            :chart-options="{
                    scales: {
                        y: {
                            ticks: {
                                // Include a currency sign in the ticks
                                callback: (value) => {
                                    return value +' '+ this.getLatest.exchange;
                                }
                            }
                        }
                    },
                    responsive:true
                }"
        />
    </b-tab>
</template>

<script>
import CurrencyTabHead from "./CurrencyTabHead";
import CurrencyTabRate from "./CurrencyTabRate";
import CurrencyTabExchange from "./CurrencyTabExchange";
import Chart from "../chart/Chart";

export default {
    name      : "CurrencyTab",
    components: {
        Chart,
        CurrencyTabRate,
        CurrencyTabHead,
        CurrencyTabExchange
    },
    methods   : {
        /**
         * @param mysqlDate - mysql date timestamp
         * @return date - milliseconds date
         * */
        convert_mysql_date_timestamp(mysqlDate) {
            // Split timestamp into [ Y, M, D, h, m, s ]
            let t = mysqlDate.split(/[- : T]/);

            // console.log(mysqlDate,t)
            // Apply each element to the Date function
            return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3]));
        }
    },
    computed  : {
        /** return latest currency data */
        getLatest() {
            return this.currencies[0];
        },
        /** return previous currency data */
        getPrevious() {
            return this.currencies[1];
        },
        getChartData() {
            if (!this.currencies) return {};

            let labels = [];
            let data   = [];

            this.currencies.forEach(day => {
                // console.log(day)
                data.push(day.rate.toFixed(3));

                let date = this.convert_mysql_date_timestamp(day.created_at);
                labels.push(date.getHours());
            })

            return {
                labels  : labels,
                datasets: [{
                    label      : 'Курс',
                    data       : data,
                    borderWidth: 1
                }]
            }
        }
    },
    props     : ['currencies', 'type']
}
</script>

<style scoped>

</style>
