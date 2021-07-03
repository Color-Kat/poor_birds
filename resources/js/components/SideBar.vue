<template>
    <aside v-if="getAuth" :class="{ active: active_sideBar }">
        <t-card>
            <b-navbar-nav class="nav-pills red">

                <b-nav-item to="/account" class="border-bottom">
                    <UserAvatar :balance="true"/>
                </b-nav-item>

                <b-nav-item :to="{name: 'eggs'}" active-class="active">
                    <div class="d-flex align-items-center justify-content-between" style="font-size: 1.15em">
                        <span>🥚Склад яиц</span>
                    </div>
                </b-nav-item>

                <div class="mb-3 border-bottom" style="font-size: 1.15em">
                    <b-nav-item :to="{name: 'my_birds'}" active-class="active"><b>🦅</b>Мои
                        птицы
                    </b-nav-item>
                </div>

                <div style="font-size: 1.2em" class="mb-3 border-bottom">
                    <b-nav-item :to="{name: 'birds'}" active-class="active"><b>🐔</b>Список птиц</b-nav-item>

                    <b-nav-item :to="{name: 'sellers'}" active-class="active"><b>🛒</b>Продавцы</b-nav-item>

                    <b-nav-item :to="{name: 'certificates'}" active-class="active"><b>📋</b>Сертификаты</b-nav-item>
                    <b-nav-item :to="{name: 'shovels'}" active-class="active"><b>🧹</b>Лопаты</b-nav-item>
                </div>

                <div style="font-size: 1.1em" class="mb-3 border-bottom">
                    <b-nav-item active-class="active" :to="{name: 'contracts'}"><b>📜</b>Контракты</b-nav-item>
                    <b-nav-item active-class="active" :to="{name: 'mine'}"><b>⛏</b>Шахта</b-nav-item>
                </div>

                <div style="font-size: 1.1em">
                    <b-nav-item active-class="active" :to="{name: 'bank'}">
                        <div class="w-100 d-flex justify-content-between">
                            <span><b>🏦</b>Банк</span>
                            <b-badge
                                class="d-flex align-items-center justify-content-center"
                                variant="warning"
                            >
                                {{getUserWallets.GTN}} GTN
                            </b-badge>
                        </div>
                    </b-nav-item>
                </div>

                <div style="font-size: 1.1em" v-if="getIsFinal && !getRepaid">
                    <b-nav-item active-class="active" :to="{name: 'bribe'}">
                        <span>💰Взятки</span>
                    </b-nav-item>
                </div>

            </b-navbar-nav>
        </t-card>
    </aside>

</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import UserAvatar from "./auth/account/UserAvatar";

export default {
    name      : "Aside",
    computed  : {
        ...mapGetters(['getAuth', 'getUserWallets', 'getIsFinal', 'getRepaid']),
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
        // window.addEventListener('resize', () => this.toggle_sideBar(false));
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
    border-radius: 0.25rem;

    @media screen and (max-height: 670px) {
        max-height: 372px !important;
        overflow-y: scroll;
    }

    @media screen and (max-height: 800px) {
        max-height: 510px;
        overflow-y: scroll;
    }

    // Hide scroll
    &::-webkit-scrollbar {width: 0;}
    & {-ms-overflow-style: none;}
    & {overflow: -moz-scrollbars-none;}

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

    //@media screen and (max-width: 575px) {
    //    // not active
    //    & {
    //        top: 70px
    //    }
    //}
}
</style>
