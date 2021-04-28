<template>
    <div>
        <b-modal
            id="modal-sell"
            title="Продать птицу"
            header-bg-variant="primary"
            header-text-variant="light"
        >
            <p class="my-4">{{
                    selectedBird ? `Вы уверены, что хотите продать птицу "${selectedBird.name}" за
${selectedBird.price/2}&#8381;? При продаже так же удаляются яйца.` :
                        'Ошибка'
                }}
            </p>
            <template #modal-footer="{ ok, cancel }">
                <!--        Sell bird        -->
                <b-button size="sm" variant="success" @click="()=>{sellBird(selectedBird.bird_seller_user_id); ok();}">
                    Ок
                </b-button>
                <!--        cancel       -->
                <b-button size="sm" variant="danger" @click="cancel">
                    Отмена
                </b-button>
            </template>
        </b-modal>

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
                v-for="(my_bird, index) of get_my_birds"
                :key="my_bird.id"
                body-class="p-1 d-flex justify-content-between"
                class="mb-2"
            >
                <div class="text-center w-100">
                    <div class="d-flex justify-content-between">
                        <img :src="`/storage/${my_bird.image}`" alt="" style="max-width: 90px; max-height: 90px;">
                        <div class="w-100">
                            <span><b>{{ my_bird.name }} x{{ my_bird.count }}</b></span><br>
                            <span class="text-center pl-2 d-flex">{{ my_bird.description }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <!--     actions      -->
                        <div class="d-flex justify-content-center flex-wrap flex-md-nowrap m-1">
                            <div class="m-1 d-inline" style="height: max-content; width: max-content;">
                                <b-button
                                    variant="success"
                                    pill
                                    v-b-tooltip.hover
                                    :disabled="my_bird.cared"
                                    :title="!my_bird.cared ?
                                    `Нажмите, чтобы погладить птицу (Увеличивает плодоносность на ${my_bird.care}% в течение часа)`: false"
                                    @click="(e)=>caresHandler(my_bird, index, e)"
                                >
                                    <b-icon style="pointer-events: none" icon="hand-index"></b-icon>
                                </b-button>
                            </div>
                            <div
                                class="m-1  d-inline" style="height: max-content; width: max-content"
                                v-if="my_bird.certificate_id != 0"
                            >
                                <b-button
                                    variant="warning"
                                    pill
                                    v-b-tooltip.hover
                                    title="Сертификат птицы"
                                    :to="`/certificates/${my_bird.certificate_id}`"
                                >
                                    <b-icon icon="bookmark-star"></b-icon>
                                </b-button>
                            </div>
                            <div class="m-1" style="height: max-content; width: max-content"  v-b-tooltip.hover
                                 title="Продать птицу за половину ее стоимости">
                                <b-button
                                    variant="danger"
                                    pill
                                    v-b-modal.modal-sell
                                    @click="()=>{selectedBird = my_bird}"
                                >
                                    <b-icon icon="cash-stack"></b-icon>
                                </b-button>
                            </div>
                        </div>
                        <!--     actions      -->

                        <!--     characteristics      -->
                        <div class="d-flex justify-content-end flex-wrap">
                            <b-badge class="m-1 d-flex align-items-center" variant="warning">Плодоносность:
                                <!--                count fertility with count and cares                -->
                                {{ (my_bird.fertility * (my_bird.cared ? (1 + my_bird.care / 100): 1)).toFixed(1)}}

                                {{
                                    my_bird.count > 1 ? `(${ (my_bird.fertility *
                                    my_bird.count * (my_bird.cared ? (1 + my_bird.care / 100): 1)).toFixed(1)})` : ''
                                }}
                            </b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="primary">Цена яйца:
                                {{ my_bird.egg_price }}&#8381;
                            </b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="dark">Помет: {{ my_bird.litter }}
                                ({{ my_bird.litter * my_bird.count }}) ед/час
                            </b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="danger">Спрос: {{ my_bird.demand }}
                                яиц/час
                            </b-badge>
                            <b-badge class="m-1 d-flex align-items-center" variant="success">Бонус за заботу:
                                {{ my_bird.care }}%
                            </b-badge>
                        </div>
                        <!--     characteristics      -->
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
        ...mapGetters(['getMyBirds']),
        get_my_birds: function () {
            // to hide cares button
            return this.getMyBirds.map(elem => {
                return {
                    ...elem,
                    cared: this.cared.includes(elem.id)
                }
            });
        },
        Math: ()=> Math,
    },
    data    : () => ({
        selectedBird: null,
        cared: []
    }),
    methods : {
        ...mapActions(['fetchUserBirds', 'sellBird', 'cares']),
        caresHandler(my_bird, my_bird_index, e) {
            // transfer bird_seller_user_id to cares function to increase bird fertility
            if (this.cares(my_bird.bird_seller_id)) {
                // TODO добавить сертификат
                // this.getMyBirds[my_bird_index].fertility = Math.round(my_bird.fertility * (1 + my_bird.care / 100));
                // this.getMyBirds[my_bird_index].cared = true; // to hide the tooltip on the button
                this.cared.push(my_bird.id); // hide cares button
            }
        }
    },
    async mounted() {
        await this.fetchUserBirds();
        console.log(this.getMyBirds);
    }
}
</script>

<style scoped>

</style>
