<template>
    <b-card
        :title="currency"
        tag="article"
        class="wallet"
    >
        <b-card-text>
            На счету {{ count }} {{currency}} <br>
            на сумму {{ count / rate }} {{exchange}}
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    name: "Wallet",
    props: ['currency' , 'count', 'rate', 'exchange']
}
</script>

<style scoped>

</style>
