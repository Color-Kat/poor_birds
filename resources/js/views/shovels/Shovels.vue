<template>
    <b-card class="shadow">
        <Loader v-if="loading"/>

        <div v-else class="position-relative">
            <div class="m-1 position-absolute w-100 text-right">
                <b-badge
                    v-b-toggle.collapse-shovel
                    pill size="sm"
                    variant="dark"
                    @click="()=>{
                            // toggle tooltip
                            localStorage.setItem(
                                'tooltip-shovel',
                                !( (localStorage.getItem('tooltip-shovel') || 'false') == 'true' )
                            )
                        }"
                >?
                </b-badge>
            </div>

            <h2 class="text-center">Лопаты</h2>

            <!--         collapse tooltip (from localStorage)       -->
            <b-collapse :visible="localStorage.getItem('tooltip-shovel') == 'true'" id="collapse-shovel">
                <span>Здесь можно купить лопаты, чтобы убираться за вашими птицами. Или копать навоз в шахте</span>
            </b-collapse>

            <hr>
            <h2>Товары:</h2>

            <div class="mt-2 grid-cards-columns">
                <b-card
                    v-for="shovel of getShovels"
                    class="mb-2 card-item"
                    :title="shovel.name"
                    :img-src="`/storage/${shovel.image}`"
                    :img-alt="shovel.name"
                    img-top
                    tag="article"
                    :bg-variant="shovel.price ? 'light' : 'warning'"

                    @click="()=>redirect(shovel.id)"
                    :key="shovel.id"
                >
                    <b-card-text class="d-flex justify-content-between flex-wrap">
                        <b-badge variant="success" class="mb-1">Эффективность: {{ shovel.efficiency }}ед.</b-badge>
                        <b-badge
                            v-if="shovel.price ? true : false" variant="primary"
                            class="d-flex align-items-center justify-content-center"
                        >Цена: {{
                                shovel
                                    .price
                            }}₽
                        </b-badge>
                        <b-badge v-else variant="primary" class="d-flex align-items-center">Купить за донат:
                            {{ shovel.donate_price }} Руб
                            .
                        </b-badge>
                    </b-card-text>

                    <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
                </b-card>
            </div>
        </div>
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Loader from "../../components/Loader";

export default {
    name      : "Store",
    components: {Loader},
    data      : () => ({loading: true}),
    async mounted() {
        await this.fetchShovels();
        this.loading = false;
    },
    computed: {
        ...mapGetters([
            'getShovels',
        ]),
        localStorage: () => localStorage
    },
    methods : {
        redirect(id) {
            this.$router.push(`/shovels/${id}`)
        },
        ...mapActions(['fetchShovels'])
    }
}
</script>

<style lang="scss">

</style>
