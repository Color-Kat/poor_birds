import Req from "../../modules/Req";
import {currenciesListType} from "../../modules/types/currenciesListType";
import {currenciesTypes} from "../../modules/types/currenciesTypes";
import {ICurrency} from "../../modules/types/ICurrency";

export default {
    state    : {
        currencies: [],
    },
    getters  : {
        getCurrencies(state) {
            return state.currencies;
        },
    },
    actions  : {
        async fetchCurrencies(context) {
            let currencies: currenciesListType | boolean = await new Req('get', 'api/currencies').send();

            if (currencies) context.commit('setCurrencies', currencies);
            return !!currencies; // return  success;
            // return axios.get('/api/currencies')
            //     .then(response => {
            //         context.commit('setCurrencies', response.data);
            //         // console.log(context.getters.getCurrencies);
            //         return true;
            //     }).catch(err => {
            //         console.log('ERROR: ' + err);
            //         return false;
            // })
        },

    },
    mutations: {
        setCurrencies(state, currencies) {
            state.currencies = currencies;
        },
    }
}
