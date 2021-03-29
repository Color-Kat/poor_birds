export default {
    state    : {
        user        : null,
        auth        : null,
        access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
    },
    getters  : {
        getUserName(state) {
            if (state.user) {
                return state.user.name;
            } else return '';
        },
    },
    actions  : {
        checkAuth({
                      commit,
                      state,
                      dispatch
                  }) {

            // we need access token for check auth
            if (!state.access_token) return false;

            // fetch to api check_auth
            return axios.get(
                'api/auth/check_auth',
                // send token
                {headers: {"Authorization": `Bearer ${state.access_token}`}}
            )
                .then(response => {
                    if (response.status === 200) {
                        commit('setAuth', true); // update auth
                        return true;
                    } else return false;
                })
                .catch((error) => {
                    console.log('not auth', error, error.response);
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
                    console.log(response);
                    if (response.status === 200) {
                        // user is logged in
                        commit('setUser', response.data);
                    }
                    // user is not logged in
                    else commit('setUser', null);
                })
                    // some error, user is not logged in
                    .catch((error) => {
                        console.log('lox')
                        commit('setUser', null);
                    });
            } else {
                // user is not logged in
                commit('setUser', null);
            }
        },
        registration(context, form) {
            return axios.post('api/auth/register', form)
                .then(response => {
                    if (response.status === 201) {
                        console.log(response.data);
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
        login({commit, dispatch}, form) {
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
                    .then(response => {
                        console.log(response);
                        commit('setAuth', false);
                        commit('set_Access_token', '');
                    });
            }
        }
    },
    mutations: {
        setUser(state, user) {
            return state.user = user;
        },
        setAuth(state, auth) {
            return state.auth = auth;
        },
        set_Access_token(state, token) {
            localStorage.setItem('access_token', token);
            return state.access_token = token;
        }
    }
}
