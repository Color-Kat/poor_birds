import Vue from 'vue'
import Vuex from 'vuex';

import birds from './modules/birds.ts';
import user from './modules/user.js';
import sellers from './modules/sellers.js';
import certificates from './modules/certificates.js';
import shovels from './modules/shovels.ts';
import contracts from './modules/contracts.js';
import currencies from './modules/currencies.js';

// import Axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        birds,
        user,
        sellers,
        certificates,
        shovels,
        contracts,
        currencies
    },
    state: {
        active_sideBar: false,
        isLoading: false
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading;
        }
    },
    actions: {
        // add initial state for application
        async init({dispatch, commit}) {
            commit('toggleLoader', true);
            await dispatch('checkAuth'); // initial auth
            commit('toggleLoader', false);

            // show all tooltips if it is empty
            if (!localStorage.getItem('tooltip-eggs')) {
                localStorage.setItem('tooltip-my-birds', 'true');
                localStorage.setItem('tooltip-eggs', 'true');
                localStorage.setItem('tooltip-shovel', 'true');
            }
        },
        toggle_sideBar({commit, state}, payload = null) {
            if( payload !== null ) commit('toggle_active_sideBar', payload);
            else commit('toggle_active_sideBar', !state.active_sideBar);
        }
    },
    mutations: {
        toggle_active_sideBar(state, payload) {
            state.active_sideBar = payload;
        },
        toggleLoader(state, payload) {
            state.isLoading = payload;
        }
    }
});
