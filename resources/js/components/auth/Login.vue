<template>
    <div id="login">

        <b-form @submit.prevent="login" @reset="onReset">
            <b-form-group
                id="input-group-1"
                label="Ваш email:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="Zacerish@bruh.abr"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="пароль:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    placeholder=""
                    required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Войти</b-button>
            <b-button type="reset" variant="danger">Сбросить</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    name   : "Login",
    props  : ['form'],
    methods: {
        async login() {


            // return promise<{success, error}>
            let result = await this.$store.dispatch('login', this.form);

            // return result for display it in the parent component
            this.$emit('onMessage', result);
        },
        onReset() {
            this.form.email = '';
            this.form.name  = '';
        }
    }

}
</script>

<style>

</style>
