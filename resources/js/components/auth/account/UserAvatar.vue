<template>
    <div>
        <div v-if="balance" class="d-flex align-items-center justify-content-between mb-3">
            <UserAvatar />
            <Balance />
        </div>

        <div class="user-avatar" v-else>
<!--            <b-avatar variant="primary" class="mr-3" src="https://placekitten.com/300/300"></b-avatar>-->
            <img height="50px" class="mr-3 rounded-pill" src="https://placekitten.com/300/300" :alt="getUserName"></img>
            <span class="mr-auto">{{getUserName}}</span>
        </div>
    </div>

</template>

<script>
import Balance from "../../Balance";
import {mapGetters} from "vuex";

export default {
    name: "UserAvatar",
    props: ['name', 'balance'],
    computed: {
        ...mapGetters(['getUserName'])
    },
    components: {
        Balance
    }
}
</script>

<style scoped>

</style>
