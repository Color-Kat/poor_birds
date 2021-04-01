<template>
    <aside v-if="getAuth">
        <b-card>
            <b-navbar-nav>

                <b-nav-item to="/account" active-class="active">
                    <UserAvatar :balance="true"/>
                </b-nav-item>


                <b-nav-item to="/account/birds" active-class="active">Мои птицы</b-nav-item>
                <b-nav-item to="/account/bazaar" active-class="active">Базар</b-nav-item>
                <b-nav-item to="/store" active-class="active">Магазин</b-nav-item>
            </b-navbar-nav>
        </b-card>
    </aside>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import UserAvatar from "./auth/account/UserAvatar";

export default {
    name   : "Aside",
    computed: {
        ...mapGetters(['getAuth'])
    },
    components: {
        UserAvatar
    },
    data   : () => ({
        visible: window.innerWidth >= 770 ? true : false
    }),
    methods: {
        onResize() {
            this.visible = window.innerWidth >= 770 ? true : false;
            console.log(this.getAuth)
        }
    },

    created() {
        window.addEventListener('resize', this.onResize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
}
</script>

<style scoped lang="scss">
aside{

    @media screen and (min-width: 769px) { & { width: 28rem;} }
    @media screen and (max-width: 770px) {
        & {
            //width: 28rem;
            position: fixed;
            z-index: 20000;
            left: -100%;

            .active {
                left: 0;
            }
        }
    }
}

</style>
