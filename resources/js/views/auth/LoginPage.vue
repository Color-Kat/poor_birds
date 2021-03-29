<template>
    <div class="pt-5 form-wrapper d-flex justify-content-center align-items-center flex-wrap">
        <b-alert class="alert" :show="success" variant="success">Вы успешно зарегестрировались</b-alert>
        <b-alert class="alert" :show="error" variant="danger">{{ errorMessage }}</b-alert>

        <div class="form col-md-4">
            <LoginForm @onMessage="onMessage" v-if="currentForm === 'login'" :form="form"/>
            <RegistrationForm @onMessage="onMessage" v-else-if="currentForm === 'registration'" :form="form"/>

            <router-link
                class="change-form-link"
                :to="{ name: currentForm === 'login' ? 'registration' : 'login' }"
            >
                {{ currentForm === 'login' ? 'Зарегестрироваться' : 'Войти' }}
            </router-link>
        </div>
    </div>
</template>

<script>
import LoginForm from "../../components/auth/Login";
import RegistrationForm from "../../components/auth/Registration";

export default {
    name      : "loginPage",
    props     : ['currentForm'],
    components: {
        LoginForm,
        RegistrationForm
    },
    data      : () => ({
        form        : {
            email                : '',
            name                 : '',
            password             : '',
            password_confirmation: ''
        },
        success     : false,
        error       : false,
        errorMessage: ''
    }),
    methods: {
        toggleForm() {
            this.currentForm = this.currentForm === 'login' ? 'registration' : 'login';
        },
        onMessage(message) {
            if (message.success) {
                this.success = true;
                this.error   = false;

                // check current form
                // redirect to login page or account
                this.$router.push({name: this.currentForm === 'registration' ? 'login' : 'account'});
            } else if (message.error) {
                this.error   = true;
                this.success = false;

                this.errorMessage = message.error;
            }
        }
    }
}
</script>

<style scoped>
.change-form-link {
    display: flex;
    position: relative;
    margin-top: 10px !important;
}

.alert {
    position: relative;

}
</style>
