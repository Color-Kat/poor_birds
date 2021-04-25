<template>
    <div id="admin-shovels-panel">
        <!--   Create Update Delete   -->
        <!--   Current route is /admin_area/shovels/some     -->
        <router-view v-if="$route.name != 'admin-shovels'"></router-view>
        <!--   Create Update Delete   -->

        <!--   Show all shovels    -->
        <!--   Current route is /admin_area/shovels  -->
        <div v-else>

            <CreatePanel message="Изобрести новую лопату" route="/admin_area/shovels/create"/>

            <!--    No shovels   -->
            <b-card v-if="getShovels.length == 0">
                Лопат нет! :( <br>
                Чем навоз чистить??
            </b-card>
            <!--    No shovels    -->

            <div v-else>
                <b-table striped hover :items="getShovels" :fields="fields">

                    <!--      IMAGE      -->
                    <template #cell(image)="data">
                        <img height="80px" :src="`/storage/${data.item.image}`" alt="">
                    </template>
                    <!--      IMAGE      -->

                    <!--      ACTIONS      -->
                    <template #cell(actions)="data">
                        <b-button variant="success" :to="`/Shovels/${data.item.id}`">
                            <b-icon icon="eye-fill"></b-icon>
                        </b-button>

                        <b-button
                            variant="warning" :to="{
                            path: `/admin_area/shovels/create`,
                            query: {
                                ...data.item
                            }
                        }"
                        >
                            <b-icon icon="pencil-fill"></b-icon>
                        </b-button>

                        <b-button variant="danger" @click="()=>{deleteShovel(data.item.id);}">
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
import {mapGetters, mapActions} from "vuex";
import CreatePanel from "../../../../components/adminArea/CreatePanel";

export default {
    name      : "Shovels",
    computed  : {
        ...mapGetters(['getShovels'])
    },
    components: {CreatePanel},
    methods: {
        ...mapActions(['deleteShovel', 'fetchShovels'])
    },
    data      : () => ({
        fields: [
            {
                key  : 'id',
                label: 'Id'
            },

            {
                key  : 'image',
                label: 'Лопата'
            },
            {
                key  : 'name',
                label: 'Название'
            },
            {
                key  : 'efficiency',
                label: 'Эффективность'
            },
            {
                key  : 'price',
                label: 'Цена'
            },
            {
                key  : 'actions',
                label: 'Действия'
            }
        ]
    }),
    mounted() {
        this.fetchShovels();
    }
}
</script>

<style scoped>
.table th, .table td {
    vertical-align: center !important;
}
</style>
