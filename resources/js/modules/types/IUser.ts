import {IShovel} from "./IShovel";
import {IMySeller} from "./IMySeller";
import {IMyContract} from "./IMyContract";

export interface IUser{
    id: number;
    email: string;
    name: string;
    role: number;
    story: any; // JSON object with users data about story
    notified: number;

    money: number;
    BTC: number;
    GTN: number;
    USD:  number;
    bribe: number;

    my_contracts: IMyContract[];
    my_sellers: IMySeller[];
    my_shovels: IShovel[];
    other_data: any;

    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
}
