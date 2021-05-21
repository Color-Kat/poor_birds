<template>
    <div class="position-relative">
        <b-card>
            <div class="position-relative" style="z-index: 12">
                <!--      toggle tooltip      -->
                <div class="m-1 position-absolute w-100 text-right">
                    <b-badge
                        v-b-toggle.collapse-shovel
                        pill size="sm"
                        variant="dark"
                        @click="()=>{ // toggle tooltip
                    localStorage.setItem(
                        'tooltip-mine',
                        !( (localStorage.getItem('tooltip-mine') || 'false') == 'true' )
                    )}"
                    >?
                    </b-badge>
                </div>

                <h2 class="text-center">Навозная шахта</h2>

                <!--         collapse tooltip (from localStorage)       -->
                <b-collapse :visible="localStorage.getItem('tooltip-mine') == 'true'" id="collapse-shovel">
                    <p>
                        В этой навозной шахте вы можете подзаработать немного денег на начальном этапе.
                        В эту гигантскую кучу дерьма ведет канализация этого города, сюда смывают сточные
                        воды все предприятия вашего города. А вы, обычный житель города, можете заработать,
                        разгребая эту кучу.
                        Работа не пыльная, но...
                    </p>
                    <b-alert show variant="info">
                        <ul class="m-0">
                            <li>Одно нажатие на кучу - 1 ед.мусора</li>
                            <li>100ед.мусора - 1 рубль</li>
                        </ul>
                    </b-alert>
                </b-collapse>
                <!--      toggle tooltip      -->
                <hr>
                <!--         mine button       -->
                <div class="d-flex justify-content-center w-100 align-items-center mb-5">
                    <button
                        class="mine-button w-50"
                        @click="mineHandler"
                        :class="isBig ? 'big-mine' : ''"
                    >
                        <img src="/assets/shit_2.png" alt="дерьмо" class="w-100">
                    </button>
                </div>
                <!--         mine button       -->
            </div>
        </b-card>

        <!--      SHIT      -->
        <div class="w-100 h-100 position-absolute" style="top: 0; z-index: 10">
            <img src="/assets/shit_top.png" alt="дерьмо" class="w-100 position-absolute" style="top: 0">
            <!--            <img src="/assets/shit_left.png" alt="дерьмо" class="w-100 position-absolute" style="top: 50%">-->
            <img src="/assets/shit_bottom.png" alt="дерьмо" class="w-100 position-absolute" style="bottom: 0">
        </div>
    </div>
</template>

<script>
export default {
    name    : "Mine",
    data    : () => ({
        isBig: false
    }),
    computed: {
        localStorage: () => localStorage // for toggle tooltip
    },
    methods : {
        mineHandler() {
            this.isBig = !this.isBig
        }
    }
}
</script>

<style scoped lang="scss">
.mine-button {
    border: none;
    background: none;
    outline: none;

    img {
        transition: all .05s ease-in;
    }

    &.big-mine img {
        transform: scale(1.1);
    }
}
</style>
