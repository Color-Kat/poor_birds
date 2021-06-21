import {IShovel} from "../../modules/types/IShovel";
import Req from "../../modules/Req";

export default {
    state    : {
        shovels      : [],
        currentShovel: null
    },
    getters  : {
        getShovels(state): IShovel[] {
            return state.shovels;
        },
        getShovel(state) {
            const shovel: IShovel = state.currentShovel;

            if (shovel) {
                return {
                    // description: ['Описание', shovel.description],
                    id        : shovel.id,
                    image     : shovel.image,
                    name      : ['Название', shovel.name],
                    efficiency: ['Эффективность', `${shovel.efficiency} ед.помёта`],
                    price     : ['Цена лопаты', `${shovel.price ? shovel.price + '₽' : shovel.donate_price + ' густинианов'} `],
                    isDonate  : shovel.price ? false : true,
                };
            } else return false
        }
    },
    actions  : {
        async fetchShovels({commit}) {
            let response = await new Req('get', '/api/shovels').send<IShovel[]>();
            console.log(response);
            if (response) commit('setShovels', response);

            // axios.get('/api/shovels')
            //     .then(response => {
            //         context.commit('setShovels', response.data);
            //     }).catch(err => {
            //     console.log('ERROR: ' + err);
            // })
        },
        async createShovel({commit}, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            let response: IShovel | boolean = await new Req('post', 'api/shovels')
                .conf({headers: {'Content-Type': 'multipart/form-data'}}) // send header to upload image
                .send<IShovel>(formData); // send request

            if (response) commit('addShovel', response); // add new shovel to lost
            console.log(response);
            return !!response; // return is success

            // set header to upload image file
            // return axios.post(
            //     'api/shovels',
            //     formData,
            //     {headers: {'Content-Type': 'multipart/form-data'}}
            // )
            //     .then(response => {
            //         console.log(response)
            //         if (response.status === 201) {
            //             commit('addShovel', response.data);
            //
            //             return true;
            //         } else return false
            //     })
            //     .catch((error) => {
            //         console.log(error.response);
            //         return false
            //     });
        },
        async deleteShovel({commit}, id) {
            let response: boolean = await new Req('delete', `api/shovels/${id}`).send();
            console.log(response);

            if(response) commit('deleteShovel', id);

            // axios.delete(
            //     `api/shovels/${id}`
            // )
            //     .then(response => {
            //         // successfully deleting
            //         if (response) {
            //             commit('deleteShovel', id)
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
        /**
         * send request to get
         * */
        async fetchShovel({commit}, id) {
            let response: IShovel | boolean = await new Req('get', `api/shovels/${id}`).send<IShovel>();
            commit('setCurrentShovel', response);

            // need to find just shovel
            // return axios.get(
            //     `api/shovels/${id}`
            // )
            //     .then(response => {
            //         if (response.data.status) {
            //             commit('setCurrentShovel', response.data.messages);
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
        async updateShovel({
                         commit,
                         dispatch
                     }, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            formData.append('_method', 'PATCH'); // set PATCH method

            let response: boolean = await new Req('post', `api/shovels/${form.id}`)
                .conf({headers: {'Content-Type': 'multipart/form-data'}})
                .send(formData);

            dispatch('fetchShovels');
            return response;

            // return axios.post(
            //     `api/shovels/${form.id}`,
            //     formData,
            //     {headers: {'Content-Type': 'multipart/form-data'}}
            // )
            //     .then(response => {
            //         dispatch('fetchShovels');
            //         return response;
            //     })
            //     .catch((error) => {
            //         console.log(error.response);
            //         return false;
            //     });
        },
    },
    mutations: {
        setShovels(state, shovels) {
            state.shovels = shovels;
        },
        addShovel(state, shovel) {
            state.shovels.push(shovel);
        },
        deleteShovel(state, id) {
            state.shovels.forEach((shovel, i) => {
                if (shovel.id === id)
                    state.shovels.splice(i, 1);
            });
        },
        setCurrentShovel(state, shovel) {
            state.currentShovel = shovel;
        }
    }
}
