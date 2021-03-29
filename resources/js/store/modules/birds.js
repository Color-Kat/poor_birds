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
        }
    },
    mutations: {
        setBirds(state, birds) {
            return state.birds = birds;
        }
    }
}
