<template>
    <div id="admin-area">
        <b-card no-body>
            <h3 class="text-center m-3">Админ панель</h3>
            <!--            <b-tabs card fill>-->
            <!--                <b-tab no-body title="Птицы" to="/admin_area/birds">-->
            <!--&lt;!&ndash;                    <b-card-img&ndash;&gt;-->
            <!--&lt;!&ndash;                        bottom&ndash;&gt;-->
            <!--&lt;!&ndash;                        src="https://www.lovethegarden.com/sites/default/files/styles/header_image_xl/public/content/articles/UK_community-fun-facts-19-common-british-birds-you-can-find-your-garden_header.jpg?itok=MweJ55ij"&ndash;&gt;-->
            <!--&lt;!&ndash;                        alt="Птички"&ndash;&gt;-->

            <!--&lt;!&ndash;                    ></b-card-img>&ndash;&gt;-->
            <!--&lt;!&ndash;                    <b-card-footer>&ndash;&gt;-->
            <!--&lt;!&ndash;                        <Birds :birds="getBirds"/>&ndash;&gt;-->
            <!--&lt;!&ndash;                    </b-card-footer>&ndash;&gt;-->
            <!--                </b-tab>-->

            <!--                <b-tab no-body title="Продавцы">-->
            <!--&lt;!&ndash;                    <b-card-img bottom src="https://picsum.photos/600/200/?image=25" alt="Image 25"></b-card-img>&ndash;&gt;-->
            <!--&lt;!&ndash;                    <b-card-footer>Picture 2 footer</b-card-footer>&ndash;&gt;-->
            <!--                </b-tab>-->

            <!--                <b-tab no-body title="Инструменты">-->
            <!--&lt;!&ndash;                    <b-card-img bottom src="https://picsum.photos/600/200/?image=26" alt="Image 26"></b-card-img>&ndash;&gt;-->
            <!--&lt;!&ndash;                    <b-card-footer>Picture 3 footer</b-card-footer>&ndash;&gt;-->
            <!--                </b-tab>-->


            <!--            </b-tabs>-->

            <div class="tabs">
                <b-nav tabs>
                    <b-nav-item to="/admin_area/birds" active-class="active">
                        Птички
                    </b-nav-item>
                    <b-nav-item to="/admin_area/sellers" active-class="active">
                        Продавцы
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
        <!--        <b-card no-body>-->
        <!--            <b-tabs card fill>-->
        <!--                <b-tab title="Tab 1" active>-->
        <!--                    <b-card-text>Tab contents 1</b-card-text>-->
        <!--                </b-tab>-->
        <!--                <b-tab title="Tab 2">-->
        <!--                    <b-card-text>Tab contents 2</b-card-text>-->
        <!--                </b-tab>-->
        <!--            </b-tabs>-->
        <!--        </b-card>-->
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
