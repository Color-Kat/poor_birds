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

                <b-alert show variant="info" class="d-flex justify-content-between">
                    <span>Включите уведомления, чтобы получать сообщения о том, что птицы снесли яйца</span>
                    <b-button
                        size="sm"
                        variant="light"
                        @click="enableNotifications"
                    >Включить
                    </b-button>
                </b-alert>

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
        // Field,
        UserAvatar
    },
    computed  : {
        ...mapGetters(['user', 'getUserData'])
    },
    methods   : {
        enableNotifications() {
            Notification.requestPermission().then((result) => {
                if (result === 'granted') {
                    console.log(234);
                    this.sendNotification();
                }
            });
        },
        sendNotification() {
            const notifTitle = 'Бедные птички покакали';
            const notifBody  = `By ColorKat`;
            const notifImg   = `https://itproger.com/img/notify.png`;
            const options    = {
                body: notifBody,
                icon: notifImg,
            };
            new Notification(notifTitle, options);
            // setTimeout(randomNotification, 30000);
        }
    },
    mounted() {
        // console.log(this.user)
    }
}
</script>

<style scoped>

</style>
