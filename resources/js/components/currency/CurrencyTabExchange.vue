<template>
    <div>
        <form v-if="type=='buy'">
            <label class="m-0 mt-1">Обменять:</label>
            <b-input-group size="lg" :append="exchange">
                <b-form-input
                    type="number"
                    min="0"
                    v-model="currency_buy"
                ></b-form-input>
            </b-input-group>

            <label class="m-0 mt-1">Вы получите:</label>
            <b-input-group size="md" :append="currency">
                <b-form-input
                    type="number"
                    disabled
                    :value="currency_buy_result"
                ></b-form-input>
            </b-input-group>
        </form>

        <form v-else>
            <label  class="m-0 mt-1">Продать:</label>
            <b-input-group size="lg" :append="currency">
                <b-form-input
                    type="number"
                    min="0"
                    v-model="currency_sell"
                ></b-form-input>
            </b-input-group>

            <label class="m-0 mt-1">Вы получите:</label>
            <b-input-group size="md" :append="exchange">
                <b-form-input
                    type="number"
                    disabled
                    :value="currency_sell_result"
                ></b-form-input>
            </b-input-group>
        </form>
    </div>
</template>

<script>
export default {
    name : "CurrencyTabExchange",
    props: ['type', 'currency', 'exchange', 'rate'],
    data:()=>({
        currency_buy: 0,
        currency_sell: 0
    }),
    computed:{
        /** return count of exchange currency when buying */
        currency_buy_result(){
            return parseFloat((this.currency_buy / this.rate).toFixed(10))
        },
        /** return count of exchange currency when selling */
        currency_sell_result(){
            return parseFloat((this.currency_sell * this.rate).toFixed(10))
        }
    }
}
</script>

<style scoped>

</style>
