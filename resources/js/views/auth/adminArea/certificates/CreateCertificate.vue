<template>
    <div class="p-3">
        <b-form
            @submit.prevent="onSubmit"
        >
            <b-alert variant="danger" :show="error">Произошла какая-то ошибка</b-alert>

            <!--      NAME      -->
            <b-form-group
                id="input-name"
                label="Название сертификата:"
                label-for="name"
            >
                <b-form-input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder=""
                    required
                    minLength="3"
                ></b-form-input>
            </b-form-group>

            <!--    DEMAND_BONUS (спрос)    -->
            <b-form-group
                id="input-demand"
                :label="`Бонус к спросу на яйца:`"
                label-for="demand"
                description='На сколько % изменится характеристика "спрос" у птицы с этим сертификатом'
            >
                <b-form-input id="demand" v-model="form.demand_bonus" type="number" min="-100"></b-form-input>
            </b-form-group>

            <!--    fertility_bonus (плодоносность)    -->
            <b-form-group
                id="input-fertility"
                :label="`Бонуск к плодоносности:`"
                label-for="fertility"
                description='На сколько % изменится характеристика "плодоносность" у птицы с этим сертификатом'
            >
                <b-form-input
                    id="fertility" v-model="form.fertility_bonus" type="number" min="-100"
                ></b-form-input>
            </b-form-group>

            <!--    care_bonus (забота)    -->
            <b-form-group
                id="input-care"
                :label="`Бонус к заботе:`"
                label-for="care"
                description='На сколько % изменится характеристика "бонус за заботу" у птицы с этим сертификатом'
            >
                <b-form-input id="care" v-model="form.care_bonus" type="number" min="-100"></b-form-input>
            </b-form-group>

            <!--    litter_bonus (помёт)    -->
            <b-form-group
                id="input-litter"
                :label="`Бонус к кол-ву помета:`"
                label-for="litter"
                description='На сколько % изменится характеристика "помет" у птицы с этим сертификатом'
            >
                <b-form-input id="litter" v-model="form.litter_bonus" type="number" min="-100"></b-form-input>
            </b-form-group>

            <!--    price_bonus    -->
            <b-form-group
                id="input-price-bonus"
                :label="`Бонус к цене яиц:`"
                label-for="price-bonus"
                description='На сколько % изменится характеристика "цена яиц" у птицы с этим сертификатом'
            >
                <b-form-input id="price-bonus" v-model="form.price_bonus" type="number" min="-100"></b-form-input>
            </b-form-group>

            <!--    price    -->
            <b-form-group
                id="input-price"
                :label="`Цена сертификата:`"
                label-for="price"
            >
                <b-form-input id="price" v-model="form.price" type="number" min="0"></b-form-input>
            </b-form-group>

            <!--    minimum_birds_price    -->
<!--            <b-form-group-->
<!--                id="input-minimum_birds_price"-->
<!--                :label="`Цена птиц:`"-->
<!--                label-for="minimum_birds_price"-->
<!--                description="Минимальная цена птиц, на которых будет действовать сертификат"-->
<!--            >-->
<!--                <b-form-input-->
<!--                    id="minimum_birds_price" v-model="form.minimum_birds_price" type="number" min="0"-->
<!--                ></b-form-input>-->
<!--            </b-form-group>-->

            <b-form-group
                id="input-grade"
                :label="`Оценка сертификата:`"
                label-for="grade"
                description="То на сколько сертификат крутой :) Определяет иконку сертификата"
            >
                <b-form-input
                    id="grade" v-model="form.grade" type="number" min="0" max="10"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">
                {{
                    Object.keys($route.query).length == 0 ?
                        'Зарегистрировать' :
                        'Обновить'
                }}
            </b-button>
            <!--            <b-button type="reset" variant="danger">Сбросить</b-button>-->
        </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "CreateCertificate",
    data() {
        return {
            form : {
                id                 : this.$route.query.id || null,
                name               : this.$route.query.name || 'Сертификат',
                demand_bonus       : this.$route.query.demand_bonus || 0,
                fertility_bonus    : this.$route.query.fertility_bonus || 0,
                care_bonus         : this.$route.query.care_bonus || 0,
                litter_bonus       : this.$route.query.litter_bonus || 0,
                minimum_birds_price: 0,
                price_bonus        : this.$route.query.price_bonus || 0,
                grade              : this.$route.query.grade || 0,
                price              : this.$route.query.price || 100,
            },
            error: false
        }
    },
    computed: {
        ...mapGetters(['getCertificates'])
    },
    methods : {
        ...mapActions(['createCertificate', 'updateCertificate']),

        async onSubmit() {
            // there are parameters, so need to update the certificate
            if (Object.keys(this.$route.query).length !== 0)
                this.error = !(await this.updateCertificate(this.form));
            else
                // check errors
                this.error = !(await this.createCertificate(this.form));

            console.log(this.error);
            // redirect to admin page
            if (!this.error) await this.$router.push({name: 'admin-certificates'})
        },

    },
    mounted() {
        console.log(this.$route.query)
        // console.log(this.form)
    }
}
</script>

<style scoped>

</style>
