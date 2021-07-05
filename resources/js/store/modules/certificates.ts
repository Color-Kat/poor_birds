import {ICertificate} from "../../modules/types/ICertificate";
import Req from "../../modules/Req";

export default {
    state    : {
        certificates      : [],
        currentCertificate: null
    },
    getters  : {
        getCertificates(state): ICertificate[] {
            return state.certificates;
        },
        getCertificate(state) {
            const certificate: ICertificate = state.currentCertificate;

            if (!certificate) return false;

            let grade = '';
            if (+certificate.grade === 0) {
                grade = 'поддельный'
            }
            if (+certificate.grade == 1) {
                grade = 'с опечаткой'
            }
            if (+certificate.grade == 2) {
                grade = 'палёный'
            }
            if (+certificate.grade == 3) {
                grade = 'плохой'
            }
            if (+certificate.grade == 4) {
                grade = 'обычный'
            }
            if (+certificate.grade == 5) {
                grade = 'путный'
            }
            if (+certificate.grade == 6) {
                grade = 'хороший'
            }
            if (+certificate.grade == 7) {
                grade = 'бронзовый'
            }
            if (+certificate.grade == 8) {
                grade = 'серебряный'
            }
            if (+certificate.grade == 9) {
                grade = 'золотой'
            }
            if (+certificate.grade == 10) {
                grade = 'легендарный'
            }

            if (certificate) {
                return {
                    id             : certificate.id,
                    name           : ['Название', certificate.name],
                    grade          : grade,
                    grade_id       : certificate.grade,
                    fertility_bonus: ['Бонус к плодоносности', `${certificate.fertility_bonus}%`, 'Насколько % увеличится характеристика "плодоносность" у птицы'],
                    care_bonus     : ['Бонус к заботе', `${certificate.care_bonus.toLocaleString()}%`, 'Насколько % увеличится' +
                    ' характеристика "Бонус за заботу" у птицы'],
                    demand_bonus   : ['Бонус на спрос', `${certificate.demand_bonus.toLocaleString()}%`, 'Насколько % увеличится' +
                    ' характеристика "спрос" у птицы'],
                    litter_bonus   : ['Бонус на кол-во помета', `${certificate.litter_bonus.toLocaleString()}%`, 'Насколько % увеличится' +
                    ' характеристика "количество помёта" у птицы'],
                    price_bonus    : ['Бонус к цене яиц', `${certificate.price_bonus.toLocaleString()}%`, 'Насколько % увеличится' +
                    ' характеристика "цена яйца" у птицы'],
                    price          : ['Цена', `${certificate.price.toLocaleString()}руб.`],
                };
            } else return false
        }
    },
    actions  : {
        async fetchCertificates(context) {
            let res: ICertificate[] | boolean = await new Req('get', 'api/certificates').send();
            if (res) context.commit('setCertificates', res);
        },
        async createCertificate({commit}, form) {
            let res: ICertificate | boolean = await new Req('post', 'api/certificates').send(form);
            if (res) commit('addCertificate', res); // add new certificate to list

            return !!res; // return success
        },
        async updateCertificate({
                                    commit,
                                    dispatch
                                }, form) {

            let res: boolean = await new Req('post', `api/certificates/${form.id}`)
                .send({
                    ...form,
                    _method: 'PATCH' // set method to update
                });

            if (res) dispatch('fetchCertificates'); // load all certificates

            return res; // return success
        },
        async deleteCertificate({commit}, id) {
            let res: boolean = await new Req('delete', `api/certificates/${id}`).send();

            if(res) commit('deleteCertificate', id);
        },
        async fetchCertificate({commit}, id) {
            let res = await new Req('get', `api/certificates/${id}`).send();

            if(res) commit('setCurrentCertificate', res);
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
