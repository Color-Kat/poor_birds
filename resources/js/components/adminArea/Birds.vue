<template>
    <div id="admin-birds">

        <!--    Кнопка создать    -->
        <CreatePanel message="Создать птицу" to="admin_area/birds"/>

        <!--        <b-list-group style="box-shadow: none !important">-->
        <!--            <b-list-group-item v-if="birds.length == 0">-->
        <b-card v-if="birds.length == 0">
            Птичек нет :( <br>
            Чума или птичий гриб??
        </b-card>
        <!--            </b-list-group-item>-->

        <b-card v-else>
            список птиц
        </b-card>
        <!--        </b-list-group>-->
    </div>
</template>

<script>
import CreatePanel from "./CreatePanel";

export default {
    name      : "AdminBirds",
    components: {CreatePanel},
    props     : ['birds']
}
</script>

<style scoped>

</style>
