export default {
    state    : {
        user        : null,
        auth        : null,
        access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '',
        user_birds  : [],
        eggs        : []
    },
    getters  : {
        getUserName(state) {
            if (state.user) {
                return state.user.name;
            } else return '';
        },
        getUserRole(state) {
            if (state.user) {
                return state.user.role;
            } else return 0;
        },
        getAuth(state) {
            if (state.auth) {
                return state.auth;
            } else return false;
        },
        getBalance(state) {
            if (state.user) {
                return state.user.money;
            } else return false;
        },
        // return all user data
        user(state) {
            if (state.user) {
                return state.user;
            } else return false;
        },
        // return formatted user data
        getUserData(state) {
            if (state.user) {
                let user = state.user;
                return [
                    {
                        name : 'Ник',
                        value: user.name
                    },
                    {
                        name : 'Деньги',
                        value: user.money
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
        getEggs(state) {
            return state.eggs;
        },
        // return unlocked sellers
        getUserSellers(state) {
            if (state.user) {
                return state.user.my_sellers;
            } else return false;
        }
    },
    actions  : {
        async checkAuth({
                            commit,
                            dispatch,
                            state
                        }) {
            // we need access token for check auth
            if (!state.access_token) return false;

            // fetch to api check_auth
            return axios.get(
                'api/auth/check_auth',
                // send token
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(async response => {
                    if (response.status === 200) {
                        commit('setAuth', true); // update auth
                        await dispatch('fetchUser');
                        return true;
                    } else return false;
                })
                .catch((error) => {
                    if (error.response) {
                        commit('setAuth', false);
                        return false;
                    }
                });
        },
        fetchUser({
                      commit,
                      state
                  }) {

            // check auth
            if (state.auth) {
                // fetch user data
                return axios.get(
                    'api/auth/user',
                    {headers: {"Authorization": `Bearer ${state.access_token}`}}
                ).then(response => {
                    if (response.status === 200) {
                        commit('setUser', response.data); // user is logged in
                    } else commit('setUser', null); // user is not logged in
                })
                    // some error, user is not logged in
                    .catch((error) => {
                        console.log('Error', error)
                        commit('setUser', null);
                    });
            } else {
                commit('setUser', null); // user is not logged in
            }
        },
        registration(context, form) {
            return axios.post('api/auth/register', form)
                .then(response => {
                    if (response.status === 201) {
                        // console.log(response.data);
                        context.commit('setUser', response.data);

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
            return axios.post('/api/auth/login', form)
                .then(response => {
                    if (response.status === 201) {
                        // user is logged in
                        commit('setAuth', true); // update auth
                        commit('set_Access_token', response.data.access_token); // save jwt bearer token
                        dispatch('fetchUser'); // get user to display

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

                    // return error message
                    if (error.response) return {
                        success: false,
                        error  : Object.values(error.response.data)[0][0]
                    }
                });
        },
        logout({
                   commit,
                   state
               }) {
            if (state.auth) {
                axios.get(
                    '/api/auth/logout',
                    {headers: {"Authorization": `Bearer ${state.access_token}`}}
                )
                    .then(() => {
                        commit('setAuth', false);
                        commit('setUser', null);
                        commit('set_Access_token', '');
                    });
            }
        },

        fetchUserBirds({
                           commit,
                           state
                       }) {
            if (!state.access_token) return false;

            // fetch to api check_auth
            return axios.get(
                'api/auth/get_my_birds_with_certificate',
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.status === 200) {
                        commit('setUserBirds', response.data); // update auth
                    }
                })
                .catch((error) => {
                    console.log('ERROR: ', error, error.response);
                });
        },
        buyBird({
                    commit,
                    state
                }, ids) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/buyBird',
                {
                    bird_id       : ids.bird_id,
                    bird_seller_id: ids.sold_bird_id
                },
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (!response.data) return false
                    else {
                        commit('changeBalance', response.data);
                        return true;
                    }
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false;
                });
        },
        sellBird({
                     commit,
                     state
                 }, bird_seller_user_id) {
            if (!state.access_token) return false;

            return axios.post(
                'api/auth/sellBird',
                {bird_seller_user_id},
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.data) {
                        commit('changeBalance', response.data);
                        commit('reduceBird', bird_seller_user_id);
                    }
                })
                .catch((error) => {
                    console.log(error, error.response);
                });
        },
        fetchUserEggs({
                          commit,
                          state
                      }) {
            if (!state.access_token) return false;

            // fetch to api check_auth
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
                    if (response.status == 200 && response.data.result) {
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
                    console.log(response)
                    if (response.status == 200) {
                        commit('changeBalance', response.data);
                        return true;
                    }
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
            console.log(id)
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
            state.user.money = sum
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
