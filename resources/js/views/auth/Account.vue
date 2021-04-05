<template>
    <div id="account">

        <!--    NOT LOGGED IN    -->
        <b-card v-if="!user" class="not-logged-in mt-5">
            <h1>Войдите в свой аккаунт ;)</h1>
            <b-button variant="primary" :to="{name: 'login'}">Войти?</b-button>
        </b-card>
        <!--    END NOT LOGGED IN    -->

        <!--    PROFILE    -->
        <b-card v-else>
            <b-list-group>
                <UserAvatar :balance="true"/>

                <!--                <b-list-group-item class="d-flex align-items-center">-->
                <!--                </b-list-group-item>-->

                <AccountField v-for="field in getUserData" :field="field" :key="field.name"/>

            </b-list-group>
        </b-card>
    </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import AccountField from '../../components/auth/account/AccountField';
import Balance from '../../components/Balance';
import UserAvatar from "../../components/auth/account/UserAvatar";

export default {
    name      : "Account",
    components: {
        AccountField,
        Balance,
        UserAvatar
    },
    computed  : {
        ...mapGetters(['user', 'getUserData'])
    },
    mounted() {
        // console.log(this.user)
    }
}
</script>

<style scoped>

</style>
