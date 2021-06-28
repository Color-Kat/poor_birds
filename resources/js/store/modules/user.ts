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
                return +(+state.user.money).toFixed(2);
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
        getEggs(state): IEgg[] {
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
                let res: IUser | boolean = await new Req('get', 'api/auth/user').auth(state.access_token).send();

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
        /**
         * send request to login user. If it is success load user data
         * */
        login({
                  commit,
                  dispatch
              }, form) {
            commit('toggleLoader', true); // show loader

            return (window as any).axios.post('/api/auth/login', form)
                .then(response => {
                    if (response.status === 201) {
                        // user is logged in
                        commit('setAuth', true); // update auth
                        commit('set_Access_token', response.data.access_token); // save jwt bearer token
                        dispatch('fetchUser'); // get user to display
                        commit('toggleLoader', false); // hode loader

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
                        error  : Object.values(error.response.data)[0][0] // get error message...
                    }
                    return false;
                });
        },
        /**
         * send request to log out user and delete user data in front
         * */
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
        /**
         * send request to get user's birds
         * */
        async fetchUserBirds({
                                 commit,
                                 state
                             }) {

            let res = await new Req('get', 'api/auth/get_my_birds_with_certificate')
                .auth(state.access_token).send();

            if (res) commit('setUserBirds', res); // fill user's birds list

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
        /**
         * send request to add bird to user by bird_seller_id.
         * */
        async buyBird({
                          commit,
                          state
                      }, ids): Promise<boolean> {

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
        /**
         * send request to sell user's bird if money is enough
         * */
        async sellBird({
                           commit,
                           state
                       }, bird_seller_user_id) {
            let res = await new Req('post', 'api/auth/sellBird')
                .auth(state.access_token)
                .send({bird_seller_user_id});

            if (typeof res === 'number') {
                commit('changeBalance', res); // update balance
                commit('reduceBird', bird_seller_user_id); // delete bird from list
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
        /**
         * send request to get user's eggs
         * */
        async fetchUserEggs({
                                commit,
                                state
                            }) {

            let res: IEgg[] | boolean = await new Req('get', 'api/auth/get_my_eggs')
                .auth(state.access_token).send<IEgg[]>();

            if (res) commit('setEggs', res); // fill list of user's eggs

            // if (!state.access_token) return false;
            //
            // // fetch to get all user eggs
            // return axios.get(
            //     'api/auth/get_my_eggs',
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.status === 200) {
            //             commit('setEggs', response.data); // update auth
            //         }
            //     })
            //     .catch((error) => {
            //         console.log('ERROR: ', error, error.response);
            //     });
        },
        /**
         * send request to sell user's eggs by id of egg.
         * @return eggs_count
         * */
        async sellEggs({
                           commit,
                           state
                       }, id): Promise<number | boolean> {
            let res: {
                message: string,
                result: {
                    eggs_count: number,
                    balance: number
                }
            } | boolean = await new Req('post', 'api/auth/sellEggs')
                .auth(state.access_token).send({id});

            if (res && typeof res !== 'boolean') {
                commit('changeBalance', +res.result.balance); // change balance
                return +res.result.eggs_count; // change eggs count
            } else return false

            // if (!state.access_token) return false;
            // return axios.post(
            //     'api/auth/sellEggs',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.status === 200 && response.data.result) {
            //             commit('changeBalance', response.data.result.balance);
            //             return response.data.result.eggs_count;
            //         }
            //         return false
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to reduce litter of bird (egg of bird)
         * */
        async clean({
                        commit,
                        state
                    }, id): Promise<number | boolean> {
            let res: number | boolean = await new Req('post', 'api/auth/clean')
                .auth(state.access_token).send<number | boolean>({id});

            if (typeof res !== 'boolean') return res;
            else return false;

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/clean',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         return response.data;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to add seller into seller_user table
         * */
        async openSeller({
                             commit,
                             state
                         }, id): Promise<boolean> {
            let res: number | boolean = await new Req('post', 'api/auth/openSeller')
                .auth(state.access_token).send<number | boolean>({id});

            if (typeof res === 'number') {
                commit('changeBalance', +res);
                return true;
            } else return false;


            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/openSeller',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.status === 200 && response.data !== '') {
            //             commit('changeBalance', response.data);
            //             return true;
            //         } else return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });

        },
        /**
         * send request to care birds (set `cared` = 1 in eggs table)
         * */
        async cares({
                        commit,
                        state
                    }, id): Promise<boolean> {

            return await new Req('post', 'api/auth/cares')
                .auth(state.access_token).send<boolean>({id});

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/cares',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.status == 200) {
            //             return true;
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to buy shovel
         * */
        async buyShovel({
                            commit,
                            state
                        }, id): Promise<boolean> {
            let res = await new Req('post', 'api/auth/buyShovel')
                .auth(state.access_token).send({id});

            // res must be number
            if (typeof res === 'number') {
                commit('changeBalance', +res); // change balance
                return true; // return success
            } else return false;

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/buyShovel',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             commit('changeBalance', response.data);
            //             return true;
            //         }
            //         return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to select shovel. The user will clean with the chosen shovel
         * */
        async selectShovel({
                               commit,
                               state
                           }, id): Promise<boolean> {
            return await new Req('post', 'api/auth/selectShovel')
                .auth(state.access_token).send<boolean>({id});

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/selectShovel',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             return true;
            //         }
            //         return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to reduce fines
         * */
        async payOffFines({
                              commit,
                              state
                          }): Promise<number | boolean> {
            let res: {
                money: number,
                fines: number
            } | boolean = await new Req('get', 'api/auth/payOffFines')
                .auth(state.access_token).send();

            if (res && typeof res !== 'boolean') {
                commit('changeBalance', +res.money); // update balance
                return +res.fines; // return count of rest fines
            } else return false;

            // if (!state.access_token) return false;
            //
            // return axios.get(
            //     'api/auth/payOffFines',
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             commit('changeBalance', +response.data.money); // update balance
            //             return response.data.fines;
            //         }
            //         return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to buy certificate for user
         * */
        async buyCertificate({
                                 commit,
                                 state
                             }, ids): Promise<boolean> {
            let res = await new Req('post', 'api/auth/buyCertificate')
                .auth(state.access_token).send({...ids});

            if (typeof res === 'number') {
                commit('changeBalance', res); // update balance
                return true;
            } else return false;

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/buyCertificate',
            //     {...ids},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             commit('changeBalance', response.data); // update balance
            //             return true;
            //         }
            //         return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to buy contract for user
         * */
        async buyContract({
                              commit,
                              state
                          }, id): Promise<boolean> {
            let res: number | boolean = await new Req('post', 'api/auth/buyContract')
                .auth(state.access_token).send<number | boolean>({id});

            if (typeof res === 'number') {
                commit('changeBalance', +res); // update balance
                return true;
            } else return false

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/buyContract',
            //     {id},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             commit('changeBalance', response.data); // update balance
            //             return true;
            //         }
            //         return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to sell all eggs, remove all fines and litter
         * */
        async brigadeHire({
                              state
                          }): Promise<boolean> {
            return await new Req('get', 'api/auth/brigadeHire')
                .auth(state.access_token).send<boolean>();

            // if (!state.access_token) return false;
            //
            // return axios.get(
            //     'api/auth/brigadeHire',
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         return response.data;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to sell all trash (increases balance by earnings)
         * */
        async mine({
                       commit,
                       state
                   }, earnings): Promise<boolean> {

            let res: number | boolean = await new Req('post', 'api/auth/mine')
                .auth(state.access_token).send<number>({earnings});

            if (typeof res === 'number') {
                commit('changeBalance', +res); // update balance
                return true;
            } else return false

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/mine',
            //     {earnings: earnings},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data) {
            //             commit('changeBalance', +response.data); // update balance
            //             return true;
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },

        /* CURRENCIES */
        /**
         * send request to exchange one currency for another currency
         * */
        async transaction({
                              commit,
                              state
                          }, transaction): Promise<boolean> {
            let res: number | boolean = await new Req('post', 'api/auth/transaction')
                .auth(state.access_token).send<number | boolean>({...transaction});

            if (typeof res === 'number') {
                commit('changeBalance', +res); // update balance
                return true;
            } else return false;

            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/transaction',
            //     {...transaction},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response.data !== false) {
            //             commit('changeBalance', response.data); // update balance
            //             return true;
            //         }
            //         return false;
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
        },
        /**
         * send request to increase money to admin
         * */
        async changeMoney({
                        commit,
                        state
                    }, money) {
            let res: {
                success: boolean,
                message: any
            } | boolean = await new Req('post', 'api/auth/change_money')
                .auth(state.access_token).send({money});

            if (typeof res !== 'boolean' && res.success) commit('changeBalance', +res.message);


            // if (!state.access_token) return false;
            //
            // return axios.post(
            //     'api/auth/change_money',
            //     {money},
            //     {headers: {"Authorization": `Bearer ${state.access_token}`}}
            // )
            //     .then(response => {
            //         if (response) commit('changeBalance', response.data);
            //     })
            //     .catch((error) => {
            //         console.log(error, error.response);
            //         return false;
            //     });
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
