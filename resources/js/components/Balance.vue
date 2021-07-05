<template>
    <h5 v-if="getBalance !== false">
        <b-badge
            variant="primary"
            class="shadow-sm"
        >
            {{formatBalance()}} &#8381;
        </b-badge>
    </h5>
    <b-spinner v-else small variant="light"></b-spinner>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Balance",
    computed: mapGetters(['getBalance']),
    methods: {
        formatBalance() {
            let balance = parseFloat(this.getBalance);

            if (balance >= 1000000000000 ) return (balance/1000000000000).toFixed(2) + 'Tr';
            else if(balance >= 1000000000) return (balance/1000000000).toFixed(2) + 'B';
            else if(balance >= 1000000) return (balance/1000000).toFixed(2) + 'M';
            else return balance
        }
    }
}
</script>

<style scoped>

</style>
