<template>
    <b-card>
        <h2>💰Взятки</h2>
        <h5>Платите Густову, чтобы выжить!</h5>
        <p>
            После того, как вы спаслись от погребения заживо, вы стали бояться каждого шороха.
            А всё потому, что Густов в любой момент может вас снова попытаться убить.
            Поэтому вы решаете дать ему большущую взятку в размере 1.000.000.000 рублей.
        </p>
        <hr>

        <div class="d-flex justify-content-center flex-wrap">
            <div class="w-50 ">

                <img class="w-100" src="http://www.procuror.spb.ru/gif/gustov.jpg" alt="ГУСТОВ">

                <div class="d-flex justify-content-center flex-wrap">
                    <b-button class="w-100" variant="danger" @click="repayLoan">💰Отдать все свои деньги💰</b-button>
                    <span class="alert-info p-2 m-2 badge-pill">Осталось: {{rest}}₽</span>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name   : "Bribe",
    data   : () => ({
        rest: this.bribeRest
    }),
    computed: {
        ...mapActions(['bribeRest'])
    },
    methods: {
        repayLoan() {
            this.rest -= 100000;

            if (this.rest >= 5000000) {
                // sound of damage
                let song    = new Audio( '/assets/sounds/death.mp3');
                song.volume = 0.5;
                song.play();
            } else if (this.rest <= 0) {
                // sound of dying
                let song    = new Audio('/assets/sounds/groans.mp3');
                song.volume = 0.5;
                song.play();

                song.onended = () => {
                    // sound of death
                    let song2 = new Audio('/assets/sounds/death.mp3');
                    song2.volume = 0.5;
                    song2.play();
                }
            } else if (this.rest < 5000000) {
                // sound of heart beat
                let song    = new Audio('/assets/sounds/heart_beat.mp3');
                song.volume = 0.5;
                song.play();
            }
        }
    }
}
</script>

<style scoped>

</style>
