<template>
    <div id="admin-area">
        <b-card no-body>
            <h3 class="text-center m-3">Админ панель</h3>

            <div class="tabs">
                <b-nav tabs>
                    <b-nav-item :to="{name: 'admin-birds'}" active-class="active">
                        Птички
                    </b-nav-item>
                    <b-nav-item :to="{name: 'admin-sellers'}" active-class="active">
                        Продавцы
                    </b-nav-item>
                    <b-nav-item to="/admin_area/certificates" active-class="active">
                        Сертификаты
                    </b-nav-item>
                    <b-nav-item to="/admin_area/birdhouses" active-class="active">
                        Скворечники
                    </b-nav-item>
                    <b-nav-item to="/admin_area/instruments" active-class="active">
                        Инструменты
                    </b-nav-item>
                </b-nav>
                <div class="tab-content">
                    <router-view></router-view>
                </div>
            </div>



        </b-card>
    </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
// import Birds from "../../../components/adminArea/Birds";

export default {
    name      : "AdminArea",
    components: {
        // Birds
    },

}
</script>

<style scoped>

</style>
