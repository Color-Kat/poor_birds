export interface ICertificate{
    id: number;
    name: string;
    care_bonus: number;
    demand_bonus: number;
    fertility_bonus: number;
    litter_bonus: number;
    price_bonus: number;
    grade: number;
    price: number;

    minimum_bird_price: number;
    created_at: string;
    updated_at: string;

}
