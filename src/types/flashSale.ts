import { IProduct } from "./product";

export interface IFlashSale {
    _id:string;
    product:IProduct;
    createdAt:string;
    createdBy:string;
    discountPercentage:number;
    updatedAt:string;
}