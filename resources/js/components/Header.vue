<template>
    <header class="header">
        <b-navbar fixed="top" toggleable="sm" type="light" variant="light">
            <b-navbar-brand to="/">
                <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
                Бедные птицы
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/account/birds">Мои птицы</b-nav-item>
                    <b-nav-item to="/account/bazaar">Базар</b-nav-item>
                    <b-nav-item to="/store">Магазин</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item v-if="auth && getUserRole === 1" :to="{name: 'admin_area'}">
                        Админ панель
                    </b-nav-item>

                    <b-nav-item v-if="!auth" :to="{name: 'login'}">
                        Войти
                    </b-nav-item>

                    <b-nav-item-dropdown v-else>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{getUserName}}</em>
                        </template>
                        <b-dropdown-item :to="{name: 'account'}">Профиль</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'index'}" @click="logout">Выйти</b-dropdown-item>
                    </b-nav-item-dropdown>


                    <!--                    <b-nav-form>-->
                    <!--                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
                    <!--                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Найти</b-button>-->
                    <!--                    </b-nav-form>-->


                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>

import {mapState, mapGetters, mapActions} from "vuex";

export default {
    name    : "header-component",
    computed: {
        ...mapState({
            auth: state => state.user.auth
        }),
        ...mapGetters(['getUserName', 'getUserRole'])
    },
    methods: mapActions(['logout']),

}
</script>

<style scoped>

</style>
