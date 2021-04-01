<template>
    <div>
        <Header></Header>

        <main>
            <div
                id="main-container"
                class="container-lg"
                type="light"
                variant="light"
            >
                <!--    SIDEBAR    -->
                <SideBar id="main-sidebar"/>
                <!--    SIDEBAR    -->

                <!--    CONTENT    -->
                <router-view id="main-content" style="width: 100% !important;"></router-view>
                <!--    CONTENT    -->
            </div>
        </main>
    </div>
</template>

<script>
import Header from './components/header/Header';
import SideBar from './components/SideBar';
import {mapActions, mapGetters} from "vuex";

export default {
    name      : "App",
    components: {
        Header,
        SideBar
    },
    computed  : {
        ...mapGetters(['getAuth'])
    },
    methods   : {
        ...mapActions(['init']),
    },
    // computed: mapGetters(['getAuth', 'getUser']),
    async mounted() {
        await this.init();
    }
}
</script>

<style scoped lang="scss">
#main-container {
    display: flex;
    align-items: flex-start;

}
</style>
