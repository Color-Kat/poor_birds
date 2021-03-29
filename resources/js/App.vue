<template>
    <div>
        <Header></Header>

        <main>
            <b-container class="container pt-5" type="light" variant="light">
                    <router-view></router-view>
            </b-container>
        </main>
    </div>
</template>

<script>
import Header from './components/Header';
import {mapActions, mapGetters} from "vuex";

export default {
    name      : "App",
    components: {
        Header
    },
    methods: {
        ...mapActions(['init']),
    },
    // computed: mapGetters(['getAuth', 'getUser']),
    async mounted() {
        await this.init();
    }
}
</script>

<style scoped>
</style>
