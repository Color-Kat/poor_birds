export default {
    state    : {
        birds: []
    },
    getters  : {
        getBirds(state) {
            return state.birds;
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
        createBirds({commit}, form) {
            // convert object to form data
            let formData = new FormData();
            for ( let key in form ) {
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
                    if(response) {
                        commit('deleteBird', id)
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    },
    mutations: {
        setBirds(state, birds) {
            state.birds = birds;
        },
        addBird(state, bird) {
            state.birds.push(bird);
        },
        deleteBird(state, id) {
            state.birds.foreach((bird, i) => {
                if (bird.id === id) {
                    delete state.birds[i];
                }
            })
        }
    }
}
