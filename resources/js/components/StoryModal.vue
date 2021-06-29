<template>
    <div
        class="quest-box"
    >
        <div class="quest-box-inner">
            <h4>
                {{title}}
            </h4>

<!--            <div>{{// content}}</div>-->
            <div v-html="content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StoryModal",
    props: ['title', 'content']
}
</script>

<style scoped>

</style>
