import {IWallet} from "../../modules/types/IWallet";
import {IUser} from "../../modules/types/IUser";
import {IEgg} from "../../modules/types/IEgg";
import {IMySeller} from "../../modules/types/IMySeller";
import {IShovel} from "../../modules/types/IShovel";
import {IMyContract} from "../../modules/types/IMyContract";
import Req from "../../modules/Req";
import {AxiosResponse} from "axios";

export default {
    state    : {
        user        : null,
        auth        : null,
        access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '',
        user_birds  : [],
        eggs        : []
    },
    getters  : {
        getUserName(state): string {
            if (state.user) {
                return state.user.name;
            } else return '';
        },
        getUserRole(state): number {
            if (state.user) {
                return +state.user.role;
            } else return 0;
        },
        getAuth(state): boolean {
            if (state.auth) {
                return state.auth;
            } else return false;
        },
        getUserId(state): number | boolean {
            if (state.user) {
                return +state.user.id;
            } else return false;
        },
        getToken(state): string | boolean {
            if (state.auth) {
                return state.access_token;
            } else return false;
        },
        getBalance(state): number | boolean {
            if (state.user) {
                return +(state.user.money).toFixed(2);
            } else return false;
        },
        getUserWallets(state): IWallet | boolean {
            if (state.user) {
                return {
                    RUB: +state.user.money,
                    GTN: +state.user.GTN,
                    USD: +state.user.USD,
                    BTC: +state.user.BTC,
                }
            } else return false;
        },
        // return all user data
        user(state): IUser | boolean {
            if (state.user) {
                return state.user;
            } else return false;
        },
        // return formatted user data
        getUserData(state) {
            if (state.user) {
                let user: IUser = state.user;
                return [
                    {
                        name : 'Ник',
                        value: user.name
                    },
                    {
                        name : 'Деньги',
                        value: +user.money
                    },
                    {
                        name : 'Почта',
                        value: user.email
                    },
                    {
                        name : 'Дата регистрации',
                        value: new Date(user.created_at).toLocaleString('ru-RU', {
                            year : 'numeric',
                            month: 'numeric',
                            day  : 'numeric'
                        })
                    },
                ];

            }
        },
        getMyBirds(state) {
            return state.user_birds;
        },

        /**
         * Return data about user's eggs
         * */
        getEggs(state): IEgg {
            return state.eggs;
        },
        /**
         * return unlocked sellers
         * */
        getUserSellers(state): IMySeller[] | boolean {
            if (state.user) return state.user.my_sellers;
            else return false;
        },
        getUserShovelsIds(state): number[] | boolean {
            if (state.user) return state.user.my_shovels.map(elem => +elem.id);
            else return false;
        },
        getUserShovels(state): IShovel[] | boolean {
            if (state.user) return state.user.my_shovels;
            else return false;
        },
        getUserContracts(state): IMyContract | boolean {
            if (state.user) return state.user.my_contracts;
            else return false;
        },
        getUserContractsIds(state): number[] | boolean {
            if (state.user) return state.user.my_contracts.map(elem => elem.id);
            else return false;
        }
    },
    actions  : {
        /**
         * get is user authorization
         * */
        async checkAuth({
                            commit,
                            dispatch,
                            state
                        }): Promise<boolean> {
            let res: boolean = await new Req('get', 'api/auth/check_auth').auth(state.access_token).send();

            if (res) {
                commit('setAuth', true); // update auth
                await dispatch('fetchUser'); // fetch user data
                return true;
            } else {
                commit('setAuth', false); // update auth
                return false;
            }

            // we need access token for check auth
            // if (!state.access_token) return false;
            //
            // // fetch to api check_auth
            // return axios.get(
            //     'api/auth/check_auth',
            //     // send token
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(async response => {
            //         if (response.status === 200) {
            //             commit('setAuth', true); // update auth
            //             await dispatch('fetchUser');
            //             return true;
            //         } else return false;
            //     })
            //     .catch((error) => {
            //         if (error.response) {
            //             commit('setAuth', false);
            //             return false;
            //         }
            //     });
        },
        /**
         * fetch and fill user data
         * */
        async fetchUser({
                            commit,
                            dispatch,
                            state
                        }): Promise<void> {

            // check auth
            if (state.auth) {
                // fetch user data
                let res = await new Req('get', 'api/auth/user').auth(state.access_token).send();

                if (res) {
                    commit('setUser', res); // fill user data
                    dispatch('fetchUserBirds'); // fill user's birds list
                    dispatch('fetchUserEggs'); // fill user's eggs list
                } else commit('setUser', null); // user is not logged in
                // return axios.get(
                //     'api/auth/user',
                //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
                // ).then(response => {
                //     if (response.status === 200) {
                //         commit('setUser', response.data); // user is logged in
                //         dispatch('fetchUserBirds'); // user is logged in
                //         dispatch('fetchUserEggs'); // user is logged in
                //     } else commit('setUser', null); // user is not logged in
                // })
                //     // some error, user is not logged in
                //     .catch((error) => {
                //         console.log('Error', error)
                //         commit('setUser', null);
                //     });
            } else {
                commit('setUser', null); // user is not logged in
            }
        },
        /**
         * send request to register new user
         * @return result - is success, error message
         * */
        async registration(context, form) {
            context.commit('toggleLoader', true); // show loader

            // let rawResponse: AxiosResponse<any> | boolean = await new Req('post', 'api/auth/register')
            //     .catchMode() // set catch mode to get raw response
            //     .send(form);
            // context.commit('toggleLoader', false); // hide loader
            //
            // console.log(rawResponse);
            //
            // // code error
            // if (!rawResponse) return {
            //     success: false,
            //     error  : 'Произошла какая-то ошибка'
            // }
            //
            // if (rawResponse.status === 201) {
            //     return {
            //         success: true,
            //         error  : false
            //     };
            // } else return {
            //     success: false,
            //     error  : 'Произошла какая-то ошибка'
            // };

            return (window as any).axios.post('api/auth/register', form)
                .then(response => {
                    context.commit('toggleLoader', false);
                    if (response.status === 201) {
                        return {
                            success: true,
                            error  : false
                        };
                    } else return {
                        success: false,
                        error  : 'Произошла какая-то ошибка'
                    };
                })
                .catch((error) => {
                    context.commit('toggleLoader', false);
                    if (error.response) {
                        return {
                            success: false,
                            error  : Object.values(error.response.data)[0][0] // get error
                        };
                    }
                });
        },
        login({
                  commit,
                  dispatch
              }, form) {
            commit('toggleLoader', true);

            return (window as any).axios.post('/api/auth/login', form)
                .then(response => {
                    if (response.status === 201) {
                        // user is logged in
                        commit('setAuth', true); // update auth
                        commit('set_Access_token', response.data.access_token); // save jwt bearer token
                        dispatch('fetchUser'); // get user to display
                        commit('toggleLoader', false);

                        // return status
                        return {
                            success: true,
                            error  : false
                        };
                    } else return {
                        success: false,
                        error  : 'Произошла какая-то ошибка'
                    };
                })
                .catch((error) => {
                    commit('setAuth', false); // not logged in
                    commit('toggleLoader', false);

                    // return error message
                    if (error.response) return {
                        success: false,
                        error  : Object.values(error.response.data)[0][0]
                    }
                    return false;
                });
        },
        async logout({
                         commit,
                         state
                     }): Promise<void> {
            if (state.auth) {

                let res = await new Req('get', '/api/auth/logout')
                    .auth(state.access_token).send();

                commit('setAuth', false); // user is not authorized now
                commit('setUser', null); // no data about user
                commit('set_Access_token', ''); // delete access token

                // axios.get(
                //     '/api/auth/logout',
                //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
                // )
                //     .then(() => {
                //         commit('setAuth', false);
                //         commit('setUser', null);
                //         commit('set_Access_token', '');
                //     });
            }
        },

        async fetchUserBirds({
                                 commit,
                                 state
                             }) {

            let res = await new Req('get', 'api/auth/get_my_birds_with_certificate')
                .auth(state.access_token).send();

            if (res) commit('setUserBirds', res);

            // if (!state.access_token) return false;
            // // fetch to api check_auth
            // return axios.get(
            //     'api/auth/get_my_birds_with_certificate',
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.status === 200) {
            //             commit('setUserBirds', response.data); // update auth
            //         }
            //     })
            //     .catch((error) => {
            //         console.log('ERROR: ', error, error.response);
            //     });
        },
        async buyBird({
                          commit,
                          state
                      }, ids) {

            let res = await new Req('post', 'api/auth/buyBird')
                .auth(state.access_token)
                .send({
                    bird_id       : ids.bird_id,
                    bird_seller_id: ids.sold_bird_id
                });

            // returned balance
            if (typeof res === 'number') {
                commit('changeBalance', res); // update balance from returned data
                return true;
            } else return false;

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/buyBird',
            //     {
            //         bird_id       : ids.bird_id,
            //         bird_seller_id: ids.sold_bird_id
            //     },
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (!response.data) return false;
            //         else {
            //
            //
            //             commit('changeBalance', response.data); // update balance from returned data
            //             return true;
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        async sellBird({
                           commit,
                           state
                       }, bird_seller_user_id) {
            let res = await new Req('post', 'api/auth/sellBird')
                .auth(state.access_token)
                .send({bird_seller_user_id});

            if (typeof res === 'number') {
                commit('changeBalance', res);
                commit('reduceBird', bird_seller_user_id);
            }

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/sellBird',
            //     {bird_seller_user_id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             commit('changeBalance', response.data);
            //             commit('reduceBird', bird_seller_user_id);
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //     });
        },
        fetchUserEggs({
                          commit,
                          state
                      }) {
            if (!state.access_token) return false;

            // fetch to get all user eggs
            return axios.get(
                'api/auth/get_my_eggs',
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.status === 200) {
                        commit('setEggs', response.data); // update auth
                    }
                })
                .catch((error) => {
                    console.log('ERROR: ', error, error.response);
                });
        },
        sellEggs({
                     commit,
                     state
                 }, id) {
            if (!state.access_token) return false;
            return axios.post(
                'api/auth/sellEggs',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.status === 200 && response.data.result) {
                        commit('changeBalance', response.data.result.balance);
                        return response.data.result.eggs_count;
                    }
                    return false
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });

        },
        clean({
                  commit,
                  state
              }, id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/clean',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    return response.data;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });

        },
        openSeller({
                       commit,
                       state
                   }, id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/openSeller',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.status === 200 && response.data !== '') {
                        commit('changeBalance', response.data);
                        return true;
                    } else return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });

        },
        cares({
                  commit,
                  state
              }, id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/cares',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.status == 200) {
                        return true;
                    }
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });

        },
        buyShovel({
                      commit,
                      state
                  }, id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/buyShovel',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        commit('changeBalance', response.data);
                        return true;
                    }
                    return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        selectShovel({
                         commit,
                         state
                     }, id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/selectShovel',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        return true;
                    }
                    return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        payOffFines({
                        commit,
                        state
                    }) {
            if (!state.access_token) return false;

            return axios.get(
                'api/auth/payOffFines',
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        commit('changeBalance', +response.data.money); // update balance
                        return response.data.fines;
                    }
                    return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        buyCertificate({
                           commit,
                           state
                       }, ids) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/buyCertificate',
                {...ids},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        commit('changeBalance', response.data); // update balance
                        return true;
                    }
                    return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        buyContract({
                        commit,
                        state
                    }, id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/buyContract',
                {id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        commit('changeBalance', response.data); // update balance
                        return true;
                    }
                    return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        brigadeHire({
                        state
                    }) {
            if (!state.access_token) return false;

            return axios.get(
                'api/auth/brigadeHire',
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    return response.data;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        mine({
                 commit,
                 state
             }, earnings) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/mine',
                {earnings: earnings},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        commit('changeBalance', +response.data); // update balance
                        return true;
                    }
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },

        /* CURRENCIES */
        transaction({
                        commit,
                        state
                    }, transaction) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/transaction',
                {...transaction},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data !== false) {
                        commit('changeBalance', response.data); // update balance
                        return true;
                    }
                    return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        changeMoney({
                        commit,
                        state
                    }, money) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/change_money',
                {money},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    console.log(response);
                    if (response) commit('changeBalance', response.data);
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuth(state, auth) {
            state.auth = auth;
        },
        set_Access_token(state, token) {
            localStorage.setItem('access_token', token);
            state.access_token = token;
        },
        setUserBirds(state, birds) {
            state.user_birds = birds;
        },
        changeBalance(state, sum) {
            state.user.money = sum;
        },
        reduceBird(state, id) {
            let birdIndex = state.user_birds.findIndex(item => {
                if (item.bird_seller_user_id === id) return true;
            });

            // bird count is more that 1
            if (state.user_birds[birdIndex].count > 1) state.user_birds[birdIndex].count--;
            else state.user_birds.splice(birdIndex, 1)
        },
        setEggs(state, eggs) {
            state.eggs = eggs;
        }
    }
}
