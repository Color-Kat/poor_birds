export default {
    state    : {
        sellers      : [],
        currentSeller: null
    },
    getters  : {
        getSellers(state) {
            console.log(state.sellers)
            return state.sellers;
        },
        getSeller(state) {
            const seller = state.currentSeller;
            console.log(seller)
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
            return axios.get('/api/sellers')
                .then(response => {
                    context.commit('setSellers', response.data);
                }).catch(err => {
                console.log('ERROR: ' + err);
            })
        },
        createSeller({commit}, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            // set header to upload image file
            return axios.post(
                'api/sellers',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
                .then(response => {
                    console.log(response)
                    if (response.status === 201) {
                        commit('addSeller', response.data);

                        return true;
                    } else return false
                })
                .catch((error) => {
                    console.log(error.response);
                    return false
                });
        },
        deleteSeller({commit}, id) {
            axios.delete(
                `api/sellers/${id}`
            )
                .then(response => {
                    // successfully deleting
                    if (response) {
                        commit('deleteSeller', id)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateSeller({
                       commit,
                       dispatch
                   }, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            formData.append('_method', 'PATCH'); // set PATCH method

            return axios.post(
                `api/sellers/${form.id}`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
                .then(response => {
                    dispatch('fetchSellers');
                    return response;
                })
                .catch((error) => {
                    console.log(error.response);
                    return false;
                });
        },
        fetchSeller({commit}, id) {
            return axios.get(
                `api/sellers/${id}`
            )
                .then(response => {
                    if (response.data.status) {
                        commit('setCurrentSeller', response.data.messages);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mutations: {
        setSellers(state, sellers) {
            state.sellers = sellers;
        },
        addSeller(state, seller) {
            state.sellers.push(seller);
        },
        deleteSeller(state, id) {
            state.sellers.forEach((sellers, i) => {
                if (sellers.id === id)
                    state.sellers.splice(i, 1);
            });
        },
        setCurrentSeller(state, seller) {
            state.currentSeller = seller;
        }
    }
}
