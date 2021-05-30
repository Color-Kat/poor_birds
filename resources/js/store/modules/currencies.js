export default {
    state    : {
        currencies      : [],
    },
    getters  : {
        getCurrencies(state) {
            return state.currencies;
        },
    },
    actions  : {
        fetchCurrencies(context) {
            axios.get('/api/currencies')
                .then(response => {
                    context.commit('setCurrencies', response.data);
                    return true;
                }).catch(err => {
                    console.log('ERROR: ' + err);
                    return false;
            })
        },

    },
    mutations: {
        setCurrencies(state, currencies) {
            state.currencies = currencies;
        },
    }
}
