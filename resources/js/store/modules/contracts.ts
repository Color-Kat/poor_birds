import {IContract} from "../../modules/types/IContract";
import Req from "../../modules/Req";

export default {
    state    : {
        contracts      : [],
        currentContract: null
    },
    getters  : {
        getContracts(state) {
            return state.contracts;
        },
        getContract(state) {
            const contract: IContract = state.currentContract;
            if (contract) {
                return {
                    // description: ['Описание', contract.description],
                    id         : contract.id,
                    image      : contract.image,
                    name       : contract.name,
                    description: contract.description,
                    isDonate   : +contract.isDonate,
                    price      : ['Цена контракта', `${+contract.isDonate ? +contract.price + ' GTN' : +contract.price + ' руб'} `],
                };
            } else return false
        }
    },
    actions  : {
        /**
         * send request and fill contracts list
         * */
        async fetchContracts({commit}) {
            let res: IContract[] | boolean = await new Req('get', '/api/contracts').send<IContract[]>();

            if(res) commit('setContracts', res); // fill contracts list

            // axios.get('/api/contracts')
            //     .then(response => {
            //         context.commit('setContracts', response.data);
            //     }).catch(err => {
            //     console.log('ERROR: ' + err);
            // })
        },
        /**
         * fetch one contract by id and save it into currentContract
         * */
        async fetchContract({commit}, id) {
            // need to find just contract
            let res: IContract | boolean = await new Req('get',  `api/contracts/${id}`).send();
            if (res) commit('setCurrentContract', res);

            // return axios.get(
            //     `api/contracts/${id}`
            // )
            //     .then(response => {
            //         if (response.data.status) {
            //             commit('setCurrentContract', response.data.messages);
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
    },
    mutations: {
        setContracts(state, contracts: IContract[]) {
            state.contracts = contracts;
        },
        setCurrentContract(state, contract: IContract) {
            state.currentContract = contract;
        }
    }
}
