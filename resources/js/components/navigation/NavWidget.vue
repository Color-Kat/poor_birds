<template>
    <div class="d-flex justify-content-around actions">
        <b-button class="text-center shadow" :to="{name: 'eggs'}" variant="success">🥚</b-button>
        <b-button class="text-center shadow" :to="{name: 'my_birds'}" variant="warning">🦅</b-button>
        <b-button class="text-center shadow" :to="{name: 'stores'}" variant="primary">🛒</b-button>
    </div>
</template>

<script>
export default {
    name: "NavWidget"
}
</script>

<style scoped lang="scss">
.actions {
    * {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }
}
</style>
