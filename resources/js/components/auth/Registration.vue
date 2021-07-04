<template>
    <div id="registration">

        <b-form @submit.prevent="register">
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
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Ник:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    placeholder="Zacerish"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Придумайте пароль:" label-for="input-2">
                <b-form-input
                    id="input-3"
                    type="password"
                    v-model="form.password"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Повторите пароль:" label-for="input-2">
                <b-form-input
                    id="input-4"
                    type="password"
                    v-model="form.password_confirmation"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" class="shadow-sm w-100">Зарегистрироваться</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    name   : "Login",
    props  : ['form'],
    methods: {
        async register() {
            // return promise<{success, error}>
            let result = await this.$store.dispatch('registration', this.form);
            // return result for display it in the parent component
            this.$emit('onMessage', result);
        }
    }

}
</script>

<style scoped>

</style>
