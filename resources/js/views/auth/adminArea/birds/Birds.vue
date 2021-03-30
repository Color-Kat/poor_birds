<template>
    <div id="admin=birds-panel">
        <b-card v-if="getBirds.length == 0">
            Птичек нет :( <br>
            Чума или птичий гриб??
        </b-card>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Birds",
    computed  : {
        ...mapGetters(['getBirds'])
    }
}
</script>

<style scoped>

</style>
