import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';

import store from './store/index';

/* login */
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

/* shovels */
import Shovels_admin from "./views/auth/adminArea/shovels/Shovels";
import CreateShovel from "./views/auth/adminArea/shovels/CreateShovel";
import Shovels from "./views/shovels/Shovels";
import ShovelPage from "./views/shovels/ShovelPage";

import Auth from "./views/auth/Auth";

/* certificates */
import CreateCertificate from "./views/auth/adminArea/certificates/CreateCertificate";
import CertificatePage from "./views/certificates/CertificatePage";
import Certificates from "./views/certificates/Certificates";

/* my birds */
import MyBirdsPage from "./views/auth/MyBirdsPage";
/* my eggs */
import EggsPage from "./views/auth/EggsPage";

/* contracts */
import Contracts from "./views/contracts/Contracts";
import ContractPage from "./views/contracts/ContractPage";

/* mine */
import Mine from "./views/auth/Mine";

/* PAYMENT */
import PayForm from "./views/bank/PayForm";
import Success from "./views/bank/Success";
import Failed from "./views/bank/Failed";
import Bank from "./views/bank/Bank";

/* stores */
import Stores from "./components/Stores";
import Bribe from "./views/auth/Bribe";

import Page404 from './components/404';


Vue.use(VueRouter);

const routes = [
    {
        path     : '/',
        name     : 'index',
        meta     : 'Главная',
        component: Index
    },
    {
        path     : '/auth/',
        component: Auth,
        meta     : 'Авторизация',
        // redirect authorized user to account
        async beforeEnter(to, from, next) {
            if (!await store.dispatch('checkAuth')) next(); // user is not logged in, redirect to to login or registration
            else next({name: 'account'}); // user is authorized, redirect to account
        },
        children: [
            {
                path     : 'login',
                name     : 'login',
                component: LoginPage,
                meta     : 'Вход',
                props    : {
                    currentForm: 'login'
                },
            },
            {
                path     : 'registration',
                name     : 'registration',
                component: LoginPage,
                meta     : 'Регистрация',
                props    : {
                    currentForm: 'registration'
                }
            }
        ]
    },
    /* ACCOUNT */
    {
        path     : '/account',
        name     : 'account',
        meta     : 'Профиль',
        component: Account,
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'index'});
        },
    },

    /* MY BIRDS PAGE */
    {
        path     : '/account/my_birds',
        name     : 'my_birds',
        meta     : 'Мои птицы',
        component: MyBirdsPage,
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'index'});
        },
    },

    /* ---------- My EGGS ----------------- */
    {
        path     : '/account/eggs',
        component: EggsPage,
        name     : 'eggs',
        meta     : 'Яйца',
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'index'});
        },
    },

    /* ---------- ADMIN AREA ------------- */
    {
        path     : '/admin_area/',
        name     : 'admin_area',
        meta     : 'Админ панель',
        component: AdminArea,
        async beforeEnter(to, from, next) {
            let auth = await store.dispatch('checkAuth');
            if (!auth) next({name: 'index'});
            else if (store.getters.getUserRole === 1) next();
            else next({name: 'index'});
        },
        children: [
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
                children : [{
                    path     : 'create',
                    component: CreateCertificate,
                    props    : true
                }]
            },
            {
                path     : 'shovels',
                component: Shovels_admin,
                name     : 'admin-shovels',
                children : [{
                    path     : 'create',
                    component: CreateShovel,
                    props    : true
                }]
            },
        ]
    },
    /* ------------ BIRDS ------------- */
    {
        path     : '/birds',
        name     : 'birds',
        component: Birds,
        meta     : 'Птицы'
    },
    {
        // just bird page
        path     : '/birds/:bird_id',
        component: BirdPage,
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'login'});
        },
    },

    /* ---------- SELLERS -----------*/
    {
        path     : '/sellers',
        name     : 'sellers',
        component: Sellers,
        meta     : 'Продавцы',
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'account'});
        },
    },
    {
        path     : '/sellers/:id',
        component: SellerPage,
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'account'});
        },
    },

    /* ---------- CERTIFICATE ----------*/
    {
        path     : '/certificates',
        name     : 'certificates',
        meta     : 'Сертификаты',
        component: Certificates,
    },
    {
        path     : '/certificates/:id',
        component: CertificatePage,
        meta     : 'Сертификат',
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'account'});
        },
    },

    /* ---------- SHOVELS -----------*/
    {
        path     : '/shovels',
        name     : 'shovels',
        meta     : 'Лопаты',
        component: Shovels,
    },
    {
        path     : '/shovels/:id',
        component: ShovelPage,
        meta     : 'Купить лопату',
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'login'});
        },
    },

    /* ---------- CONTRACTS -----------*/
    {
        path     : '/contracts',
        name     : 'contracts',
        meta     : 'Контракты',
        component: Contracts,
    },
    {
        path     : '/contracts/:id',
        component: ContractPage,
        meta     : 'Купить контракт',
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'login'});
        },
    },

    /* ---------- MINE -----------*/
    {
        path     : '/mine',
        name     : 'mine',
        component: Mine,
        meta     : 'Навозная шахта',
        // only authorized users
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'login'});
        },
    },

    /* ---------- BANK -----------*/
    {
        path     : '/bank',
        name     : 'bank',
        component: Bank,
        meta     : 'Банк Густограда',
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'login'});
        },
    },
    /* ---------- PAYMENT -----------*/
    {
        path     : '/payment',
        name     : 'payment',
        component: PayForm,
        meta     : 'Оплата',
        async beforeEnter(to, from, next) {
            if (await store.dispatch('checkAuth')) next();
            else next({name: 'login'});
        },
    },
    {
        path     : '/payment/success',
        name     : 'payment_success',
        meta     : 'Успешная оплата',
        component: Success,
    },
    {
        path     : '/payment/failed',
        name     : 'payment_failed',
        meta     : 'Ошибка при оплате',
        component: Failed,
    },

    /* ------ STORE -------- */
    {
        path     : '/stores',
        name     : 'stores',
        meta     : 'Магазины',
        component: Stores,
    },

    /* ------ BRIBE -------- */
    {
        path     : '/account/bribe',
        name     : 'bribe',
        component: Bribe,
        meta     : 'Взятки',
        async beforeEnter(to, from, next) {
            // user is auth
            if (await store.dispatch('checkAuth')) {
                await store.dispatch('fetchUser'); // wait for the user to load

                if(store.getters.getIsFinal && !store.getters.getRepaid) next();
                else next('');
            }
            else next('');
        },
    },

    /* 404 */
    { path: "*", component: Page404 }
];

const router =  new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

// close sidebar on navigate
router.afterEach((to, from) => {
    store.commit('toggle_active_sideBar', false);
});

router.beforeEach((to, from, next) => {
    // change document title to title in route.meta
    document.title = Object.keys(to.meta).length != 0  ? `Бедные птички | ${to.meta}` : 'Бедные птички';
    next();
})

export default router;
