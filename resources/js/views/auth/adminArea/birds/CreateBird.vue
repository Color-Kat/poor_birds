<template>
    <div class="p-3">
        <b-form
            @submit.prevent="onSubmit"
            enctype="multipart/form-data"
        >
            <b-alert variant="danger" :show="error">Произошла какая-то ошибка</b-alert>

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
                    minLength="3"
                ></b-form-input>
            </b-form-group>

            <!--      DESCRIPTION      -->
            <b-form-group id="input-description" label="Описание птицы:" label-for="description">
                <b-form-input
                    id="description"
                    v-model="form.description"
                    placeholder="Срет много"
                    required
                    minLength="7"
                ></b-form-input>
            </b-form-group>

            <!--      IMAGE      -->
            <b-form-group id="input-image" label="Изображение птицы:" label-for="image">
                <b-form-file
                    accept="image/jpeg, image/png, image/gif"
                    v-model="form.image"
                    :state="Boolean(form.image)"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                ></b-form-file>
                <p class="mt-2">Selected file: <b>{{ form.image ? form.image.name : '' }}</b></p>
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

            <b-form-group
                id="input-sellers"
                :label="`У каких продавцов продается птица:`"
                label-for="sellers"
            >
                <b-form-checkbox
                    v-for="seller of getSellers"
                    :id="`sellers-${seller.id}`"
                    :name="`sellers-${seller.id}`"
                    v-model="form.sellers"

                    :key="seller.id"
                    :value="seller.id"
                >
                    {{ seller.name }}
                </b-form-checkbox>
            </b-form-group>

            <!--    price    -->
            <b-form-group
                id="input-egg-price"
                :label="`Цена яйца: `"
                label-for="egg-price"
            >
                <b-form-input id="egg-price" v-model="form.egg_price" type="number" min="0"></b-form-input>
            </b-form-group>

            <!--    price    -->
            <b-form-group
                id="input-price"
                :label="`Цена:`"
                label-for="price"
            >
                <b-form-input id="price" v-model="form.price" type="number" min="0"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">{{
                    Object.keys($route.query).length == 0 ? 'Снести яйцо)' :
                        'Мутировать'
                }}
            </b-button>
            <!--            <b-button type="reset" variant="danger">Сбросить</b-button>-->
        </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "CreateBird",
    data() {
        return {
            form : {
                id         : this.$route.query.id || null,
                name       : this.$route.query.name || 'Tester',
                description: this.$route.query.description || 'Тестирует приложение',
                image      : null,
                imagePath  : this.$route.query.image || '',
                demand     : this.$route.query.demand || 50,
                fertility  : this.$route.query.fertility || 1,
                care       : this.$route.query.care || 10,
                litter     : this.$route.query.litter || 10,
                sellers    : this.$route.query.sellers ? JSON.parse(this.$route.query.sellers).map(seller => seller.id)
                    : [],
                egg_price  : this.$route.query.egg_price || 1,
                price      : this.$route.query.price || 100
            },
            error: false
        }
    },
    computed: {
        ...mapGetters(['getSellers'])
    },
    methods : {
        ...mapActions(['createBird', 'updateBird']),

        async onSubmit() {
            // there are parameters, so need to update the bird
            if (Object.keys(this.$route.query).length !== 0) {
                // if the image is already there, then we replace it
                let form = {
                    ...this.form,
                    image: this.form.image || this.form.imagePath
                };
                delete form.imagePath; // remove unnecessary

                this.error = !(await this.updateBird(form));
            } else {
                // check errors
                this.error = !(await this.createBird(this.form));
            }

            // redirect to admin page
            if (!this.error) await this.$router.push({name: 'admin-birds'})
        },

    },
    mounted() {
        console.log(this.$route.query)
        console.log(this.form)
    }
}
</script>

<style scoped>

</style>
