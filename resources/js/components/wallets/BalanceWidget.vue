<template>
    <h5 class="position-absolute" style="right: 0; top: 0">
        <b-badge variant="light">
            <b>💶</b>На счету: {{ count }} {{ currency }}
        </b-badge>
    </h5>
</template>

<script>
export default {
    name: "BalanceWidget",
    props: ['currency', 'count']
}
</script>

<style scoped>

</style>
