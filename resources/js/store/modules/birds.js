export default {
    state    : {
        birds      : [],
        currentBird: null
    },
    getters  : {
        getBirds(state) {
            return state.birds;
        },
        getBird(state) {
            const bird = state.currentBird;

            if (bird) {
                return {
                    image      : bird.image,
                    name       : ['Название', bird.name],
                    description: ['Описание', bird.description],
                    fertility  : ['Плодоносность', `${bird.fertility} яиц/час`],
                    care       : ['Бонус за заботу', `${bird.care}% к плодовитости на 1 час`],
                    demand     : ['Спрос на яйца', `${bird.demand} яиц/час`],
                    litter     : ['Кол-во помета', `${bird.litter} ед./час`],
                    price      : ['Цена', `${bird.price}`],
                    sellers    : bird.sellers
                };
            } else return false
        }
    },
    actions  : {
        fetchBirds(context) {
            axios.get('/api/birds')
                .then(response => {
                    context.commit('setBirds', response.data);
                }).catch(err => {
                console.log('ERROR: ' + err);
            })
        },
        createBird({commit}, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            // set header to upload image file
            return axios.post(
                'api/birds',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
                .then(response => {
                    console.log(response)
                    if (response.status === 201) {
                        commit('addBird', response.data);

                        return true;
                    } else return false
                })
                .catch((error) => {
                    console.log(error.response);
                    return false
                });
        },
        deleteBird({commit}, id) {
            axios.delete(
                `api/birds/${id}`
            )
                .then(response => {
                    // successfully deleting
                    if (response) {
                        commit('deleteBird', id)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchBird({commit}, id) {
            return axios.get(
                `api/birds/${id}`
            )
                .then(response => {
                    if (response.data.status) {
                        commit('setCurrentBird', response.data.messages);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateBird({commit, dispatch}, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            formData.append('_method', 'PATCH'); // set PATCH method

            return axios.post(
                `api/birds/${form.id}`,
                 formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
                .then(response => {
                    dispatch('fetchBirds');
                    return response;
                })
                .catch((error) => {
                    console.log(error.response);
                    return false;
                });
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
