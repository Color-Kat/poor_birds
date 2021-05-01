<template>
    <div id="admin-seller-panel">

        <!--   Create Update Delete   -->
        <!--   Current route is /admin_area/sellers/some     -->
        <router-view v-if="$route.name != 'admin-sellers'"></router-view>
        <!--   Create Update Delete   -->

        <!--   Show all sellers    -->
        <!--   Current route is /admin_area/sellers  -->
        <div v-else>

            <CreatePanel message="Зарегистрировать нового продавца" route="/admin_area/sellers/create"/>

            <!--    No sellers   -->
            <b-card v-if="getSellers.length == 0">
                Никого нет :( <br>
                Хоть кто-нибудь хочет себе яйца?
            </b-card>
            <!--    No birds    -->

            <div v-else>
                <b-table responsive striped hover :items="getSellers" :fields="fields">

                    <!--      IMAGE      -->
                    <template #cell(image)="data">
                        <img height="80px" :src="`/storage/${data.item.image}`" alt="">
                    </template>
                    <!--      IMAGE      -->

                    <!--      ACTIONS      -->
                    <template #cell(actions)="data">
                        <b-button variant="success" :to="`/sellers/${data.item.id}`">
                            <b-icon icon="eye-fill"></b-icon>
                        </b-button>

                        <b-button
                            variant="warning" :to="{
                            // path: `/admin_area/birds/update/${data.item.id}`,
                            path: `/admin_area/sellers/create`,
                            // transfer the bird to create form
                            query: {
                                ...data.item
                            }
                        }"
                        >
                            <b-icon icon="pencil-fill"></b-icon>
                        </b-button>

                        <b-button variant="danger" @click="()=>{deleteSeller(data.item.id);}">
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
    name      : "Sellers",
    computed  : {
        ...mapGetters(['getSellers'])
    },
    components: {CreatePanel},
    methods: {
        ...mapActions(['deleteSeller', 'fetchSellers'])
    },
    data      : () => ({
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
                key  : 'discount',
                label: 'Скидка'
            },
            {
                key  : 'price',
                label: 'Цена контракта'
            },
            {
                key  : 'actions',
                label: 'Действия'
            }
        ]
    }),
    mounted() {
        this.fetchSellers();
    }
}
</script>

<style scoped>
.table th, .table td {
    vertical-align: center !important;
}
</style>
