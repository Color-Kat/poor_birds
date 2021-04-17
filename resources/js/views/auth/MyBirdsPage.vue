<template>
    <b-card>
        <div>
            <h4>Действия: </h4>
            <span>
            <b-button size="sm" variant="success">Купить птиц</b-button>
            <b-button size="sm" variant="primary">Купить сертификат</b-button>
        </span>
        </div>

        <hr>

        <h2>Ваши птицы: </h2>

        <b-card
            v-for="my_bird of getMyBirds"
            :key="my_bird.id"
            body-class="p-1 d-flex justify-content-between"
            class="mb-2"
        >
            <div class="text-center">
                <div class="d-flex justify-content-between">
                    <img :src="`/storage/${my_bird.image}`" alt="" style="max-width: 90px; max-height: 90px">
                    <div>
                        <span><b>{{ my_bird.name }} x 12</b></span><br>
                        <span class="text-left pl-2 d-flex">{{ my_bird.description }}</span>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <!--     actions      -->
                    <div>
                        <b-button
                            variant="success"
                            pill class="ml-2"
                            v-b-tooltip.hover
                            :title="`Нажмите, чтобы погладить птицу (Увеличивает плодоносность на ${my_bird.care}% в течение часа)`"
                            @click="cares"
                        >
                            <b-icon icon="hand-index"></b-icon>
                        </b-button>
                    </div>

                    <!--     characteristics      -->
                    <div class="d-flex justify-content-end flex-wrap">
                        <b-badge class="m-1" variant="warning">Плодоносность: {{ my_bird.fertility }}</b-badge>
                        <b-badge class="m-1" variant="primary">Цена яйца: {{ my_bird.egg_price }}</b-badge>
                        <b-badge class="m-1" variant="dark">Помет: {{ my_bird.litter }} ед/час</b-badge>
                        <b-badge class="m-1" variant="danger">Спрос: {{ my_bird.demand }} яиц/час</b-badge>
                        <b-badge class="m-1" variant="success">Бонус за заботу: {{ my_bird.care }}%</b-badge>
                    </div>
                </div>
            </div>
        </b-card>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name    : "MyBirdsPage",
    computed: {
        ...mapGetters(['getMyBirds'])
    },
    methods : {
        ...mapActions(['fetchUserBirds']),
        cares() {

        }
    },
    mounted() {
        this.fetchUserBirds();
    }
}
</script>

<style scoped>

</style>
