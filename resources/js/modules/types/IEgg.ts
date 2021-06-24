export interface IEgg {
    id: number;
    name: string;
    price: number;
    count: number;
    demand: number;
    fine: number;
    litter: number;
    cared: number;
    collected: number;

    user_id: number;
    bird_seller_id: number;
    birds_count: number;

    created_at: string | null;
    updated_at: string | null
}
