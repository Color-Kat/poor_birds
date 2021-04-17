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
                label="Название компании:"
                label-for="name"
            >
                <b-form-input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder='ООО "Деревенские петухи"'
                    required
                    minLength="3"
                ></b-form-input>
            </b-form-group>

            <!--      DESCRIPTION      -->
            <b-form-group id="input-description" label="Описание компании:" label-for="description">
                <b-form-input
                    id="description"
                    v-model="form.description"
                    placeholder='ООО "Деревенские петухи" - райское наслождение"'
                    required
                    minLength="7"
                ></b-form-input>
            </b-form-group>

            <!--      IMAGE      -->
            <b-form-group id="input-image" label="Логотип компании:" label-for="image">
                <b-form-file
                    accept="image/jpeg, image/png, image/gif"
                    v-model="form.image"
                    :state="Boolean(form.image)"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                ></b-form-file>
                <p class="mt-2">Selected file: <b>{{ form.image ? form.image.name : '' }}</b></p>
            </b-form-group>

            <!--            &lt;!&ndash;    DEMAND (спрос)    &ndash;&gt;-->
            <!--            <b-form-group-->
            <!--                id="input-demand"-->
            <!--                :label="`Спрос на яйца этой птицы:`"-->
            <!--                label-for="demand"-->
            <!--                description="Сколько яиц в среднем можно продать за час"-->
            <!--            >-->
            <!--                <b-form-input id="demand" v-model="form.demand" type="number" min="0" max="100000"></b-form-input>-->
            <!--            </b-form-group>-->

            <!--    discount (помёт)    -->
            <b-form-group
                id="input-discount"
                :label="`Бонус к цене %:`"
                label-for="discount"
                description="На сколько процентов дешевле/дороже продается птица относительно ее начальной стоимости"
            >
                <b-form-input
                    id="discount" v-model="form.discount" type="number" min="-100000" max="100000"
                ></b-form-input>
            </b-form-group>

            <!--    certificate    -->
            <b-form-group
                id="input-price"
                :label="`Сертификат:`"
                label-for="certificate"
                description="Сертификат, который выдает компания rаждой птице"
            >
                <b-form-select v-model="form.certificate_id"
                               :options="getCertificates.map(i => ({text: i.name, value: i.id}))"></b-form-select>
            </b-form-group>

            <!--    price    -->
            <b-form-group
                id="input-price"
                :label="`Цена контракта:`"
                label-for="price"
                description="Сколько нужно заплатить, чтобы получить доступ к продавцу"
            >
                <b-form-input id="price" v-model="form.price" type="number" min="0"></b-form-input>
            </b-form-group>

            <!--    bird_count    -->
            <b-form-group
                id="input-birds_count"
                :label="`Кол-во птиц в контракте:`"
                label-for="birds_count"
                description="Сколько нужно иметь птиц, чтобы получить доступ к продавцу"
            >
                <b-form-input id="birds_count" v-model="form.birds_count" type="number" min="0"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Огранизовать компанию</b-button>
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
                id            : this.$route.query.id || null,
                name          : this.$route.query.name || 'OOO "Райские петухи"',
                description   : this.$route.query.description || 'OOO "Райские петухи" - райское наслаждение от петухов',
                image         : null,
                imagePath     : this.$route.query.image || '',
                discount      : this.$route.query.discount || -20,
                price         : this.$route.query.price || 0,
                birds_count   : this.$route.query.birds_count || 0,
                certificate_id: this.$route.query.certificate_id || 0
            },
            error: false
        }
    },
    computed: mapGetters(['getCertificates']),
    methods: {
        ...mapActions(['createSeller', 'updateSeller', 'fetchCertificates']),
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
                this.error = !(await this.updateSeller(form));
            } else {
                // create seller, check errors
                this.error = !(await this.createSeller(this.form));
            }

            // redirect to admin page
            if (!this.error) this.$router.push({name: 'admin-sellers'})
        },
    },
    mounted() {
        this.fetchCertificates(); // get certificates for select
    }
}
</script>

<style scoped>

</style>
