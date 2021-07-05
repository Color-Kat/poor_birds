<template>
    <div class="position-relative">
        <b-card class="shadow card-rounded overflow-hidden">
            <div class="position-relative mb-5 pb-5" style="z-index: 12">
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
                        В эту гигантскую кучу дерьма ведет канализация Густограда, сюда смывают сточные
                        воды все предприятия города. А вы, обычный житель, можете заработать,
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
                        class="mine-button w-75"
                        @click="mineHandler"
                        :class="isBig ? 'big-mine' : ''"
                    >
                        <img src="/assets/shit_2.png" alt="дерьмо" class="w-100">
                    </button>
                </div>
                <!--         mine button       -->

                <hr>

                <!--    litter    -->
                <div>
                    <p>Вы собрали: {{clicks.toLocaleString()}}ед.мусора на сумму {{earnings.toLocaleString()}}₽</p>
                    <b-button class="w-100" size="lg" v-if="earnings > 0" variant="primary" @click="mineSell">Продать
                    </b-button>
                </div>
                <!--    litter    -->
            </div>

            <!--      SHIT      -->
            <div class="w-100 h-100 position-absolute" style="top: 0; z-index: 10">
                <img src="/assets/shit_top.png" alt="дерьмо" class="w-100 position-absolute" style="top: 0">
                <!--            <img src="/assets/shit_left.png" alt="дерьмо" class="w-100 position-absolute" style="top: 50%">-->
                <img src="/assets/shit_bottom.png" alt="дерьмо" class="w-100 position-absolute" style="bottom: 0">
            </div>
            <!--      SHIT      -->
        </b-card>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name    : "Mine",
    data    : () => ({
        isBig: false,
        clicks: localStorage.getItem('mine-clicks') ?? 0,// get clicks from local storage or 0
        sounds: function () {
            // return array of songs;
            let song_1 = new Audio();
            let song_2 = new Audio();
            song_1.src = '/assets/sounds/boole.mp3';
            song_2.src = '/assets/sounds/slime_click.mp3';
            // change volume
            song_1.volume = 0.4
            song_2.volume = 0.4


            return [
                song_1, song_2
            ];
        },
    }),
    computed: {
        localStorage: () => localStorage, // for toggle tooltip,
        earnings: function() {
            return this.clicks / 100; // count earning from clicks
        }
    },
    methods : {
        ...mapActions(['mine']),
        mineHandler() {
            this.isBig = !this.isBig; // some animation
            this.clicks++; // increase click count

            // every 10 clicks update localStorage data
            if(this.clicks % 10 === 0) localStorage.setItem('mine-clicks', this.clicks);

            // play random song (from 2 songs)
            this.sounds()[Math.round(Math.random())].play();
        },
        async mineSell(){
            let result = await this.mine(this.earnings); // sell all trash
            this.clicks = 0; // zero clicks

            // removl all click from localStorage
            localStorage.setItem('mine-clicks', 0);
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
