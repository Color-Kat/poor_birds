<template>
    <aside v-if="getAuth" :class="{ active: active_sideBar }">
        <b-card>
            <b-navbar-nav>

                <b-nav-item to="/account" active-class="active">
                    <UserAvatar :balance="true"/>
                </b-nav-item>

                <b-nav-item :to="{name: 'eggs'}">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <span class="text-success">Склад яиц</span>
                        <b-badge variant="success">131241 &#8381;</b-badge>
                    </div>
                </b-nav-item>

                <b-nav-item :to="{name: 'my_birds'}" active-class="active">Мои птицы</b-nav-item>
                <b-nav-item :to="{name: 'birds'}" active-class="active">Список птиц</b-nav-item>
                <b-nav-item :to="{name: 'sellers'}" active-class="active">Продавцы</b-nav-item>
                <b-nav-item :to="{name: 'certificates'}" active-class="active">Сертификаты</b-nav-item>

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
    methods: {
        ...mapActions(['toggle_sideBar'])
    },
    // close sidebar on resize
    created() {
        window.addEventListener('resize', ()=>this.toggle_sideBar(false));
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
