<template>
    <div id="store">
        <div class="card" v-for="bird of getBirds">

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Store",
    mounted() {
        this.$store.dispatch('fetchBirds');
        console.log(this.getBirds);
    },
    computed: {
        ...mapGetters([
            'getBirds',
        ])
    }
}
</script>

<style scoped>

</style>
