<template>
    <div>
        <Header></Header>

        <main>
            <b-container class="container pt-5" type="light" variant="light">
<!--                    <Aside></Aside>-->
                    <router-view></router-view>
            </b-container>
        </main>
    </div>
</template>

<script>
import Header from './components/Header';
import Aside from './components/Aside';
import {mapActions, mapGetters} from "vuex";

export default {
    name      : "App",
    components: {
        Header,
        Aside
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
