<template>
    <div>
        <b-modal id="modal-contract-buy" header-bg-variant="success" hide-footer>
            <p class="my-4">Поздравляем! Вы заключили новый контракт.</p>
        </b-modal>

        <b-modal id="modal-contract-no-money" header-bg-variant="danger" hide-footer>
            <p class="my-4">У вас недостаточно средств</p>
        </b-modal>

        <b-modal id="modal-contract-no-gtn" header-bg-variant="danger" hide-footer>
            <p class="my-4">У вас недостаточно средств! На счету: {{getUserWallets.GTN}} GTN</p>
        </b-modal>

        <Loader v-if="loading"/>

        <b-card v-else class="card-rounded shadow">
            <!--     contract not found       -->
            <b-alert show v-if="!getContract" variant="warning">
                <span>Вы не можете заключить такой контракт:(</span>
                <b-button :to="{name: 'contracts'}" size="sm" class="mt-2" variant="danger">
                    Посмотреть другие контракты
                </b-button>
            </b-alert>

            <div v-else>
                <h1 class="text-center mb-3">{{ getContract.name }}</h1>
                <img width="100%" :src="`/storage/contracts/${getContract.image}`" :alt="getContract.name">
                <span class="p-2">{{ getContract.description }}</span>
                <hr>
                <Field :field="getContract.price"></Field>

                <!--         check is buying contract       -->
                <div v-if="getUserContractsIds.indexOf(getContract.id) == -1">
                    <!--        BUY BUTTON        -->
                    <b-button
                        v-if="!getContract.isDonate"
                        class="mt-3 w-100"
                        variant="primary"
                        @click="(e)=>{buy(getContract, e);}"
                    >
                        Купить
                    </b-button>

                    <!--        DONAT BUTTON        -->
                    <b-button
                        v-else
                        class="mt-3 w-100"
                        variant="warning"
                        @click="(e)=>{buy(getContract, e);}"
                    >
                        Купить за густинианы
                    </b-button>
                </div>

                <!--        already purchased        -->
                <b-alert show variant="warning" class="mt-3" v-else>Вы уже заключили контракт!</b-alert>

                <hr>

                <h2 class="text-center">Зачем нужны контракты??</h2>
                <span class="mb-2">
                    С некоторыми людьми вы можете заключить контракт,
                    тогда они будут помогать вам с вашей фермой.
                    Например, если у вас есть контракт с дядей Колей, то вы будете не выбрасывать
                    помёт, а продавать его.
                    Или если у вас есть контракт с трактористом дядей Федей, то он будет сам за вас убираться
                    за птицами, и вам не нужно будет марать о них руки.
                </span>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Field from '../../components/fields/Field'
import Loader from "../../components/Loader";

export default {
    name      : "ContractPage",
    components: {
        Loader,
        Field
    },
    data      : () => ({
        contract: null,
        loading : true,
    }),
    computed  : {
        ...mapGetters(['getContract', 'getUserContractsIds', 'getUserWallets']),
    },
    methods   : {
        ...mapActions(['fetchContract', 'buyContract', 'fetchUser']),
        async buy(contract, e) {
            // send request and get result
            let result = await this.buyContract(contract.id);

            // contract is buying
            if (result) {
                e.target.disabled = true; // disable button
                this.fetchUser(); // update user currencies data
                this.$bvModal.show('modal-contract-buy'); // show success modal
            } else {
                // show error modal
                if (contract.isDonate) this.$bvModal.show('modal-contract-no-gtn'); // for gtn donate
                else this.$bvModal.show('modal-contract-no-money'); // for RUB money
            }
        }
    },
    async mounted() {
        await this.fetchContract(this.$route.params.id);
        this.loading = false;
    }
}
</script>

<style scoped>

</style>
