export interface IShovel {
    id: number;
    name: string;
    image: string | null;
    price: number | null;
    donate_price?: number | null;
    efficiency: number;

    pivot?: {
        isActive: number;
        shovel_id: number;
        user_id: number;
    }

    created_at: string | null;
    updated_at: string;
}
