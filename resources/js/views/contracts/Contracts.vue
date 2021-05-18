<template>
    <b-card>
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
                                'tooltip-contracts',
                                !( (localStorage.getItem('tooltip-contracts') || 'false') == 'true' )
                            )
                        }"
                >?
                </b-badge>
            </div>

            <h2 class="text-center">Контракты</h2>

            <!--         collapse tooltip (from localStorage)       -->
            <b-collapse :visible="localStorage.getItem('tooltip-contracts') == 'true'" id="collapse-shovel">
                <p>
                    Здесь вы можете найти человека, который будет вам помогать с вашим бизнесом, и заключить
                    с ним контракт.
                    Что такое контракт? <b>Контракт - </b>это договор с каким-то человеком или компанией.
                    Если у вас будет контракт с кем-то, то вам будут доступны самые различные бонусы.
                    Например, вы сможете продавать помёт, или продавать яйца по более выгодной цене.
                    А еще есть люди, которые за определённую плату готовы убираться за вашими птицами автоматически!
                </p>
            </b-collapse>

            <hr>
            <h2>Контракты:</h2>

            <div class="mt-2 grid-cards-columns ">
                <b-card
                    v-for="contract of getContracts"
                    class="mb-2 card-item"
                    :title="contract.name"
                    :img-src="`/storage/contracts/${contract.image}`"
                    :img-alt="contract.name"
                    tag="article"

                    @click="()=>redirect(contract.id)"
                    :key="contract.id"
                >
                    <b-card-text>
<!--                        <b-badge variant="success">Бонус к плодовитости {{ certificate.fertility_bonus }}%</b-badge>-->
<!--                        <b-badge variant="warning">Бонус к цене {{ certificate.fertility_bonus }}%</b-badge>-->
                        <h4 class="text-right">
                            <b-badge variant="primary">Цена {{ contract.price }}руб</b-badge>
                        </h4>
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
        await this.fetchContracts();
        this.loading = false;
    },
    computed: {
        ...mapGetters([
            'getContracts',
        ]),
        localStorage: () => localStorage
    },
    methods : {
        redirect(id) {
            this.$router.push(`/contracts/${id}`)
        },
        ...mapActions(['fetchContracts'])
    }
}
</script>

<style lang="scss">

</style>
