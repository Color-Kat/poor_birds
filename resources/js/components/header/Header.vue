<template>
    <header class="header mb-2" style="z-index: 100">
        <!--    NAVBAR 1    -->
        <b-navbar
            style="z-index: 1010" type="light" variant="light"
            class="position-relative d-flex justify-content-between shadow-sm"
        >
            <div class="d-flex align-items-center">
                <b-button v-if="getAuth" class="d-block d-md-none mr-2 p-1" variant="primary" @click="() => toggle_sideBar()">
                    <b-icon icon="text-left"></b-icon>
                </b-button>

                <Logo></Logo>
            </div>

            <!--            <b-navbar-toggle target="nav-collapse"  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></b-navbar-toggle>-->

            <!--            <b-collapse id="nav-collapse" is-nav>-->
            <!--                <b-navbar-nav>-->
            <!--                    <b-nav-item to="/account/birds" active-class="active">Мои птицы</b-nav-item>-->
            <!--                    <b-nav-item to="/account/bazaar" active-class="active">Базар</b-nav-item>-->
            <!--                    <b-nav-item to="/store" active-class="active">Магазин</b-nav-item>-->
            <!--                </b-navbar-nav>-->

            <!-- Right aligned nav items -->
            <b-navbar-nav
                class="d-flex align-items-center"
                style="flex-direction: row
            !important"
            >

                <b-nav-item>
                    <Balance class="mr-2"/>
                </b-nav-item>

                <b-nav-item
                    class="mr-2" v-if="auth && getUserRole === 1" :to="{name: 'admin-birds'}" active-class="active"
                >
                    Админ панель
                </b-nav-item>
                <b-nav-item class="mr-2" v-if="!auth" :to="{name: 'login'}" active-class="active">
                    Войти
                </b-nav-item>

                <b-nav-item-dropdown v-else class="mr-2" style="z-index: 10002 !important">
                    <template #button-content>
                        <em>{{ getUserName }}</em>
                    </template>
                    <b-dropdown-item :to="{name: 'account'}" active-class="active">Профиль</b-dropdown-item>
                    <b-dropdown-item :to="{name: 'index'}" @click="logout">Выйти</b-dropdown-item>
                </b-nav-item-dropdown>


                <!--                    <b-nav-form>-->
                <!--                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
                <!--                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Найти</b-button>-->
                <!--                    </b-nav-form>-->


            </b-navbar-nav>
            <!--            </b-collapse>-->
        </b-navbar>
        <!--    NAVBAR 1    -->
        <BlackOut/>
        <!--    NAVBAR 2    -->
        <b-navbar class="position-relative nav justify-content-center" style="z-index: 100">
            <b-navbar-brand to="/" class="d-flex d-sm-none align-items-center position-relative">
<!--                src="https://placekitten.com/g/30/30"-->
                <img
                    class="d-inline-block align-top"
                    src="/logo.png"
                    height="40px"
                    alt="Бедные птички"
                >
                <span>Бедные птички</span>
            </b-navbar-brand>
        </b-navbar>
        <!--    NAVBAR 2    -->

    </header>
</template>

<script>

import {mapState, mapGetters, mapActions} from "vuex";
import Balance from "../Balance";
import Logo from "./Logo";
import BlackOut from "../BlackOut";

export default {
    name: "header-component",
    components: {
        Balance,
        Logo,
        BlackOut
    },
    computed: {
        ...mapState({
            auth: state => state.user.auth,
        }),
        ...mapGetters(['getUserName', 'getUserRole', 'getAuth'])
    },
    methods: mapActions(['logout', 'toggle_sideBar']),

}
</script>

<style scoped lang="scss">

</style>
