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
    </b-tab>
</template>

<script>
import CurrencyTabHead from "./CurrencyTabHead";
import CurrencyTabRate from "./CurrencyTabRate";
import CurrencyTabExchange from "./CurrencyTabExchange";

export default {
    name      : "CurrencyTab",
    components: {
        CurrencyTabRate,
        CurrencyTabHead,
        CurrencyTabExchange
    },
    computed  : {
        /** return latest currency data*/
        getLatest() {
            if (!this.currencies) return false
            return this.currencies[0];
        }
    },
    props     : ['currencies', 'type']
}
</script>

<style scoped>

</style>
