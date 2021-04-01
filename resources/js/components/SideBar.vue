<template>
    <div class="aside-wrapper" :class="{ active: active_sideBar }">
        <aside v-if="getAuth" >
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
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
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
}
</script>

<style scoped lang="scss">
.aside-wrapper {
    position: fixed;
    transition: all .2s ease-in-out;
    z-index: 20000;

    @media screen and (min-width: 767px) {
        & {opacity: 0}
        aside {
            width: 28rem;
        }
    }

    @media screen and (max-width: 767px) {
        // not active
        & {
            opacity: 0;
            width: 100vw;
            height: 100vh;

            aside {
                //width: 28rem;
                //position: fixed;
                //z-index: 20000;
                position: absolute;
                left: -100%;
                width: 270px;
                transition: all .2s ease-in-out;
            }
        }
        // active
        &.active {
            background: rgba(0, 0, 0, 0.5);
            opacity: 1;

            aside {

                left: 0;
            }
        }

    }
}

</style>
