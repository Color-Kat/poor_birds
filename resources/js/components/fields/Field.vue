<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center" style="height: max-content">
        <span class="mr-4 top-0">{{ field[0] }}</span>
        <span variant="none">{{ field[1] }}</span>
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
