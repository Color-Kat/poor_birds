<template>
    <b-badge v-if="getBalance" variant="primary">{{getBalance}} &#8381;</b-badge>
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
