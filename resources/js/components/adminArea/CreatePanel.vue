<template>
    <div class="createPanel m-3">
        <b-button variant="primary" :to="route">
            {{message}}}
        </b-button>
    </div>
</template>

<script>
export default {
    name: "CreatePanel",
    props: ['route', 'message']
}
</script>

<style scoped>

</style>
