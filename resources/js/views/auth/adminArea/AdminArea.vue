<template>
    <div id="admin-area">
        <b-card no-body class="shadow card-rounded">
            <h3 class="text-center m-3">Админ панель</h3>

            <div id="admin-panel" class="p-2">
                <b-card>
                    <b>Накрутить денег: </b>
                    <br>
                    <b-input type="number" min="0" v-model="changeMoneyCount"/>
                    <b-button
                        @click="()=>changeMoney(changeMoneyCount)"
                        variant="primary"
                        class="mt-2 w-100"
                    >
                        Применить
                    </b-button>
                </b-card>

                <hr>
            </div>

            <div class="tabs">
                <b-nav tabs>
                    <b-nav-item :to="{name: 'admin-birds'}" active-class="active">
                        Птички
                    </b-nav-item>
                    <b-nav-item :to="{name: 'admin-sellers'}" active-class="active">
                        Продавцы
                    </b-nav-item>
                    <b-nav-item :to="{name: 'admin-certificates'}" active-class="active">
                        Сертификаты
                    </b-nav-item>
                    <b-nav-item :to="{name: 'admin-shovels'}" active-class="active">
                        Лопаты
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
import {mapState, mapGetters, mapActions} from "vuex";
// import Birds from "../../../components/adminArea/Birds";

export default {
    name      : "AdminArea",
    data      : () => ({
        changeMoneyCount : 0
    }),
    methods:{
        ...mapActions(['changeMoney']),
        changeMoneyHandler(){
            console.log(124);
            this.changeMoney(this.changeMoneyCount);
        }
    },
    components: {
        // Birds
    },

}
</script>

<style scoped>

</style>
