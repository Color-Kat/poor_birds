import {currenciesTypes} from "./currenciesTypes";
import {ICurrency} from "./ICurrency";

export type currenciesListType = {
    [key in currenciesTypes] : ICurrency[];
};
