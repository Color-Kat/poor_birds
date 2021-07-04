import Vue from 'vue';
import axios from 'axios';
import router from './router';
import store from './store';

import './app.scss';

/* nprogress - progress bar   */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// import some from './modules/request';

// console.log(some);

// any properties in window
declare const window: any;

/* ----- configure axios for server ----- */
// window.axios = axios;
// axios.defaults.baseURL = 'http://127.0.0.1:8000';
// window.axios = axios.create({ baseURL: 'https://poorbirds.rf.gd', timeout: 100000, });
// window.axios = axios.create({ baseURL: 'https://s367343.smrtp.ru', timeout: 100000, });
window.axios = axios.create({ baseURL: 'https://poorbirds.tk', timeout: 100000, });
/* ----- end configure ----- */

/* ------- NPROGRESS -------- */
NProgress.configure({ easing: 'ease', speed: 500 });
// before a request is made start the nprogress
window.axios.interceptors.request.use(config => {
    NProgress.start();
    return config;
});
// before a response is returned stop nprogress
window.axios.interceptors.response.use(response => {
    NProgress.done();
    return response;
});
NProgress.configure({ showSpinner: false }); // disable spinner
/* ------- END NPROGRESS -------- */


/* --------------------------------------- */
/* ------- REGISTER SERVICE-WORKER ------- */
/* --------------------------------------- */
import {initSW} from "./enable-push";
window.addEventListener("load", () => {
    initSW();
});
/* --------------------------------------- */

/* bootstrap-vue */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component('app', require('./App.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store
});
