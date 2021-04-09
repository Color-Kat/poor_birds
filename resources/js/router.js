import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';
import Shops from "./views/Shops";
import LoginPage from "./views/auth/LoginPage";
import Account from "./views/auth/Account";
import AdminArea from "./views/auth/adminArea/AdminArea";

import CreateBird from "./views/auth/adminArea/birds/CreateBird";
import Birds from "./views/auth/adminArea/birds/Birds";
import BirdPage from "./views/BirdPage";

import Sellers from "./views/auth/adminArea/sellers/Sellers";
import SellerPage from "./views/SellerPage";

import store from './store/index';
import Auth from "./views/auth/Auth";
import CreateSeller from "./views/auth/adminArea/sellers/CreateSeller";

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
                    {
                        path: 'create',
                        component: CreateBird,
                        props: true
                    },
                    // {
                    //     path: 'update/:id',
                    //     component: CreateBird,
                    //     props: true
                    // },
                ]
            },
            {
                path: 'sellers',
                component: Sellers,
                name: 'admin-sellers',
                children: [
                    {
                        path: 'create',
                        component: CreateSeller,
                        props: true
                    }
                ]
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
        path: '/birds/:id',
        component: BirdPage
    },
    {
        path: '/sellers/:id',
        component: SellerPage
    },
    {
        path: '/shops',
        name: 'shops',
        component: Shops,
    }
];
export default new VueRouter({
    mode: 'history',
    routes
});
