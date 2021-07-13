<template>
    <div id="reset-password">
        <b-form @submit.prevent="reset" v-if="!success">
            <b-form-group
                id="input-group-1"
                label="Ваш email:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="email"
                    type="email"
                    required
                    class="shadow"
                ></b-form-input>
            </b-form-group>

            <div class="row position-relative">
                <div class="col-sm-6 col-lg-12">
                    <b-button type="submit" variant="primary" class="shadow-sm col-12 mb-2">Отправить</b-button>
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
    name   : "ResetPassword",
    data   : () => ({
        email: '',
        success: false,
        message: ''
    }),
    methods: {
        async reset() {

            // send request to send email
            let res = await new Req('post','api/auth/password-reset').catchMode().send({
                email: this.email.trim()
            });

            console.log(!res?.response, !res?.response?.data)
            if(res && res.response && !res.response.data?.success)
                // email is not sent
                // 404 error - process returned data (err message)
                this.$emit('onMessage', {error: res.response.data.message});
            else {
                // email is sent
                this.success = true;
                this.message = res.message;
                this.$emit('onMessage', null);
            }
        }
    }
}
</script>

<style scoped>

</style>
