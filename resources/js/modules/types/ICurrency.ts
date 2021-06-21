import {currenciesTypes} from "./currenciesTypes";

export interface ICurrency{
    id: number;
    currency: currenciesTypes;
    exchange: currenciesTypes;
    rate: number;

    created_at: string;
}
