import {ISeller} from "../../modules/types/ISeller";
import {ISellerWithCertificates} from "../../modules/types/ISellerWithCertificates";
import Req from "../../modules/Req";

export default {
    state    : {
        sellers      : [],
        currentSeller: null
    },
    getters  : {
        getSellers(state): ISeller {
            // console.log(state.sellers)
            return state.sellers;
        },
        getSeller(state) {
            const seller: ISellerWithCertificates = state.currentSeller;
            const certificate                     = seller.certificate;

            if (seller) {
                return {
                    id          : seller.id,
                    image       : seller.image,
                    name        : ['Название', seller.name],
                    description : ['Описание', seller.description],
                    quest       : seller.quest,
                    demand      : ['Бонус на спрос', `${seller.demand}%`],
                    discountText: ['Бонус к цене', `${seller.discount}%`],
                    discount    : seller.discount,
                    // birds_count : ['Кол-во птиц для договора', `${seller.birds_count}`],
                    price: ['Цена договора', `${seller.price.toLocaleString()}руб`],
                    birds: seller.birds,

                    demand_bonus   : certificate ? certificate.demand_bonus : 1,
                    fertility_bonus: certificate ? certificate.fertility_bonus : 1,
                    care_bonus     : certificate ? certificate.care_bonus : 1,
                    litter_bonus   : certificate ? certificate.litter_bonus : 1,
                    price_bonus    : certificate ? certificate.price_bonus : 1,

                    certificate_name: certificate ? certificate.name : false,
                    certificate_id  : certificate ? certificate.id : false,
                };
            } else return false
        }
    },
    actions  : {
        async fetchSellers(context) {
            let res: ISeller[] | boolean = await new Req('get', 'api/sellers')
                .send<ISeller[]>();
            // fill sellers list
            context.commit('setSellers', res);
        },
        async createSeller({commit}, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            let res: ISeller | boolean = await new Req('post', 'api/sellers')
                .conf({headers: {'Content-Type': 'multipart/form-data'}}) // set header to upload image
                .send<ISeller>(formData);

            // add new seller to list
            if (res) commit('addSeller', res);
            return !!res; // return success
        },
        async deleteSeller({commit}, id) {
            let res: boolean = await new Req('delete', `api/sellers/${id}`).send();
            if (res) commit('deleteSeller', id);
        },
        async updateSeller({
                               commit,
                               dispatch
                           }, form) {
            // convert object to form data
            let formData = new FormData();
            for (let key in form) {
                formData.append(key, form[key]);
            }

            formData.append('_method', 'PATCH'); // set PATCH method

            let res: boolean = await new Req('post', `api/sellers/${form.id}`)
                .conf({headers: {'Content-Type': 'multipart/form-data'}})
                .send(formData);

            if (res) dispatch('fetchSellers');
            return res;
        },
        async fetchSeller({commit}, id) {
            let res = await new Req('get', `api/sellers/${id}`).send();

            if (res) commit('setCurrentSeller', res);
            else commit('setCurrentSeller', false);
        },
    },
    mutations: {
        setSellers(state, sellers) {
            state.sellers = sellers;
        },
        addSeller(state, seller) {
            state.sellers.push(seller);
        },
        deleteSeller(state, id) {
            state.sellers.forEach((sellers, i) => {
                if (sellers.id === id)
                    state.sellers.splice(i, 1);
            });
        },
        setCurrentSeller(state, seller) {
            state.currentSeller = seller;
        }
    }
}
