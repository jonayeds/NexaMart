export interface IUser{
    name:string;
    email:string;
    userId:string;
    hasShop:boolean;
    isActive:boolean;
    role:'user'| 'admin';
    iat?:number;
    exp?:number;
}