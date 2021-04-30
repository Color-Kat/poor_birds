<template>
    <div class="loader">
        <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style scoped lang="scss">
.loader{
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.66);
    z-index: 1004;
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        width: 6rem; height: 6rem;
    }
}
</style>
