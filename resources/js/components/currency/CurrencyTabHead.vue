<template>
    <div>
        <h5 v-if="type == 'buy'">Купить <b>{{ currency }}</b> за <b>{{exchange}}</b></h5>
        <h5 v-else>Продать <b>{{ currency }}</b></h5>
    </div>
</template>

<script>
export default {
    name: "CurrencyTabHead",
    props: ['type', 'currency', 'exchange']
}
</script>

<style scoped>

</style>
