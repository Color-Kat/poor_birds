export default {
    state    : {
        currencies      : [],
    },
    getters  : {
        getCurrencies(state) {
            let currencies = {};

            // sort array to {currency_name: {}[]}
            // state.currencies.forEach(elem => {
            //     if(!currencies[elem.currency]) currencies[elem.currency] = [];
            //
            //     currencies[elem.currency].unshift({
            //         ...elem,
            //
            //     }); // array[0] = latest data
            // });
            return state.currencies;
        },
    },
    actions  : {
        fetchCurrencies(context) {
            return axios.get('/api/currencies')
                .then(response => {
                    context.commit('setCurrencies', response.data);
                    // console.log(context.getters.getCurrencies);
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
