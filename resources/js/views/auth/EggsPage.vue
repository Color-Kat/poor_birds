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

        <div v-if="getEggs.every(elem => elem.count == 0)">
            У вас пока нет яиц...
        </div>

        <div class="mt-2">
            <b-card
                v-for="egg of getEggs"
                class="mb-2 w-100"
                tag="article"
                :key="egg.id"
                body-class="p-3"
                v-if="egg.count > 0"
            >
                <b-card-text
                    class="d-flex justify-content-between"
                >
                    <!--                    {{ egg }}-->
                    <div
                        style="font-size: 1.1em; width: max-content"
                        class="d-flex align-items-center mr-3"
                    >
                        <span class="d-flex justify-content-center">
                            <b>{{ egg.name }}</b>
                            <span class="ml-1">x{{ egg.birds_count }}</span>
                        </span>
                    </div>


                    <h5 class="d-flex justify-content-end  flex-wrap">
                        <div class="d-flex justify-content-end flex-wrap">
                            <b-badge variant="success" class="my-1 ml-1">{{ egg.count }}🥚</b-badge>
                            <b-badge variant="danger" class="my-1 ml-1">Спрос {{ egg.demand }} яиц/час</b-badge>
                            <b-badge class="my-1 ml-1">{{ egg.price }}&#8381; цена яйца</b-badge>
                            <b-badge variant="warning" class="my-1 ml-1">Всего: {{ egg.price * egg.count }}&#8381;</b-badge>
                        </div>

                        <span>
                            <b-button
                                variant="primary"
                                class="mt-2"
                                @click="()=>{sellEggs(egg.id);egg.count -= egg.demand < egg.count ? egg.demand : egg.count}"
                            >
                                Продать {{egg.demand < egg.count ? egg.demand : egg.count}}🥚
                                за {{(egg.demand < egg.count ? egg.demand : egg.count) * egg.price}}&#8381;
                            </b-button>
                        </span>
                    </h5>
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
    methods : {...mapActions(['fetchUserEggs', 'sellEggs'])},
    computed: {...mapGetters(['getEggs'])},
    mounted() {
        this.fetchUserEggs();
    }
}
</script>

<style scoped>

</style>
