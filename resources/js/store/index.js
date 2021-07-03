import Vue from 'vue'
import Vuex from 'vuex';

import birds from './modules/birds.ts';
import user from './modules/user.ts';
import sellers from './modules/sellers.ts';
import certificates from './modules/certificates.ts';
import shovels from './modules/shovels.ts';
import contracts from './modules/contracts.ts';
import currencies from './modules/currencies.ts';

// import Axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
    modules  : {
        birds,
        user,
        sellers,
        certificates,
        shovels,
        contracts,
        currencies
    },
    state    : {
        active_sideBar: false,
        isLoading     : false,

        isModalShow: false,
        modalTitle : '',
        modalText  : ''
    },
    getters  : {
        getIsLoading(state) {
            return state.isLoading;
        }
    },
    actions  : {
        // add initial state for application
        async init({
                       dispatch,
                       commit
                   }) {
            commit('toggleLoader', true);
            await dispatch('checkAuth'); // initial auth
            commit('toggleLoader', false);

            dispatch('checkFinal'); // check if user completed the game

            // show all tooltips if it is empty
            if (!localStorage.getItem('tooltip-eggs')) {
                localStorage.setItem('tooltip-my-birds', 'true');
                localStorage.setItem('tooltip-eggs', 'true');
                localStorage.setItem('tooltip-shovel', 'true');
            }
        },
        toggle_sideBar({
                           commit,
                           state
                       }, payload = null) {
            if (payload !== null) commit('toggle_active_sideBar', payload);
            else commit('toggle_active_sideBar', !state.active_sideBar);
        },
        checkFinal({
                       commit,
                       getters
                   }) {
            let other_data = JSON.parse(getters.user?.other_data);
            let shown = localStorage.getItem('finalRead') ?? '0'; // check does it need to show
            if (other_data && other_data.final) { // user reached final
                if (shown === '0') { // user has not seen this message yet
                    localStorage.setItem('finalRead', '1'); // // user has already seen this message
                    commit('showModal', {
                        title: 'Смерть неизбежна!',
                        text : '<p>Сегодня к вам постучались в дверь. Это был густинианский амон. ' +
                            'Вас повязали, посадили в машину и увезли в неизвестном направлении. ' +
                            'Вы ехали примерно 4 часа по кочкам и ухабам, затем вас высадили и ' +
                            'вы увидели всех своих знакомых. Начиная от Ивана Васильевича и ' +
                            'заканчивая Аркадием Назаряниным. Вы как раз стояли около него. ' +
                            'Он вам сказал: "Это Густов узнал, что это вы сражались с ангелом... ' +
                            'Но как он узнал?? Нас же теперь закопают!" - он заплакал. </p>' +
                            '<br><p>Вы вспомнили, что слышали жужжание около церкви. ЭТО ЖЕ ОРЕЛ ГУСТОВА! ' +
                            'Это он следил за вами! Это он хотел вас посадить! Вы всё поняли, ' +
                            'но смерти не миновать... </p>' +
                            '<br><p> Вас всех по одному стали звать к карьеру, а затем закидывать в глубокую яму и ' +
                            'заживо закапывать. Это было ужасно. Подошла очередь Назарянина, вы обнялись и попрощались. ' +
                            'Следующий - вы... Вот вас ведут к яме, пот сходит с вашего лба. ' +
                            'Вас толкают в яму, во время падения проносится вся ваша жизнь, птицы, Густов... ' +
                            'Вот вы уже лежите и на вас сыпется песок... Вы накрыли лицо руками... И вас закопали </p>' +
                            '<br><p> Через 2 минуты вы начали задыхаться. </p>' +
                            '<br><p> Но вот вы слышите, как шуршит песок! Вы начали чувствовать воздух! ' +
                            'Вы открыли глаза, а перед вами ваши птицы! Это они вас раскопали! Ура, вы будете жить! </p>' +
                            '<br><p> Теперь вы стали с птицами откапывать остальных. Вот вы достали Назарянина, он был ' +
                            'весь в слезах. Тётя Зина, дядя Коля. Но... Но Иван Васильевич не дышит... </p>' +
                            'Он умер... ' +
                            '<br><p> Вы вернулись домой, но как теперь жить, вас будет преследовать Густов, ' +
                            'но вы не можете бросить совю ферму! Выход есть: взятки! ОЧЕНЬ МНОГО ВЗЯТОК. </p>' +
                            '<br><p style="color: orange">У вас открылась новая вкладка Взятки!</p>'
                    });
                }
            }
        }
    },
    mutations: {
        toggle_active_sideBar(state, payload) {
            state.active_sideBar = payload;
        },
        toggleLoader(state, payload) {
            state.isLoading = payload;
        },
        showModal(state, payload) {
            state.isModalShow = true;
            state.modalTitle  = payload.title;
            state.modalText   = payload.text;
        },
        deleteModal(state) {
            state.isModalShow = false;
            state.modalTitle  = '';
            state.modalText   = '';
        }
    }
});
