<template>
    <div class="chart">
        <canvas ref="canvas">Ваш браузер не поддерживает canvas! Обновите свой браузер, чтобы видеть графики</canvas>
    </div>
</template>

<script>
import {Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale} from 'chart.js';
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

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
    },
    updated() {
        console.log(123)
        // this.chart.update();
    }
}
</script>

<style scoped>

</style>
