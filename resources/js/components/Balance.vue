<template>
    <b-badge v-if="getBalance !== false" variant="primary">{{getBalance}} &#8381;</b-badge>
    <b-spinner v-else small variant="light"></b-spinner>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Balance",
    computed: mapGetters(['getBalance'])
}
</script>

<style scoped>

</style>
