import {ISeller} from "./ISeller";

export interface IBird{
    id: number;
    name: string;
    description: string;
    quest: string | null;
    image: string | null;
    fertility: number;
    care: number;
    demand: number;
    litter: number;
    egg_price: number;
    price: number;
    sellers: ISeller[] | null

    created_at: string | null;
    updated_at: string | null;
}
