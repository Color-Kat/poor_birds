<template>
    <div>

        <b-card v-if="!loading">
            123
            {{ getBird }}
            <Field :field="getBird.name"></Field>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../components/fields/Field'

export default {
    name   : "BirdPage",
    components: {
        Field
    },
    data   : () => ({
        bird: null,
        loading : true
    }),
    computed: {
        ...mapGetters(['getBird'])
    },
    methods: {
        ...mapActions(['fetchBird'])
    },
    async mounted() {
        await this.fetchBird(20);
        this.loading = false;
    }
}
</script>

<style scoped>

</style>
