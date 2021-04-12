import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';

import LoginPage from "./views/auth/LoginPage";
import Account from "./views/auth/Account";
import AdminArea from "./views/auth/adminArea/AdminArea";

/* birds */
import Birds from "./views/birds/Birds"; // birds list
import BirdPage from "./views/birds/BirdPage"; // bird page
import Birds_admin from "./views/auth/adminArea/birds/Birds"; // birds list on admin
import CreateBird from "./views/auth/adminArea/birds/CreateBird"; // create bird on admin

/* sellers */
import Sellers from "./views/sellers/Sellers";
import SellerPage from "./views/sellers/SellerPage";
import Sellers_admin from "./views/auth/adminArea/sellers/Sellers";
import CreateSeller from "./views/auth/adminArea/sellers/CreateSeller";

/* certificates */
import Certificates_admin from "./views/auth/adminArea/certificates/Certificates";

import Auth from "./views/auth/Auth";

import store from './store/index';

Vue.use(VueRouter);

const routes = [
    {
        path     : '/',
        name     : 'index',
        component: Index
    },
    //     // TODO Сделать защиту от логина, если вошел.
    {
        path     : '/auth/',
        component: Auth,
        // redirect authorized user to account
        beforeEnter(to, from, next) {
            console.log(store.getters.getAuth)
            if (!store.getters.getAuth) next(); // user is not logged in, redirect to to login or registration
            else next({name: 'account'}); // user is authorized, redirect to account
        },
        children: [
            {
                path     : 'login',
                name     : 'login',
                component: LoginPage,
                props    : {
                    currentForm: 'login'
                },
            },
            {
                path     : 'registration',
                name     : 'registration',
                component: LoginPage,
                props    : {
                    currentForm: 'registration'
                }
            }
        ]
    },
    {
        path     : '/account',
        name     : 'account',
        component: Account,
    },
    {
        path     : '/admin_area/',
        name     : 'admin_area',
        component: AdminArea,
        children : [
            {
                path     : 'birds',
                component: Birds_admin,
                name     : 'admin-birds',
                children : [{
                    path     : 'create',
                    component: CreateBird,
                    props    : true
                }]
            },
            {
                path     : 'sellers',
                component: Sellers_admin,
                name     : 'admin-sellers',
                children : [{
                        path     : 'create',
                        component: CreateSeller,
                        props    : true
                    }]
            },
            {
                path     : 'certificates',
                component: Certificates_admin,
                name     : 'admin-certificates',
                // children : [{
                //     path     : 'create',
                //     component: CreateCertificate,
                //     props    : true
                // }]
            },
            {
                path     : 'instruments',
                component: Birds_admin,
            }
        ]
    },
    /* ------------ BIRDS ------------- */
    {
        path     : '/birds',
        name     : 'birds',
        component: Birds,
    },
    {
        // just bird page
        path     : '/birds/:bird_id',
        component: BirdPage
    },
    {
        // page with seller's bird
        path     : '/sellers/:seller_id/birds/:bird_id',
        component: BirdPage
    },

    /* ---------- SELLERS -----------*/
    {
        path     : '/sellers',
        name     : 'sellers',
        component: Sellers,
    },
    {
        path     : '/sellers/:id',
        component: SellerPage,
    },

    /* ---------- CERTIFICATE ----------*/
    // {
    //     path     : '/certificates',
    //     name     : 'certificates',
    //     component: Certificates,
    // },
    // {
    //     path     : '/certificates/:id',
    //     component: CertificatePage,
    // },
];
export default new VueRouter({
    mode: 'history',
    routes
});
