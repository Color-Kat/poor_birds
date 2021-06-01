<template>
    <div class="chart position-relative" style="width: 100%;">
        <canvas ref="canvas">Ваш браузер не поддерживает canvas! Обновите свой браузер, чтобы видеть графики</canvas>
    </div>
</template>

<script>
import {Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale} from 'chart.js';
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
Chart.defaults.color = '#004085';
Chart.defaults.borderColor = '#004085';
Chart.defaults.backgroundColor = 'white';

export default {
    name: "Chart",
    props: {
        chartData: Object,
        chartOptions: Object
    },
    data: ()=>({
       chart: null
    }),
    mounted() {
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'line',
            data: this.chartData,
            options: this.chartOptions
        });
        //
        // window.addEventListener('resize',()=>{this.chart.resize();});
    },
    updated() {
        console.log(123)
        // this.chart.update();
    },
    // beforeDestroy() {window.removeEventListener('resize',()=>{this.chart.resize();});}
}
</script>

<style scoped>

</style>
