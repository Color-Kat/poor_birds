<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center" style="height: max-content">
        <span class="mr-4 top-0">{{ field[0] }}</span>
        <div>
          <span>{{ field[1] }}</span>
          <b-badge
              v-if="field[2]"
              v-b-popover.hover.top="field[2]"
              :title="field[1]"
              size="sm"
              pill
          >
            <b>?</b>
          </b-badge>
        </div>
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
