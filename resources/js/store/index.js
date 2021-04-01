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
    state: {
        active_sideBar: true
    },
    actions: {
        // add initial state for application
        async init({dispatch}) {
            await dispatch('checkAuth'); // initial auth
            await dispatch('fetchUser'); // if (auth) - initial user
            await dispatch('fetchBirds'); // fetch birds
        },
        toggle_sideBar({commit, state}) {
            commit('toggle_active_sideBar', !state.active_sideBar);
        }
    },
    mutations: {
        toggle_active_sideBar(state, payload) {
            state.active_sideBar = payload;
        }
    }
});
