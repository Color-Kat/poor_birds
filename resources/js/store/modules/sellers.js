export default {
    state    : {
        sellers      : [],
        currentSeller: null
    },
    getters  : {
        getSellers(state) {
            return state.birds;
        },
        getSeller(state) {
            const seller = state.currentBird;

            if (seller) {
                return {
                    image      : seller.image,
                    name       : ['Название', seller.name],
                    description: ['Описание', seller.description],
                    demand     : ['Бонус на спрос', `${seller.demand}%`],
                    discount   : ['Бонус к цене', `${seller.discount}%`],
                    birds_count: ['Кол-во птиц для договора', `${seller.birds_count}`],
                    price      : ['Цена договора', `${seller.price}руб`],
                };
            } else return false
        }
    },
    actions  : {
        fetchSellers(context) {
            axios.get('/api/sellers')
                .then(response => {
                    context.commit('setSellers', response.data);
                }).catch(err => {
                console.log('ERROR: ' + err);
            })
        },
        createSeller({commit}, form) {
            // convert object to form data
            // let formData = new FormData();
            // for (let key in form) {
            //     formData.append(key, form[key]);
            // }
            //
            // // set header to upload image file
            // return axios.post(
            //     'api/sellers',
            //     formData,
            //     {headers: {'Content-Type': 'multipart/form-data'}}
            // )
            //     .then(response => {
            //         console.log(response)
            //         if (response.status === 201) {
            //             commit('addBird', response.data);
            //
            //             return true;
            //         } else return false
            //     })
            //     .catch((error) => {
            //         console.log(error.response);
            //         return false
            //     });
        },
        // deleteSeller({commit}, id) {
        //     axios.delete(
        //         `api/sellers/${id}`
        //     )
        //         .then(response => {
        //             // successfully deleting
        //             if (response) {
        //                 commit('deleteBird', id)
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // },
        // fetchBird({commit}, id) {
        //     return axios.get(
        //         `api/birds/${id}`
        //     )
        //         .then(response => {
        //             if (response.data.status) {
        //                 commit('setCurrentBird', response.data.messages);
        //             }
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // },
        // updateBird({
        //                commit,
        //                dispatch
        //            }, form) {
        //     // convert object to form data
        //     let formData = new FormData();
        //     for (let key in form) {
        //         formData.append(key, form[key]);
        //     }
        //
        //     formData.append('_method', 'PATCH'); // set PATCH method
        //
        //     return axios.post(
        //         `api/birds/${form.id}`,
        //         formData,
        //         {headers: {'Content-Type': 'multipart/form-data'}}
        //     )
        //         .then(response => {
        //             dispatch('fetchBirds');
        //             return response;
        //         })
        //         .catch((error) => {
        //             console.log(error.response);
        //             return false;
        //         });
        // },
    },
    mutations: {
        setSellers(state, birds) {
            state.birds = birds;
        },
        addSeller(state, bird) {
            state.birds.push(bird);
        },
        deleteSeller(state, id) {
            state.birds.forEach((bird, i) => {
                if (bird.id === id)
                    state.birds.splice(i, 1);
            });
        },
        // setCurrentBird(state, bird) {
        //     state.currentBird = bird;
        // }
    }
}
