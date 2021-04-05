import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';
import StoreComponent from "./views/Store";
import LoginPage from "./views/auth/LoginPage";
import Account from "./views/auth/Account";
import AdminArea from "./views/auth/adminArea/AdminArea";

import CreateBird from "./views/auth/adminArea/birds/CreateBird";
import Birds from "./views/auth/adminArea/birds/Birds";

import Sellers from "./views/auth/adminArea/sellers/Sellers";

import store from './store/index';
import Auth from "./views/auth/Auth";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    //     // TODO Сделать защиту от логина, если вошел.
    {
        path: '/auth/',
        component: Auth,
        // redirect authorized user to account
        beforeEnter(to, from, next) {
            console.log(store.getters.getAuth)
            if (!store.getters.getAuth) next(); // user is not logged in, redirect to to login or registration
            else next({name: 'account'}); // user is authorized, redirect to account
        },
        children: [
            {
                path: 'login',
                name: 'login',
                component: LoginPage,
                props: {
                    currentForm: 'login'
                },
            },
            {
                path: 'registration',
                name: 'registration',
                component: LoginPage,
                props: {
                    currentForm: 'registration'
                }
            }
        ]
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
    },
    {
        path: '/admin_area/',
        name: 'admin_area',
        component: AdminArea,
        children: [
            {
                path: 'birds',
                component: Birds,
                name: 'admin-birds',
                children: [
                    // {
                    //     path: 'show',
                    //     component:
                    // },
                    {
                        path: 'create',
                        component: CreateBird
                    },
                    {
                        path: 'update',
                        component: CreateBird,
                    }
                ]
            },
            {
                path: 'sellers',
                component: Sellers,
            },
            {
                path: 'birdhouses',
                component: Birds,
            },
            {
                path: 'instruments',
                component: Birds,
            }
        ]
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
