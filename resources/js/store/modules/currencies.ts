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
        },

    },
    mutations: {
        setCurrencies(state, currencies) {
            state.currencies = currencies;
        },
    }
}
