<template>
    <b-card>
        <h2 class="text-center">Склад ваших яиц ;)</h2>
        <span>
            Эти яйца несут ваши птицы. И у каждого вида птиц - свои яйца!
            Так же характеристики яйца изменяют
            сертификаты птицы. <br>
            В этом списке показаны все ваши яйца, которые
            снесли ваши птицы. У каждого яйца 2 характеристики - <b>спрос</b> и <b>цена яйца</b>.
            Каждый час вы можете продавать такое кол-во яиц, которое указано в спросе.
            </span>

        <hr>
        <h2>Склад:</h2>

        <div class="mt-2 grid-cards-columns">
            <!--                <b-card-->
            <!--                    v-for="seller of getSellers"-->
            <!--                    class="mb-2 card-item"-->
            <!--                    :title="seller.name"-->
            <!--                    :img-src="`/storage/${seller.image}`"-->
            <!--                    :img-alt="seller.name"-->
            <!--                    img-top-->
            <!--                    tag="article"-->

            <!--                    @click="()=>redirect(seller.id)"-->
            <!--                    :key="seller.id"-->
            <!--                >-->
            <!--                    <b-card-text>-->
            <!--                        {{ seller.description }}-->
            <!--                    </b-card-text>-->

            <!--                    &lt;!&ndash;                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>&ndash;&gt;-->
            <!--                </b-card>-->
        </div>
    </b-card>
</template>

<script>
export default {
    name: "EggsPage"
}
</script>

<style scoped>

</style>
