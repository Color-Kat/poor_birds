import Vue from 'vue'
import Vuex from 'vuex';
import birds from './modules/birds.js';
import user from './modules/user.js';

// import Axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        birds,
        user
    },

    // state  : {
    //     birds: []
    // },
    // getters: {
    //     getBirds(state) {
    //         return state.birds;
    //     }
    // },
    actions: {
        // add initial state for application
        async init({dispatch}) {
            await dispatch('checkAuth'); // initial auth
            await dispatch('fetchUser'); // if (auth) - initial user
        }
    },
    // mutations: {
    //     setBirds(state, birds) {
    //         return state.birds = birds;
    //     }
    // }
});
