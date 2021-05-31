<template>
    <div>
        <b-card class="pay-form">
            <h3> Купить густинианы 💶</h3>

            <h5 class="position-absolute" style="right: 0; top: 0">
                <b-badge variant="light">
                    На счету {{getDonateBalance}} 💶
                </b-badge>
            </h5>

            <!--      RULES      -->
            <div>
                <p>
                    <b>Густинианы</b> - это валюта элиты, за которую можно покупать
                    обычные игровые рубли, особых птиц, топовые лопаты, необычные контракты
                    и нанять бригаду, чтобы продать всее яйца за 1 клик.
                    Густинианы придумал <b>👑Святой Густав👑</b> - мэр Густограда, в котором вы основали свою ферму
                </p>

                <b-alert show variant="info" class="my-2">
                    <span>🤑1 рубль = 1 густиниан🤑</span><br>
                </b-alert>
            </div>
            <!--      RULES      -->
            <hr>


            <!--            <iframe-->
            <!--                src="https://www.free-kassa.ru/merchant/forms.php?gen_form=1&m=319484&default-sum=100&button-text=Купить&encoding=CP1251&type=v3&id=1694891"  width="590" height="320" frameBorder="0" target="_parent" ></iframe>-->
            <div class="f-w-v3 widget">
                <form class="widget-body" method="get" target="_parent" action="//www.free-kassa.ru/merchant/forms.php">
                    <div class="widget-info">
                        <div class="widget-body__row">
                            <label for="payment-cost">Сумма платежа</label>
                            <input value="100" data-value="cost" type="text" id="payment-cost" name="oa">
                            <span class="currency-label">RUB</span>
                        </div>
                        <div class="widget-body__row">
                            <textarea id="payment-text" placeholder="Комментарий к оплате"></textarea>
                            <span class="descr">Платежи проходят через <a
                                href="http://www.free-kassa.ru/" target="_parent"
                            >Free-kassa</a></span>
                        </div>
                    </div>
                    <div class="widget-payment">
                        <div class="widget-body__row">
                            <label>Способ оплаты</label>
                            <div class="widget-payments" ref="widget_payments">
                                <div class="widget-payments__pay wp " id="160">
                                    <img
                                        src="//www.free-kassa.ru/merchant/widgets/v3/currencies/visa_master.svg"
                                        alt="visa/mastercard"
                                    >
                                    <div class="tooltip">Visa / MasterCard</div>
                                </div>
                                <div class="widget-payments__pay wp" id="63">
                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/currencies/qiwi.svg" alt="qiwi">
                                    <div class="tooltip">qiwi</div>
                                </div>
<!--                                <div class="widget-payments__pay wp" id="45">-->
<!--                                    <img-->
<!--                                        src="//www.free-kassa.ru/merchant/widgets/v3/currencies/yandex.svg" alt="yandex"-->
<!--                                    >-->
<!--                                    <div class="tooltip">yandex</div>-->
<!--                                </div>-->
                                <div class="widget-payments__pay wp" id="133">
                                    <img
                                        src="//www.free-kassa.ru/merchant/widgets/v3/currencies/fkwallet.svg"
                                        alt="fkwallet"
                                    >
                                    <div class="tooltip">fkwallet</div>
                                </div>
                                <div class="widget-payments__pay wp" id="83">
                                    <img
                                        src="//www.free-kassa.ru/merchant/widgets/v3/currencies/beeline.svg"
                                        alt="beeline"
                                    >
                                    <div class="tooltip">beeline</div>
                                </div>
<!--                                <div class="widget-payments__pay wp" id="84">-->
<!--                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/currencies/mts.svg" alt="mts">-->
<!--                                    <div class="tooltip">mts</div>-->
<!--                                </div>-->
                                <div class="widget-payments__pay wp" id="82">
                                    <img
                                        src="//www.free-kassa.ru/merchant/widgets/v3/currencies/megafon.svg"
                                        alt="megafon"
                                    >
                                    <div class="tooltip">megafon</div>
                                </div>
                                <div class="widget-payments__pay wp" id="132">
                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/currencies/tele2.svg" alt="tele2">
                                    <div class="tooltip">tele2</div>
                                </div>
<!--                                <div class="widget-payments__pay wp" id="79">-->
<!--                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/currencies/alfa.svg" alt="alfa">-->
<!--                                    <div class="tooltip">alfa</div>-->
<!--                                </div>-->
                                <div class="widget-payments__pay wp" id="80">
                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/currencies/sber.svg" alt="sber">
                                    <div class="tooltip">sber</div>
                                </div>
<!--                                <div class="widget-payments__pay wp" id="81">-->
<!--                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/currencies/vtb.svg" alt="vtb">-->
<!--                                    <div class="tooltip">vtb</div>-->
<!--                                </div>-->
                                <div class="widget-payments__pay widget-payments__pay-more">
                                    <img src="//www.free-kassa.ru/merchant/widgets/v3/more.svg" alt="more">
                                    <div class="more-currencies-wrapper">
                                        <div class="more-currencies">
                                            <div class="widget-payments__pay wp widget-payments__pay--more" id="116">
                                                <img
                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/BTC-alt.svg"
                                                    alt="BTC"
                                                >
                                                <div class="tooltip--more">BitCoin</div>
                                            </div>
                                            <div class="widget-payments__pay wp widget-payments__pay--more" id="147">
                                                <img
                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/LTC-alt.svg"
                                                    alt="LTC"
                                                >
                                                <div class="tooltip--more">LiteCoin</div>
                                            </div>
                                            <div class="widget-payments__pay wp widget-payments__pay--more" id="168">
                                                <img
                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/DOGE-alt.svg"
                                                    alt="DOGE"
                                                >
                                                <div class="tooltip--more">DogeCoin</div>
                                            </div>
                                            <div class="widget-payments__pay wp widget-payments__pay--more" id="163">
                                                <img
                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/ETH-alt.svg"
                                                    alt="ETH"
                                                >
                                                <div class="tooltip--more">Ethereum</div>
                                            </div>
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="167">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/BC-alt.svg"-->
<!--                                                    alt="BC"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">BitCoin Cash</div>-->
<!--                                            </div>-->
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="164">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/DASH-alt.svg"-->
<!--                                                    alt="DASH"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">Dash</div>-->
<!--                                            </div>-->
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="169">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/EMC.svg"-->
<!--                                                    alt="EMC"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">Emercoin</div>-->
<!--                                            </div>-->
                                            <div class="widget-payments__pay wp widget-payments__pay--more" id="172">
                                                <img
                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/XMR.svg"
                                                    alt="XMR"
                                                >
                                                <div class="tooltip--more">Monero</div>
                                            </div>
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="170">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/XPM-alt.svg"-->
<!--                                                    alt="XPM"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">Primecoin</div>-->
<!--                                            </div>-->
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="171">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/RDD.svg"-->
<!--                                                    alt="RDD"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">Reddcoin</div>-->
<!--                                            </div>-->
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="173">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/XRP-alt.svg"-->
<!--                                                    alt="XRP"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">Ripple</div>-->
<!--                                            </div>-->
<!--                                            <div class="widget-payments__pay wp widget-payments__pay&#45;&#45;more" id="165">-->
<!--                                                <img-->
<!--                                                    src="//www.free-kassa.ru/merchant/widgets/v3/currencies/cripto/zcash.svg"-->
<!--                                                    alt="zcash"-->
<!--                                                >-->
<!--                                                <div class="tooltip&#45;&#45;more">ZCash</div>-->
<!--                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="sel_cur" :value="sel_cur" name="i">
                    <input type="hidden" name="m" value="319484">
                    <input type="hidden" name="go_2pay" value="1">
                    <input type="hidden" name="wt" value="v3">
                    <input type="hidden" name="form_id" value="1696476">
                    <input type="hidden" name="us_user_id" :value="getUserId">
                    <button class="pbtn" type="submit">
                        Купить
                    </button>
                </form>
            </div>

<!--            <a href="//freekassa.ru/">-->
<!--                <img src="//www.free-kassa.ru/img/fk_btn/4.png" title="Приём оплаты на сайте картами">-->
<!--            </a>-->

        </b-card>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "PayForm",
    data: () => ({
        sel_cur: ''
    }),
    computed: {
        ...mapGetters(['getDonateBalance', 'getUserId'])
    },
    methods: {
        iterateAllWasPayment: function (callback) {
            this.$refs.widget_payments.querySelectorAll('.wp').forEach(payment => {
                callback(payment);
            });
        }
    },
    mounted() {
        // on mounted iterate all .wp (ways currency) and add click handler
        this.iterateAllWasPayment((payment) => {
            payment.addEventListener('click', (e) => {
                // remove active class for all
                this.iterateAllWasPayment(elem => elem.classList.remove('active'));

                e.target.classList.add('active'); // add active class
                this.sel_cur = e.target.id; // set way currency in form
            });
        });
    }
}
</script>

<style scoped lang="scss">
.pay-form {
    overflow-x: auto;
}

::-webkit-input-placeholder { /* Chrome */
    color: #333;
    opacity: .2;
    font-family: 'Open Sans', sans-serif;
}

:-ms-input-placeholder { /* IE 10+ */
    color: #333;
    opacity: .2;
    font-family: 'Open Sans', sans-serif;
}

::-moz-placeholder { /* Firefox 19+ */
    color: #333;
    opacity: .2;
    font-family: 'Open Sans', sans-serif;
}

:-moz-placeholder { /* Firefox 4 - 18 */
    color: #333;
    opacity: .2;
    font-family: 'Open Sans', sans-serif;
}

.currency-label {
    background: #e1e8f1;
    position: absolute;
    bottom: 1px;
    right: 1px;
    height: 32px;
    padding: 0 12px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 1px;
    border-bottom-right-radius: 1px;
}

.widget {
    width: 410px;
    padding: 15px;
    background: #F7F7F7;
    border-radius: 5px;
    border: 2px solid #e1e8f1;
    position: relative;
    //left: 50%;
    //transform: translateX(-50%);
    margin-bottom: 2rem;
}

label {
    display: block;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    color: #99adc5;
    margin-bottom: 3px;
}

.widget-body__row {
    margin-bottom: 9px;
    position: relative;
}

input, textarea {
    width: 100%;
    border: 1px solid #d9e1eb;
    padding: 7px 10px;
    border-radius: 2px;
    background: #fff;
    max-width: 100%;
    font-weight: 500;
}

input[data-value="cost"] {
    padding-right: 58px;
    height: 32px;
}

textarea {
    height: 56px;
    font-size: 0.85em;
}

button {
    background: #58b737;
    color: #ffffff;
    border: none;
    padding: 10px 18px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
}

.widget-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
}

.widget-info, .widget-payment {
    width: 48%;
}

.widget-payments {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.widget-payments__pay {
    background: rgba(225, 232, 241, .7);
    border: 1px solid rgba(211, 220, 231, .6);
    width: calc(100% / 4 - 4px);
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 2px;
    margin-bottom: 4px;
    cursor: pointer;
    position: relative;
}

.widget-payments__pay.active {
    border-color: #58b737;
    background: rgba(88, 183, 55, .2);
}

.widget-payments__pay img {
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
}

.more-currencies-wrapper {
    width: 250px;
    position: absolute;
    top: -2px;
    left: -255px;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in-out;
    box-sizing: content-box;
}

.more-currencies {
    width: 100%;
    background: #F7F7F7;
    padding: 15px;
    border-radius: 5px;
    border: 2px solid #e1e8f1;
}

.widget-payments__pay-more {
    position: relative;
}

.widget-payments__pay-more:hover .more-currencies-wrapper {
    opacity: 1;
    visibility: visible;
}

.descr {
    font-size: 9px;
    position: absolute;
    bottom: -10px;
    left: 0;
    color: rgba(0, 0, 0, .5);
}

.descr a {
    color: #cf0047;
}

.tooltip, .tooltip--more {
    position: absolute;
    background: rgba(0, 0, 0, .85);
    color: #ffffff;
    text-transform: uppercase;
    font-size: 11px;
    text-align: center;
    padding: 8px 12px;
    top: -35px;
    left: -40px;
    font-weight: 700;
    min-width: 110px;
    box-sizing: content-box;
    visibility: hidden;
    opacity: 0;
    transition: all .3s ease-in-out 0s;
}

.widget-payments__pay:hover .tooltip,
.widget-payments__pay--more:hover .tooltip--more {
    opacity: 1;
    visibility: visible;
}

.tooltip:hover,
.tooltip--more:hover {
    visibility: hidden !important;
    opacity: 0 !important;
}

</style>
