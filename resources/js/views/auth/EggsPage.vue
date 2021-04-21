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

        <div class="mt-2">
            <b-card
                v-for="egg of getEggs"
                class="mb-2 w-100"
                tag="article"
                :key="egg.id"
            >
                <b-card-text>
                    {{ egg }}
                </b-card-text>

                <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
            </b-card>
        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name    : "EggsPage",
    methods : {...mapActions(['fetchUserEggs'])},
    computed: {...mapGetters(['getEggs'])},
    mounted() {
        this.fetchUserEggs();
    }
}
</script>

<style scoped>

</style>
