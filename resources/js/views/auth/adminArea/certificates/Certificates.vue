<template>
    <div id="admin-birds-panel">

        <!--   Create Update Delete   -->
        <!--   Current route is /admin_area/birds/some     -->
        <router-view v-if="$route.name != 'admin-certificates'"></router-view>
        <!--   Create Update Delete   -->

        <!--   Show all birds    -->
        <!--Current route is /admin_area/birds-->
        <div v-else>
            <CreatePanel message="Зарегистрировать сертификат" route="/admin_area/certificates/create"/>
<!--{{getCertificates}}-->
            <!--    No birds   -->
            <b-card v-if="getCertificates.length == 0">
                Пока сертификатов нет.. <br>
                А за что штрафовать?
                ;)
            </b-card>
            <!--    No birds    -->

            <div v-else>

                <b-table striped hover :items="getCertificates" :fields="fields">
                    <!--      IMAGE      -->
                    <template #cell(grade)="data">
                        <img height="80px" :src="`/storage/certificates/${data.item.grade}.jpg`" alt="">
                    </template>
                    <!--      IMAGE      -->

                    <!--      ACTIONS      -->
                    <template #cell(actions)="data">
                        <!--          view           -->
                        <b-button variant="success" :to="`/certificates/${data.item.id}`">
                            <b-icon icon="eye-fill"></b-icon>
                        </b-button>

                        <!--          edit           -->
                        <b-button variant="warning" :to="{
                            // path: `/admin_area/birds/update/${data.item.id}`,
                            path: `/admin_area/certificates/create`,
                            // transfer the bird to create form
                            query: {
                                ...data.item,
                                // sellers: JSON.stringify(data.item.sellers) // vue router not support nested objects
                            }
                        }">
                            <b-icon icon="pencil-fill"></b-icon>
                        </b-button>

                        <!--          delete           -->
                        <b-button variant="danger" @click="()=>{deleteCertificate(data.item.id);}">
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
    name    : "Birds",
    computed: {
        ...mapGetters(['getCertificates'])
    },
    methods: {
        ...mapActions(['deleteCertificate'])
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
                key: 'grade',
                label: 'Иконка'
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
                key  : 'actions',
                label: 'Действия'
            }
        ]
    }),
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
