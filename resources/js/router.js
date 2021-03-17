import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/Index';
import StoreComponent from "./views/Store";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/store',
        component: StoreComponent,
        render(){
            console.log(123)
        }
    }
];
export default new VueRouter({
    mode: 'history',
    routes
});
