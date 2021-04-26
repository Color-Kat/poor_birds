<template>
    <aside v-if="getAuth" :class="{ active: active_sideBar }">
        <b-card>
            <b-navbar-nav class="nav-pills red">

                <b-nav-item to="/account" class="border-bottom">
                    <UserAvatar :balance="true"/>
                </b-nav-item>


                <b-nav-item :to="{name: 'eggs'}" active-class="active">
                    <h5 class="d-flex align-items-center justify-content-between">
                        <span>🥚Склад яиц</span>
                        <b-badge variant="light">131241 &#8381;</b-badge>
                    </h5>
                </b-nav-item>

                <h5 class="mb-3 border-bottom">
                    <b-nav-item :to="{name: 'my_birds'}" active-class="active"><b>🦅</b>Мои
                        птицы
                    </b-nav-item>
                </h5>

                <h5>
                    <b-nav-item :to="{name: 'birds'}" active-class="active"><b>🐔</b>Список птиц</b-nav-item>
                </h5>
                <h5>
                    <b-nav-item :to="{name: 'sellers'}" active-class="active"><b>🛒</b>Продавцы</b-nav-item>
                </h5>
                <h5>
                    <b-nav-item :to="{name: 'certificates'}" active-class="active"><b>📋</b>Сертификаты</b-nav-item>
                </h5>
                <h5>
                    <b-nav-item :to="{name: 'shovels'}" active-class="active"><b>🧹</b>Лопаты</b-nav-item>
                </h5>

            </b-navbar-nav>
        </b-card>
    </aside>

</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import UserAvatar from "./auth/account/UserAvatar";

export default {
    name      : "Aside",
    computed  : {
        ...mapGetters(['getAuth']),
        ...mapState(['active_sideBar'])
    },
    components: {
        UserAvatar
    },
    methods   : {
        ...mapActions(['toggle_sideBar'])
    },
    // close sidebar on resize
    created() {
        window.addEventListener('resize', () => this.toggle_sideBar(false));
    },
    beforeDestroy() {
        window.removeEventListener('resize');
    }
}
</script>

<style scoped lang="scss">
aside {
    width: 28rem;
    z-index: 1006;

    @media screen and (max-width: 767px) {
        // not active
        & {
            position: fixed;
            left: -100%;
            width: 270px;
            transition: all .2s ease-in-out;
        }
        // active
        &.active {
            left: 0;
        }
    }
}
</style>
