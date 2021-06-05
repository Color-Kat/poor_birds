<template>
    <div>
        <b-modal id="modal-no-money-exchange" header-bg-variant="danger" hide-footer>
            <p class="my-2">Недостаточно средств на счету</p>
        </b-modal>

        <b-modal id="modal-success-transaction" header-bg-variant="success" hide-footer>
            <p class="my-2">Транзакция произошла успешно</p>
        </b-modal>

        <!--        <b-modal id="modal-error-transaction" header-bg-variant="danger" hide-footer>-->
        <!--            <p class="my-2">Произошла какая-то ошибка</p>-->
        <!--        </b-modal>-->

        <form v-if="type=='buy'">
            <label class="m-0 mt-1">Обменять:</label>
            <b-input-group size="lg" :append="exchange">
                <b-form-input
                    type="number"
                    min="0"
                    :max="getUserWallets[exchange]"
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

            <b-button
                variant="primary"
                class="mt-2 w-100"
                @click="transactionHandler"
            >Купить
            </b-button>
        </form>

        <form v-else>
            <label class="m-0 mt-1">Продать:</label>
            <b-input-group size="lg" :append="currency">
                <b-form-input
                    type="number"
                    min="0"
                    :max="getUserWallets[currency]"
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

            <b-button
                variant="primary"
                class="mt-2 w-100"
                @click="transactionHandler"
            >Продать
            </b-button>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name    : "CurrencyTabExchange",
    props   : ['type', 'currency', 'exchange', 'rate'],
    data    : () => ({
        currency_buy : 0,
        currency_sell: 0
    }),
    computed: {
        /** return count of exchange currency when buying */
        currency_buy_result() {
            return parseFloat((this.currency_buy / +this.rate).toFixed(10))
        },
        /** return count of exchange currency when selling */
        currency_sell_result() {
            return parseFloat((this.currency_sell * +this.rate).toFixed(10))
        },
        ...mapGetters(['getUserWallets'])
    },
    methods : {
        ...mapActions(['transaction', 'fetchUser']),
        /** check money and send a request to buy/sell currency */
        async transactionHandler() {
            let result;
            //check if there is enough money
            if (this.type == 'buy') {
                // if (this.currency_buy > this.getUserWallets[this.exchange])
                //     this.$bvModal.show('modal-no-money-exchange');
                // else {
                    // transaction request with
                    result = await this.transaction({
                        type    : this.type, // buy or sell
                        amount  : this.currency_buy, // count of user money for transaction
                        currency: this.currency, // currency to buy (1 USD)
                        exchange: this.exchange, // currency to sell (73.5 RUB)
                    });
                // }
            } else {
                // check is enough currency
                if (this.currency_sell > this.getUserWallets[this.currency])
                    this.$bvModal.show('modal-no-money-exchange'); // show no money modal
                else {
                    // transaction request with
                    result = await this.transaction({
                        type    : this.type, // buy or sell
                        amount  : this.currency_sell, // count of user money for transaction
                        currency: this.currency, // currency to sell (1 USD)
                        exchange: this.exchange, // currency to get (73.5 RUB)
                    });
                }
            }

            if (result) {
                this.$bvModal.show('modal-success-transaction'); // success modal
                this.fetchUser(); // update wallets data
            } else this.$bvModal.show('modal-no-money-exchange'); // no money modal
        },
        /** check money and send a request to sell currency */
        sell() {
            //check if there is enough money
            if (this.currency_sell > this.getUserWallets[this.currency])
                this.$bvModal.show('modal-no-money-exchange');
            else {
                console.log('sell');
            }
        }
    }
}
</script>

<style scoped>

</style>
