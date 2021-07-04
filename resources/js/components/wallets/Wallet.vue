<template>
    <b-card
        :title="currency"
        tag="article"
        class="wallet shadow rounded-lg"
    >
        <b-card-text>
            На счету {{ count }} {{currency}} <br>
            на сумму {{ getAmount }} {{exchange}}
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    name: "Wallet",
    props: ['currency' , 'count', 'rate', 'exchange'],
    computed: {
        getAmount() {
            if(this.currency == 'GTN')  return (this.count / +this.rate).toFixed(2);
            else  return (this.count * +this.rate).toFixed(2);
        }
    }
}
</script>

<style scoped>

</style>
