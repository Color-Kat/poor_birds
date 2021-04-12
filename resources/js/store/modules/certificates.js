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

            // if (bird) {
            //     return {
            //         image      : bird.image,
            //         name       : ['Название', bird.name],
            //         description: ['Описание', bird.description],
            //         fertility  : ['Плодоносность', `${bird.fertility} яиц/час`],
            //         care       : ['Бонус за заботу', `${bird.care}% к плодовитости на 1 час`],
            //         demand     : ['Спрос на яйца', `${bird.demand} яиц/час`],
            //         litter     : ['Кол-во помета', `${bird.litter} ед./час`],
            //         price      : ['Цена', `${bird.price}`],
            //         sellers    : bird.sellers
            //     };
            // } else return false
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
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            // set header to upload image file
            return axios.post(
                'api/certificates',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
                .then(response => {
                    console.log(response)
                    if (response.status === 201) {
                        commit('addCertificate', response.data);

                        return true;
                    } else return false
                })
                .catch((error) => {
                    console.log(error.response);
                    return false
                });
        },
        updateCertificate({
                              commit,
                              dispatch
                          }, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            formData.append('_method', 'PATCH'); // set PATCH method

            return axios.post(
                `api/certificates/${form.id}`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
                .then(response => {
                    dispatch('fetchCertificate');
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
                `api/certificate/${id}`
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
            state.certificate.push(certificate);
        },
        deleteCertificate(state, id) {
            state.certificates.forEach((certificate, i) => {
                if (certificate.id === id)
                    state.certificate.splice(i, 1);
            });
        },
        setCurrentCertificate(state, certificate) {
            state.currentCertificate = certificate;
        }
    }
}
