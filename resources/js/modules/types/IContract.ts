export interface IContract {
    created_at: string | null;
    description: string;
    id: number;
    image: string | null
    isDonate: boolean;
    name: string
    payload: any;
    price: number;
    script_name: string;
    updated_at: string | null;
}
