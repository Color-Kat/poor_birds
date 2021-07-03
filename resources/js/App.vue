<template>
    <div>
        <Header></Header>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
        </button>
        <!--    LOADER    -->
        <Loader v-show="getIsLoading"/>
        <!--    LOADER    -->

        <!--    MODAL    -->
        <t-modal
            id="modal-main" hide-header body-bg-variant="dark" hide-footer
            @hide="deleteModal"
        >
            <StoryModal :title="modalTitle" :content="modalText"/>
        </t-modal>
        <!--    MODAL    -->

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
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
import BlackOut from "./components/BlackOut";
import Footer from "./components/Footer";
import Background from "./components/visual/Background";
import StoryModal from "./components/StoryModal";

export default {
    name      : "App",
    components: {
        StoryModal,
        Footer,
        Header,
        SideBar,
        BlackOut,
        Loader,
        Background
    },
    computed  : {
        ...mapGetters(['getAuth', 'getIsLoading']),
        ...mapState(['isModalShow', 'modalTitle', 'modalText'])
    },
    methods   : {
        ...mapActions(['init']),
        ...mapMutations(['deleteModal'])
    },
    // computed: mapGetters(['getAuth', 'getUser']),
    async mounted() {
        await this.init();

        // this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
        //     console.log('Modal is about to be shown', bvEvent, modalId);
        // })
    },
    updated() {
        // show main modal
        if(this.isModalShow){
            this.$bvModal.show('modal-main');
        }
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
