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
            const contract = state.currentContract;
            console.log(contract)
            if (contract) {
                return {
                    // description: ['Описание', contract.description],
                    id         : contract.id,
                    image      : contract.image,
                    name       : contract.name,
                    description: contract.description,
                    isDonat    : contract.isDonat,
                    price      : ['Цена контракта', `${contract.isDonat ? contract.price + '₽' : contract.price + ' руб'} `],
                };
            } else return false
        }
    },
    actions  : {
        fetchContracts(context) {
            axios.get('/api/contracts')
                .then(response => {
                    console.log(response)
                    context.commit('setContracts', response.data);
                }).catch(err => {
                console.log('ERROR: ' + err);
            })
        },
        fetchContract({commit}, id) {
            // need to find just contract
            return axios.get(
                `api/contracts/${id}`
            )
                .then(response => {
                    if (response.data.status) {
                        commit('setCurrentContract', response.data.messages);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mutations: {
        setContracts(state, contracts) {
            state.contracts = contracts;
        },
        setCurrentContract(state, contract) {
            state.currentContract = contract;
        }
    }
}
