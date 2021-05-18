<template>
    <div>
        <b-modal id="modal-contract-buy" header-bg-variant="success" hide-footer>
            <p class="my-4">Поздравляем! Вы заключили новый контракт.</p>
        </b-modal>

        <b-modal id="modal-contract-error" header-bg-variant="danger" hide-footer>
            <p class="my-4">У вас уже есть этот контракт</p>
        </b-modal>

        <Loader v-if="loading" />

        <b-card v-else>
            <!--     contract not found       -->
            <b-alert show v-if="!getContract" variant="warning">
                <span>Вы не можете заключить такой контракт:(</span>
                <b-button :to="{name: 'contracts'}" size="sm" class="mt-2" variant="danger">
                    Посмотреть другие контракты
                </b-button>
            </b-alert>

            <div v-else>
                <h2 class="text-center">{{ getContract.name }}</h2>
                <img width="100%" :src="`/storage/contracts/${getContract.image}`" :alt="getContract.name">
                <span class="p-2">{{getContract.description}}</span>
                <hr>
                <Field :field="getContract.efficiency"></Field>
                <Field :field="getContract.price"></Field>

<!--                <div v-if="getUserContractsIds.indexOf(getContract.id) == -1">-->
<!--                    <b-button-->
<!--                        v-if="!getContract.isDonate"-->
<!--                        class="mt-3"-->
<!--                        variant="primary"-->
<!--                        @click="(e)=>{buy(getContract, e);}"-->
<!--                    >-->
<!--                        Купить-->
<!--                    </b-button>-->
<!--                    <b-button v-else class="mt-3" variant="primary">Купить за донат</b-button>-->
<!--                </div>-->

<!--                <b-alert show variant="warning" class="mt-3" v-else>Эта лопата уже куплена!</b-alert>-->

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
        contract : null,
        loading: true,
    }),
    computed  : {
        ...mapGetters(['getContract', 'getUserContractsIds'])
    },
    methods   : {
        ...mapActions(['fetchContract', 'buyContract']),
        async buy(contract, e) {
            let result = await this.buyContract(contract.id);

            // contract is buying
            if (result) {
                e.target.disabled=true; // disable button
                this.$bvModal.show('modal-contract-buy');
            } else {
                this.$bvModal.show('modal-contract-error');
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
