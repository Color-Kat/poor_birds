export interface ISeller {
    id: number;
    name: string;
    quest: string | null;
    description: string;
    image: string | null;
    discount: number;
    demand: number;
    price: number;
    certificate_id: number;
    pivot: {bird_id: number, seller_id: number};

    created_at: string | null;
    updated_at: string;
}
