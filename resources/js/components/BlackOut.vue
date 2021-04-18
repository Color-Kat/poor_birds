<template>
    <div class="blackout" :class="{ active: active_sideBar }" @click="onBlackoutClick"></div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    name: "BlackOut",
    computed: {
        ...mapState(['active_sideBar'])
    },
    methods: {
        ...mapActions(['toggle_sideBar']),
        onBlackoutClick() {
            if (this.active_sideBar) {
                this.toggle_sideBar(false);
            }
        }
    }
}
</script>

<style scoped lang="scss">
.blackout {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    pointer-events: none;
    opacity: 0;
    transition: all .2s;

    &.active {
        z-index: 1005;
        opacity: 1;
        pointer-events: all;
    }
}
</style>
