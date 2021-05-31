<template>
    <div>
        <p>Обменять <b>густинаны</b> на <b>₽</b></p>

        <b-badge variant="primary" v-if="getCurrencies.RUB">
            1 {{getCurrencies.RUB[0].currency + '=' +
        getCurrencies.RUB[0].rate + ' ' +getCurrencies.RUB[0].exchange}}
        </b-badge>
    </div>
</template>

<script>
export default {
    name: "CurrencyTab",
    props:[
        // currency
    ]
}
</script>

<style scoped>

</style>
