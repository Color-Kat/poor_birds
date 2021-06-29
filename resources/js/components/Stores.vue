<template>
    <b-card>
        <h2>Магазины:</h2>

        <div class="stores-wrapper">
            <div id="stores">
                <b-button class="store-btn text-center" :to="{name: 'sellers'}" variant="primary">🛒</b-button>
                <b-button class="store-btn text-center" :to="{name: 'birds'}" variant="success">🐔</b-button>
                <b-button class="store-btn text-center" :to="{name: 'certificates'}" variant="warning">📋</b-button>
                <b-button class="store-btn text-center" :to="{name: 'shovels'}" variant="secondary">🧹</b-button>
            </div>
        </div>
    </b-card>
</template>

<script>
export default {
    name: "Store"
}
</script>

<style scoped lang="scss">
.stores-wrapper {
    position: relative;
    display: block;
    width: 100%;

    &:after {
        content: '';
        display: block;
        padding-top: 100%;
    }

    #stores {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 20px;

        .store-btn {
            font-size: 5em;
            display: flex;
            justify-content: center;
            align-items: center;;
        }
    }
}
</style>
