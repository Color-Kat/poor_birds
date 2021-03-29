import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';
import StoreComponent from "./views/Store";
import LoginPage from "./views/auth/LoginPage";
import Account from "./views/auth/Account";
import AdminArea from "./views/auth/AdminArea";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        props: {
            currentForm: 'login'
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: LoginPage,
        props: {
            currentForm: 'registration'
        }
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
    },
    {
        path: '/admin_area',
        name: 'admin_area',
        component: AdminArea,
    },
    {
        path: '/store',
        component: StoreComponent,
    }
];
export default new VueRouter({
    mode: 'history',
    routes
});
