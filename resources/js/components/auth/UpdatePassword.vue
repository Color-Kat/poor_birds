<template>
    <div id="update-password">
        <b-form @submit.prevent="updatePassword" v-if="!success">
            <!--      EMAIL      -->
            <b-form-group
                id="input-group-1"
                label="email:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <!--      PASSWORD      -->
            <b-form-group id="input-group-3" label="Придумайте новый пароль:" label-for="input-2">
                <b-form-input
                    id="input-3"
                    type="password"
                    v-model="form.password"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <!--      PASSWORD_CONFIRMATION      -->
            <b-form-group id="input-group-4" label="Повторите пароль:" label-for="input-2">
                <b-form-input
                    id="input-4"
                    type="password"
                    v-model="form.password_confirmation"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <div class="row position-relative">
                <div class="col-sm-6 col-lg-12">
                    <b-button type="submit" variant="primary" class="shadow-sm col-12 mb-2">
                        Изменить пароль
                    </b-button>
                </div>
            </div>
        </b-form>

        <b-alert v-else show variant="success">
            {{message}}
        </b-alert>
    </div>

</template>

<script>
import Req from "../../modules/Req";

export default {
    name: "UpdatePassword",
    data: ()=>({
        success: false,
        form: {
            email: '',
            password: '',
            password_confirmation: '',
        },
        message: ''
    }),
    methods: {
        async updatePassword() {
            // get token from get params
            let token = this.$route.query.token;

            // check does token exist
            if(!token.trim()) {
                this.$emit('onMessage', {error: 'Отсутствует токен!'});
                return false;
            }

            // send request to update password
            let res = await new Req('post', 'api/auth/update-password').send({
                ...this.form,
                passwordToken: token // add token
            });

            console.log(res);
        }
    }
}
</script>

<style scoped>

</style>
