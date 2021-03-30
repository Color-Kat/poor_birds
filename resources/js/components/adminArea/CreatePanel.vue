<template>
    <div class="createPanel mb-2">
        <b-button variant="primary" :to="{name: routeName}">
            {{message}}}
        </b-button>
    </div>
</template>

<script>
export default {
    name: "CreatePanel",
    props: ['routeName', 'message']
}
</script>

<style scoped>

</style>
