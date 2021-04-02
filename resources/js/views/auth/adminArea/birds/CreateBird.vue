<template>
    <div class="p-3">
        <b-form @submit.prevent="onSubmit">

            <!--      NAME      -->
            <b-form-group
                id="input-name"
                label="Название птицы:"
                label-for="name"
            >
                <b-form-input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Засёрыш"
                    required
                ></b-form-input>
            </b-form-group>

            <!--      DESCRIPTION      -->
            <b-form-group id="input-description" label="Описание птицы:" label-for="description">
                <b-form-input
                    id="description"
                    v-model="form.description"
                    placeholder="Срет много"
                    required
                ></b-form-input>
            </b-form-group>

            <!--      IMAGE      -->
            <b-form-group id="input-image" label="Изображение птицы:" label-for="image">
                <b-form-file
                    v-model="form.image"
                    :state="Boolean(form.image)"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                ></b-form-file>
                <!--                <p class="mt-2">Selected file: <b>{{ form.image ? form.image.name : '' }}</b></p>-->
            </b-form-group>

            <!--    DEMAND (спрос)    -->
            <b-form-group
                id="input-demand"
                :label="`Спрос на яйца этой птицы:`"
                label-for="demand"
                description="Сколько яиц в среднем можно продать за час"
            >
                <b-form-input id="demand" v-model="form.demand" type="number" min="0" max="100000"></b-form-input>
            </b-form-group>

            <!--    fertility (плодоносность)    -->
            <b-form-group
                id="input-fertility"
                :label="`Плодоносность:`"
                label-for="fertility"
                description="Сколько яиц за час несет птица"
            >
                <b-form-input
                    id="fertility" v-model="form.fertility" type="number" min="0"
                    max="100000000"
                ></b-form-input>
            </b-form-group>

            <!--    care (забота)    -->
            <b-form-group
                id="input-care"
                :label="`Бонус за заботу:`"
                label-for="care"
                description="На сколько % вырастает плодоносность после ухода за этой птицей"
            >
                <b-form-input id="care" v-model="form.care" type="number" min="-100" max="100"></b-form-input>
            </b-form-group>

            <!--    litter (помёт)    -->
            <b-form-group
                id="input-litter"
                :label="`Помет:`"
                label-for="litter"
                description="Сколько единиц помета в час производит птица"
            >
                <b-form-input id="litter" v-model="form.litter" type="number" min="0" max="10000000"></b-form-input>
            </b-form-group>

            <!--    price    -->
            <b-form-group
                id="input-price"
                :label="`Цена:`"
                label-for="price"
            >
                <b-form-input id="price" v-model="form.price" type="number" min="0"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Снести яйцо)</b-button>
            <b-button type="reset" variant="danger">Сбросить</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>

    </div>
</template>

<script>
export default {
    name: "CreateBird",
    data() {
        return {
            form: {
                name       : 'Z',
                description: 'S',
                image      : null,
                demand     : 50,
                fertility  : 1,
                care       : 10,
                litter     : 10,
                price      : 100
            },
        }
    },
    methods: {
        onSubmit() {
            alert(JSON.stringify(this.form))
        },
        // onReset() {
        //     // Reset our form values
        //     // this.form.name = '',
        //     // this.form.description = '',
        //     // this.form.image = null,
        //     // this.form.demand = 50,
        //     // this.form.fertility = 1,
        //     // this.form.care = 10,
        //     // this.form.litter = 10,
        //     // this.form.price = 100
        // }
    }
}
</script>

<style scoped>

</style>
