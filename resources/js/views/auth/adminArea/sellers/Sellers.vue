<template>
    <div id="admin-birds-panel">

        <!--   Create Update Delete   -->
        <!--   Current route is /admin_area/sellers/some     -->
        <router-view v-if="$route.name != 'admin-sellers'"></router-view>
        <!--   Create Update Delete   -->

        <!--   Show all sellers    -->
        <!--   Current route is /admin_area/sellers  -->
        <div v-else>

            <!--    No sellers   -->
            <b-card v-if="getSellers.length == 0">
                Никого нет :( <br>
                Хоть кто-нибудь хочет себе яйца?
            </b-card>
            <!--    No birds    -->

            <div v-else>
                <CreatePanel message="Зарегистрировать нового продавца" route="/admin_area/sellers/create"/>

                <b-table striped hover :items="getSellers" :fields="fields">

                    <!--      IMAGE      -->
                    <template #cell(image)="data">
                        <img height="80px" :src="`/storage/${data.item.image}`" alt="">
                    </template>
                    <!--      IMAGE      -->

                    <!--      ACTIONS      -->
                    <template #cell(actions)="data">
                        <b-button variant="success">
                            <b-icon icon="eye-fill"></b-icon>
                        </b-button>
                        <b-button variant="warning">
                            <b-icon icon="pencil-fill"></b-icon>
                        </b-button>
                        <b-button variant="danger">
                            <b-icon icon="trash-fill"></b-icon>
                        </b-button>
                    </template>
                    <!--      ACTIONS      -->
                </b-table>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import CreatePanel from "../../../../components/adminArea/CreatePanel";

export default {
    name    : "Sellers",
    computed: {
        ...mapGetters(['getSellers'])
    },
    components: {
        CreatePanel
    },
    data    : () => ({
        fields: [
            {
                key  : 'id',
                label: 'Id'
            },

            {
                key  : 'image',
                label: 'Логотип'
            },
            {
                key  : 'name',
                label: 'Название'
            },
            {
                key  : 'demand',
                label: 'Спрос'
            },
            {
                key  : 'fertility',
                label: 'Яиц/час'
            },
            {
                key  : 'actions',
                label: 'Действия'
            }
        ]
    }),
    created() {
        console.log(this.$route)
    }
}
</script>

<style scoped>
.table th, .table td{
    vertical-align: center !important;
}
</style>
