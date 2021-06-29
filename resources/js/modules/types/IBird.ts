import {ISeller} from "./ISeller";

export interface IBird{
    id: number;
    string_id: string | null;
    name: string;
    description: string | null
    quest: string | null;
    image: string | null;
    fertility: number;
    care: number;
    demand: number;
    litter: number;
    egg_price: number;
    price: number;

    sellers?: ISeller[] | null
    certificate_id?: number | null;

    created_at: string | null;
    updated_at: string | null;
}
