import {ISeller} from "./ISeller";
import {ICertificate} from "./ICertificate";
import {IBird} from "./IBird";

export interface ISellerWithCertificates extends ISeller{
    certificate: ICertificate;
    birds: IBird[];
}
