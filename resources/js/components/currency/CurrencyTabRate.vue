<template>
    <h5>
        <b-badge :variant="isIncrease ? 'success' : 'danger'" v-if="type == 'buy'" class="shadow">
            1 {{
                currency + ' = ' +
                rate + ' ' +
                exchange
            }}

            <!--      is increase arrow      -->
            {{isIncrease ? '▲' : '▼'}}
        </b-badge>

        <b-badge :variant="!isIncrease ? 'success' : 'danger'" v-else class="shadow">
            1 {{
                exchange + ' ≈ ' +
                ( currency != 'BTC' ? (1/rate).toFixed(2) : (1/rate).toFixed(8)) + ' ' +
                currency
            }}

            <!--      is increase arrow      -->
            {{!isIncrease ? '▲' : '▼'}}
        </b-badge>
    </h5>
</template>

<script>
export default {
    name: "CurrencyTabRate",
    props: ['type', 'currency', 'exchange', 'rate', 'isIncrease']
}
</script>

<style scoped>

</style>
