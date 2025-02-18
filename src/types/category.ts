export interface ICategory{
    name:string;
    description:string;
    _id:string;
    icon:string;
    slug:string;
    createdAt:string;
    updatedAt:string;
    children:ICategory[];
    parent:string| null;
    createdBy:string;
    isActive:boolean
}