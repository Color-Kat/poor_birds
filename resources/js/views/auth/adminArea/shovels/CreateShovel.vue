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
                label="Название лопаты:"
                label-for="name"
            >
                <b-form-input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder='Шкрябалка'
                    required
                    minLength="3"
                ></b-form-input>
            </b-form-group>

<!--            &lt;!&ndash;      DESCRIPTION      &ndash;&gt;-->
<!--            <b-form-group id="input-description" label="Описание компании:" label-for="description">-->
<!--                <b-form-input-->
<!--                    id="description"-->
<!--                    v-model="form.description"-->
<!--                    placeholder='ООО "Деревенские петухи" - райское наслождение"'-->
<!--                    required-->
<!--                    minLength="7"-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->

            <!--      IMAGE      -->
            <b-form-group id="input-image" label="Фотография лопаты:" label-for="image">
                <b-form-file
                    accept="image/jpeg, image/png, image/gif"
                    v-model="form.image"
                    :state="Boolean(form.image)"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                ></b-form-file>
                <p class="mt-2">Selected file: <b>{{ form.image ? form.image.name : '' }}</b></p>
            </b-form-group>

            <!--    efficiency    -->
            <b-form-group
                id="input-efficiency"
                :label="`Эффективность лопаты:`"
                label-for="efficiency"
                description="Сколько ед.помёта за раз убирает лопата"
            >
                <b-form-input
                    id="efficiency" v-model="form.efficiency" type="number" min="0" max="1000000000"
                ></b-form-input>
            </b-form-group>

            <!--    price    -->
            <b-form-group
                id="input-price"
                :label="`Цена лопаты:`"
                label-for="price"
                description="Цена в игровых рублях (Оставить пустым, если есть цена доната)"
            >
                <b-form-input id="price" v-model="form.price" type="number" min="0"></b-form-input>
            </b-form-group>

            <!--    donate_price    -->
            <b-form-group
                id="input-donate_price"
                :label="`Цена лопаты (за донат):`"
                label-for="donate_price"
                description="Цена в реальных рублях"
            >
                <b-form-input id="donate_price" v-model="form.donate_price" type="number" min="0"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Создать</b-button>
            <!--            <b-button type="reset" variant="danger">Сбросить</b-button>-->
        </b-form>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "CreateShovel",
    data() {
        return {
            form : {
                id            : this.$route.query.id || null,
                name          : this.$route.query.name || 'Шкрябалка',
                // description   : this.$route.query.description || 'OOO "Райские петухи" - райское наслаждение от петухов',
                image         : null,
                imagePath     : this.$route.query.image || '',
                efficiency    : this.$route.query.efficiency || 100,
                price         : this.$route.query.price || 0,
                donat_price   : this.$route.query.price || 0,
            },
            error: false
        }
    },
    computed: mapGetters(['getShovel']),
    methods: {
        ...mapActions(['createShovel', 'updateShovel']),
        async onSubmit() {
            // there are parameters, so need to update the seller
            if (Object.keys(this.$route.query).length !== 0) {
                // if the image is already there, then we replace it
                let form = {
                    ...this.form,
                    image: this.form.image || this.form.imagePath
                };
                delete form.imagePath; // remove unnecessary

                // update birds, check errors
                this.error = !(await this.updateShovel(form));
            } else {
                // create seller, check errors
                this.error = !(await this.createShovel(this.form));
            }

            // redirect to admin page
            if (!this.error) this.$router.push({name: 'admin-shovels'})
        },
    },
}
</script>

<style scoped>

</style>
