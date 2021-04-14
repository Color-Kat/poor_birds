export default {
    state    : {
        certificates      : [],
        currentCertificate: null
    },
    getters  : {
        getCertificates(state) {
            return state.certificates;
        },
        getCertificate(state) {
            const certificate = state.currentCertificate;
            let grade         = '';
            if (certificate.grade === 0) {
                grade = 'поддельный'
            }
            if (certificate.grade === 1) {
                grade = 'с опечаткой'
            }
            if (certificate.grade === 2) {
                grade = 'палёный'
            }
            if (certificate.grade === 3) {
                grade = 'плохой'
            }
            if (certificate.grade === 4) {
                grade = 'обычный'
            }
            if (certificate.grade === 5) {
                grade = 'путный'
            }
            if (certificate.grade === 6) {
                grade = 'хороший'
            }
            if (certificate.grade === 7) {
                grade = 'бронзовый'
            }
            if (certificate.grade === 8) {
                grade = 'серебряный'
            }
            if (certificate.grade === 9) {
                grade = 'золотой'
            }
            if (certificate.grade === 10) {
                grade = 'легендарный'
            }

            if (certificate) {
                return {
                    name           : ['Название', certificate.name],
                    grade          : grade,
                    grade_id       : certificate.grade,
                    fertility_bonus: ['Бонус к плодоносности', `${certificate.fertility_bonus} яиц/час`],
                    care_bonus     : ['Бонус к заботу', `${certificate.care_bonus}%`],
                    demand_bonus   : ['Бонус на спрос', `${certificate.demand_bonus}%`],
                    litter_bonus   : ['Бонус на кол-во помета', `${certificate.litter_bonus} %`],
                    price_bonus    : ['Бонус к цене яиц', `${certificate.price_bonus}%`],
                    price          : ['Цена', `${certificate.price}руб.`],
                };
            } else return false
        }
    },
    actions  : {
        fetchCertificates(context) {
            axios.get('/api/certificates')
                .then(response => {
                    context.commit('setCertificates', response.data);
                }).catch(err => {
                console.log('ERROR: ' + err);
            })
        },
        createCertificate({commit}, form) {
            return axios.post(
                'api/certificates',
                form
            )
                .then(response => {
                    if (response.status === 201) {
                        commit('addCertificate', response.data);
                        return true;
                    } else return false;
                })
                .catch((error) => {
                    console.log(error, error.response);
                    return false
                });
        },
        updateCertificate({
                              commit,
                              dispatch
                          }, form) {
            // convert object to form data
            // let formData = new FormData();
            // for (let key in form) {
            //     formData.append(key, form[key]);
            // }
            //
            // formData.append('_method', 'PATCH'); // set PATCH method
            return axios.post(
                `api/certificates/${form.id}`,
                {...form, _method: 'PATCH'}
            )
                .then(response => {
                    console.log(response)
                    dispatch('fetchCertificates');
                    return response;
                })
                .catch((error) => {
                    console.log(error.response);
                    return false;
                });
        },
        deleteCertificate({commit}, id) {
            axios.delete(
                `api/certificates/${id}`
            )
                .then(response => {
                    // successfully deleting
                    if (response) {
                        commit('deleteCertificate', id)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        fetchCertificate({commit}, id) {
            return axios.get(
                `api/certificates/${id}`
            )
                .then(response => {
                    if (response.data.status) {
                        commit('setCurrentCertificate', response.data.messages);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },

    },
    mutations: {
        setCertificates(state, certificate) {
            state.certificates = certificate;
        },
        addCertificate(state, certificate) {
            state.certificates.push(certificate);
        },
        deleteCertificate(state, id) {
            state.certificates.forEach((certificate, i) => {
                if (certificate.id === id)
                    state.certificates.splice(i, 1);
            });
        },
        setCurrentCertificate(state, certificate) {
            state.currentCertificate = certificate;
        }
    }
}
