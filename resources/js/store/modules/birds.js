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
            return axios.post('api/birds', form)
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
        }
    },
    mutations: {
        setBirds(state, birds) {
            state.birds = birds;
        },
        addBird(state, bird) {
            state.birds.push(bird);
        }
    }
}
