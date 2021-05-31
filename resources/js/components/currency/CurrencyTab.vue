<template>
    <b-tab :title="getLatest.currency">
        <CurrencyTabHead :currency="getLatest.currency" :exchange="getLatest.exchange" :type="type"/>

        <!--    Rate for currency    -->
        <CurrencyTabRate
            :currency="getLatest.currency"
            :exchange="getLatest.exchange"
            :rate="getLatest.rate"
            :type="type"
        />

        <CurrencyTabExchange
            :currency="getLatest.currency"
            :exchange="getLatest.exchange"
            :rate="getLatest.rate"
            :type="type"
        />

        <Chart
            :chart-data="getChartData"
            :chart-options="{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
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
    methods:{
        /**
         * @param mysqlDate - mysql date timestamp
         * @return date - milliseconds date
         * */
        convert_mysql_date_timestamp(mysqlDate) {
            // Split timestamp into [ Y, M, D, h, m, s ]
            let t = mysqlDate.split(/[- : T]/);

            console.log(mysqlDate,t)
            // Apply each element to the Date function
            return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3]));
        }
    },
    computed  : {
        /** return latest currency data*/
        getLatest() {
            // if (!this.currencies) return false
            return this.currencies[0];
        },
        getChartData() {
            if (!this.currencies) return {};

            let labels = [];
            let data = [];

            this.currencies.forEach(day => {
                // console.log(day)
                data.push(day.rate);

                let date = this.convert_mysql_date_timestamp(day.created_at);
                console.log(date)
                labels.push(date.getHours());
            })
            console.log(labels, data)

            return {
                labels: labels,
                datasets: [{
                    label: 'Курс',
                    data: data,
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
