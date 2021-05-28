<template>
    <div>
        <Header></Header>

        <!--    LOADER    -->
        <Loader v-show="getIsLoading"/>
        <!--    LOADER    -->

        <main style="z-index: 10;">
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
                <router-view id="main-content" style="width: 100% !important; z-index: 10;"></router-view>
                <!--    CONTENT    -->
            </div>
        </main>

        <Footer/>
        <Background/>
    </div>

</template>

<script>
import Header from './components/header/Header';
import SideBar from './components/SideBar';
import Loader from './components/Loader';
import {mapActions, mapGetters} from "vuex";
import BlackOut from "./components/BlackOut";
import Footer from "./components/Footer";
import Background from "./components/visual/Background";

export default {
    name      : "App",
    components: {
        Footer,
        Header,
        SideBar,
        BlackOut,
        Loader,
        Background
    },
    computed  : {
        ...mapGetters(['getAuth', 'getIsLoading'])
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
main {
    min-height: 550px; // min height for footer
}

#main-container {
    display: flex;
    align-items: flex-start;
}
</style>
