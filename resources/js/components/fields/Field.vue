<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
        {{ field[0] }}
        <b-badge variant="none">{{ field[1] }}</b-badge>
    </b-list-group-item>
</template>

<script>
export default {
    name : "Field",
    props: ['field'], // ['name', 'value']
    // mounted() {
    //     console.log(this.field)
    // }
}
</script>
