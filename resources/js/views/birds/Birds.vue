<template>
    <div id="store">
        <b-card>
            <h2 class="text-center">Списко птиц</h2>
            <span>В этом списке находятся все птицы. Но купить их можно только у продавцов, у каких именно -
                выбирать вам. Вы можете купить птицу задешево на базаре, но за торговлю ее яйцами вам будут
                прилетать штрафы. </span>

            <hr>
            <h2>Птицы:</h2>

            <div class="mt-2 grid-cards-columns">
                <b-card
                    v-for="bird of getBirds"
                    class="mb-2 card-item"
                    :title="bird.name"
                    :img-src="`/storage/${bird.image}`"
                    :img-alt="bird.name"
                    img-top
                    tag="article"

                    @click="()=>redirect(bird.id)"
                    :key="bird.id"
                >
                    <b-card-text>
                        {{ bird.description }}
                    </b-card-text>

                    <!--                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>-->
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "Store",
    mounted() {
        // this.$store.dispatch('fetchBirds');
        this.fetchBirds();
    },
    computed: {
        ...mapGetters([
            'getBirds',
        ])
    },
    methods : {
        redirect(id) {
            this.$router.push(`/birds/${id}`)
        },
        ...mapActions(['fetchBirds'])
    }
}
</script>

<style lang="scss">

</style>
