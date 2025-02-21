import { IBrand } from "./brand";
import { ICategory } from "./category";

export interface IProduct {
    availableColors:string[];
    brand:IBrand;
    category:ICategory;
    createdAt:string;
    description:string;
    imageUrls:string[];
    isActive:boolean;
    keyFeatures:string[];
    name:string;
    offerPrice: number | null;
    price:number;
    ratingCount:number;
    avarageRating:number;
    shop:{
        shopName:string;
        _id:string;
    };
    slug:string;
    stock:number;
    updatedAt:string;
    weight:number;
    _id:string;
    specification:{[key:string]: string}[]
}