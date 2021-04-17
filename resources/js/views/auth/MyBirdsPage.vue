<template>
    <div>
        <b-card
            v-for="my_bird of getMyBirds"
        >

        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "MyBirdsPage",
    computed: {
        ...mapGetters(['getMyBirds'])
    },
    methods: {
        ...mapActions(['fetchUserBirds'])
    },
    mounted() {
        this.fetchUserBirds();
    }
}
</script>

<style scoped>

</style>
