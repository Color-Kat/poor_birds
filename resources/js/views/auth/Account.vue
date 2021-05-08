<template>
    <div id="account">
        <!--    NOTIFICATION ERROR    -->
        <b-modal id="modal-notif-error" title="Произошла ошибка" hide-footer header-bg-variant="danger"
                 header-text-variant="light">
            <p class="my-2">Не удалось включить уведомления</p>
        </b-modal>
        <!--    NOTIFICATION ERROR    -->

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
import {mapGetters, mapActions} from "vuex";
import AccountField from '../../components/auth/account/AccountField';
import Balance from '../../components/Balance';
import UserAvatar from "../../components/auth/account/UserAvatar";
import {initPush} from "../../enable-push";

export default {
    name      : "Account",
    data      : () => ({}),
    components: {
        AccountField,
        Balance,
        // Field,
        UserAvatar
    },
    computed  : {
        ...mapGetters(['user', 'getUserData', 'getToken'])
    },
    methods   : {
        async enableNotifications() {
           // const res = await initPush();

            axios.get('/push',{headers: {"Authorization": `Bearer ${this.getToken}`}});

            // Notification.requestPermission().then((result) => {
            //     if (result === 'granted') {
            //         console.log(234);
            //         this.sendNotification();
            //     }
            // });
        },
        // sendNotification() {
        //     const notifTitle = 'Бедные птички покакали';
        //     const notifBody  = `By ColorKat`;
        //     const notifImg   = `https://itproger.com/img/notify.png`;
        //     const options    = {
        //         body: notifBody,
        //         icon: notifImg,
        //     };
        //     new Notification(notifTitle, options);
        //     // setTimeout(randomNotification, 30000);
        // }
    },
    mounted() {
        // console.log(this.user)
    }
}
</script>

<style scoped>

</style>
