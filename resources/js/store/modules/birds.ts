import Req from "../../modules/Req";
import ax from "axios";
import {IBird} from "../../modules/types/IBird";

// define axios to hide error. Axios from window.axios
// let axios = (window as any).axios;
const axios            = ax;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default {
    state    : {
        birds      : [],
        currentBird: null
    },
    getters  : {
        getBirds(state): IBird[] {
            return state.birds;
        },
        getBird(state) {
            const bird: IBird = state.currentBird;

            if (bird) {
                return {
                    image      : bird.image,
                    name       : ['Название', bird.name],
                    description: ['Описание', bird.description],
                    fertility  : ['Плодоносность', `${bird.fertility.toLocaleString()} яиц/час`, 'Сколько яиц птица несет за 1 час'],
                    care       : ['Бонус за заботу', `${bird.care.toLocaleString()}% к плодовитости на 1 час`, 'На сколько %' +
                    ' увеличивается плодоносность птицы, если нажать на кнопку "погладить" на странице "Мои птицы"'],
                    demand     : ['Спрос на яйца', `${bird.demand.toLocaleString()} яиц/час`, 'Сколько яиц за час можно продать'],
                    litter     : ['Кол-во помета', `${bird.litter.toLocaleString()} ед./час`, 'Сколько единиц помёта за час' +
                    ' производит птица'],
                    egg_price  : ['Цена одного яйца', `${bird.egg_price.toLocaleString()} руб`],
                    price      : ['Цена', `${bird.price.toLocaleString()}`],
                    sellers    : bird.sellers
                };
            } else return false
        }
    },
    actions  : {
        async fetchBirds(context) {

            let response = await new Req('get', 'api/birds').send<IBird[]>();

            if (response) context.commit('setBirds', response);
        },
        async createBird({commit}, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            let response = await new Req('post', 'api/birds')
                .conf({headers: {'Content-Type': 'multipart/form-data'}}) // set Content-Type to transfer image
                .send(formData);

            if (response) {
                commit('addBird', response);
                return true;
            } else return false;
        },
        async deleteBird({commit}, id) {
            let response: boolean = await new Req('delete', `api/birds/${id}`).send();
            if (response) commit('deleteBird', id);
        },
        async fetchBird({commit}, ids) {
            const bird_id   = ids.bird_id,
                  seller_id = ids.seller_id;
            // console.log(bird_id, seller_id)
            // need to find just bird
            if (!seller_id) {
                let response: IBird | boolean = await new Req('get', `api/birds/${bird_id}`).send<IBird>();

                if (response) commit('setCurrentBird', response);
                else commit('setCurrentBird', false);
            }
            // need to find bird of specific seller
            if (seller_id) {
                console.log('unnecessary');
                let response: IBird | boolean = await new Req('post', `api/sellers/getBird`)
                    .send<IBird>({
                        seller_id,
                        bird_id
                    });

                if (response) commit('setCurrentBird', response);
                else commit('setCurrentBird', false);
            }
        },
        async updateBird({
                             commit,
                             dispatch
                         }, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            formData.append('_method', 'PATCH'); // set PATCH method

            let response: boolean = await new Req('post', `api/birds/${form.id}`)
                .conf({headers: {'Content-Type': 'multipart/form-data'}})
                .send<boolean>(formData);

            if (response) {
                dispatch('fetchBirds');
                return response;
            } else return false;
        },
    },
    mutations: {
        setBirds(state, birds) {
            state.birds = birds;
        },
        addBird(state, bird) {
            state.birds.push(bird);
        },
        deleteBird(state, id) {
            state.birds.forEach((bird, i) => {
                if (bird.id === id)
                    state.birds.splice(i, 1);
            });
        },
        setCurrentBird(state, bird) {
            state.currentBird = bird;
        }
    }
}
