<template>
    <h5>
        <b-badge variant="primary" v-if="type == 'buy'">
            1 {{
                currency + ' = ' +
                rate + ' ' +
                exchange
            }}
        </b-badge>

        <b-badge variant="primary" v-else>
            1 {{
                exchange + ' ≈ ' +
                (1/rate).toFixed(2) + ' ' +
                currency
            }}
        </b-badge>
    </h5>
</template>

<script>
export default {
    name: "CurrencyTabRate",
    props: ['type', 'currency', 'exchange', 'rate']
}
</script>

<style scoped>

</style>
