import Vue from 'vue';
import axios from 'axios';
import router from './router';
import store from './store'; // не пишем index, он сам подтянется

// ---bootstrap-vue--- //
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './app.scss';

window.axios = axios;
// axios.defaults.baseURL = 'http://127.0.0.1:8000';
window.axios.defaults.baseURL = 'https://poorbird.herokuapp.com';
window.axios.baseURL = 'https://poorbird.herokuapp.com';


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// ---bootstrap-vue--- //

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app', require('./App.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store
});
