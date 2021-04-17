<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
        {{field.name}}
        <b-badge variant="none">{{field.value}}</b-badge>
    </b-list-group-item>
</template>

<script>
export default {
    name: "AccountField",
    props: ['field'],
    // mounted() {
    // }
}
</script>

<style scoped>

</style>
