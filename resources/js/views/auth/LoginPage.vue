<template>
    <div class="pt-5 form-wrapper d-flex justify-content-center align-items-center flex-wrap">
        <b-card :title="currentForm === 'login' ? 'Вход' : 'Регистрация'" style="border-radius: 24px"
                class="shadow col-12 col-sm-8 col-md-6 p-0">
            <div class="row">
                <div class="col">
                    <b-alert class="alert" :show="success" variant="success">
                        {{ currentForm === 'registration' ? 'Вы успешно зарегистрировались' : 'Вы успешно вошли' }}
                    </b-alert>
                    <b-alert class="alert" :show="error" variant="danger">{{ errorMessage }}</b-alert>
                    <div class="form">
                        <LoginForm @onMessage="onMessage" v-if="currentForm === 'login'" :form="form" class="w-100"/>
                        <RegistrationForm @onMessage="onMessage" v-else-if="currentForm === 'registration'" :form="form"/>

                        <router-link
                            class="change-form-link"
                            :to="{ name: currentForm === 'login' ? 'registration' : 'login' }"
                        >
                            {{ currentForm === 'login' ? 'Зарегистрироваться' : 'Войти' }}
                        </router-link>
                    </div>
                </div>

                <div class="col align-items-center justify-content-center d-none d-lg-flex">
                    <img class="w-100" src="/logo.png" alt="">
                </div>
            </div>
        </b-card>
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
    methods   : {
        toggleForm() {
            this.currentForm = this.currentForm === 'login' ? 'registration' : 'login';
        },
        onMessage(message) {
            if (message?.success) {
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
