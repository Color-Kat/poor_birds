<template>
    <div>
        <h5 v-if="type == 'buy'">Обменять <b>{{ currency }}</b> на <b>{{ exchange }}</b></h5>
        <h5 v-else>Продать <b>{{ exchange }}</b></h5>
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
