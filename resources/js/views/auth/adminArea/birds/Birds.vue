<template>
    <div id="admin-birds-panel">

        <!--   Create Update Delete   -->
        <!--   Current route is /admin_area/birds/some     -->
        <router-view v-if="$route.name != 'admin-birds'"></router-view>
        <!--   Create Update Delete   -->

        <!--   Show all birds    -->
        <!--Current route is /admin_area/birds-->
        <div v-else>
            <Loader v-if="loading" />

            <div v-else>
                <CreatePanel message="Создать птицу" route="/admin_area/birds/create"/>

                <!--    No birds   -->
                <b-card v-if="getBirds.length == 0">
                    Птичек нет :( <br>
                    Чума или птичий гриб??
                </b-card>
                <!--    No birds    -->

                <div v-else>

                    <b-table responsive striped hover :items="getBirds" :fields="fields">

                        <!--      IMAGE      -->
                        <template #cell(image)="data">
                            <img height="80px" :src="`/storage/${data.item.image}`" alt="">
                        </template>
                        <!--      IMAGE      -->

                        <!--      ACTIONS      -->
                        <template #cell(actions)="data">
                            <b-button variant="success" :to="`/birds/${data.item.id}`">
                                <b-icon icon="eye-fill"></b-icon>
                            </b-button>

                            <b-button variant="warning" :to="{
                            // path: `/admin_area/birds/update/${data.item.id}`,
                            path: `/admin_area/birds/create`,
                            // transfer the bird to create form
                            query: {
                                ...data.item,
                                sellers: JSON.stringify(data.item.sellers) // vue router not support nested objects
                            }
                        }">
                                <b-icon icon="pencil-fill"></b-icon>
                            </b-button>

                            <b-button variant="danger" @click="()=>{deleteBird(data.item.id);}">
                                <b-icon icon="trash-fill"></b-icon>
                            </b-button>
                        </template>
                        <!--      ACTIONS      -->
                    </b-table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import CreatePanel from "../../../../components/adminArea/CreatePanel";
import Loader from "../../../../components/Loader";

export default {
    name    : "Birds",
    computed: {
        ...mapGetters(['getBirds'])
    },
    methods: {
        ...mapActions(['deleteBird', 'fetchBirds'])
    },
    components: {
        Loader,
        CreatePanel
    },
    data    : () => ({
        loading: true,
        fields: [
            {
                key  : 'id',
                label: 'Id'
            },

            {
                key  : 'image',
                label: 'Птичка'
            },
            {
                key  : 'name',
                label: 'Название'
            },
            {
                key  : 'price',
                label: 'Цена'
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
    async mounted() {
        await this.fetchBirds();
        this.loading = false;
    }
    // created() {
    //     console.log(this.$route)
    // }
}
</script>

<style scoped>
.table th, .table td{
    vertical-align: center !important;
}
</style>
