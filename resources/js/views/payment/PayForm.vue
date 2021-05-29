<template>
    <div>
        <b-card class="pay-form">
            Купить монеты густинианы:

            <iframe
                src="https://www.free-kassa.ru/merchant/forms.php?gen_form=1&m=319484&default-sum=100&button-text=Купить&encoding=CP1251&type=v3&id=1694891"  width="590" height="320" frameBorder="0" target="_parent" ></iframe>

            <a href="//freekassa.ru/">
                <img src="//www.free-kassa.ru/img/fk_btn/4.png" title="Приём оплаты на сайте картами">
            </a>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "PayForm"
}
</script>

<style scoped>
.pay-form{
    overflow-x: auto;
}
</style>
