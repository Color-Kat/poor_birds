<template>
    <div>
        <b-card v-if="getMyBirds.length == 0">
            <span>Ферма пустует, вам нужно купить птиц, чтобы начать зарабатывать ;)</span>
            <b-button :to="{name: 'birds'}" variant="success" class="mt-2">Купить первую птицу</b-button>
        </b-card>

        <b-card v-else>
            <div>
                <h5>Действия: </h5>
                <span>
                <b-button size="sm" variant="success" :to="{name: 'birds'}">Купить птиц</b-button>
                <b-button size="sm" variant="primary" :to="{name: 'certificates'}">Купить сертификат</b-button>
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
                <div class="text-center w-100">
                    <div class="d-flex justify-content-between">
                        <img :src="`/storage/${my_bird.image}`" alt="" style="max-width: 90px; max-height: 90px;">
                        <div class="w-100">
                            <span><b>{{ my_bird.name }} x{{my_bird.count}}</b></span><br>
                            <span class="text-left pl-2 d-flex">{{ my_bird.description }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <!--     actions      -->
                        <div class="d-flex align-items-center">
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
                        <div class="d-flex align-items-center">
                            <b-button
                                variant="warning"
                                pill class="ml-2"
                                v-b-tooltip.hover
                                title="Сертификат птицы"
                                :to="`/certificates/${my_bird.certificate_id}`"
                                v-if="my_bird.certificate_id != 0"
                            >
                                <b-icon icon="bookmark-star"></b-icon>
                            </b-button>
                        </div>

                        <!--     characteristics      -->
                        <div class="d-flex justify-content-end flex-wrap">
                            <b-badge class="m-1 d-flex align-items-center" variant="warning">Плодоносность: {{ my_bird.fertility
                                }}</b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="primary">Цена яйца: {{ my_bird.egg_price }}</b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="dark">Помет: {{ my_bird.litter }} ед/час</b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="danger">Спрос: {{ my_bird.demand }} яиц/час</b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="success">Бонус за заботу: {{ my_bird.care }}%</b-badge>
                        </div>
                    </div>
                </div>
            </b-card>
        </b-card>
    </div>
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
