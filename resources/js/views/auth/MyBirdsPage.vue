<template>
    <div></div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "MyBirdsPage",
    computed: {
        // ...mapGetters(['getBirds'])
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
