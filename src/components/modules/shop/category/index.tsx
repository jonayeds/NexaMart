"use client"
import { ICategory } from "@/types/category";
import CreateCategorymodal from "./CreateCategorymodal";
import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {  Trash2 } from "lucide-react";
import { deleteACategory } from "@/services/Category";
import { toast } from "sonner";

type TCategoriesProps = {
  categories:ICategory[]
}

const ManageCategories = ({categories}:TCategoriesProps) => {
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: ()=> <div>Category Name</div>,
      cell:({row})=>(
        <div className="flex items-center gap-2">

        <Image 
          src={row.original?.icon}
          alt={row.original?.name}
          width={40}
          height={40}
          className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
          </div>

      )
    },
    {
      accessorKey: "isActive",
      header: ()=><div>isActive</div>,
      cell:({row})=>(
        <div className={`${row.original.isActive ? 'bg-green-400': 'bg-red-400'} rounded-full  w-max px-4 py-1 `}>
          <span>{`${row.original.isActive}`}</span>
        </div>
      )
    },
    {
      accessorKey: "action",
      header: "Action",
      cell:({row})=>(
        <div className="flex items-center justify-start">
          <Trash2 onClick={()=>handleDeleteRow(row.original._id)} className="text-red-500" />
        </div>
      )
    },
  ]

  const handleDeleteRow = async (rowId:string)=>{
    const res = await deleteACategory(rowId)
    console.log(res)
    if(res?.success){
      toast.success(res.message)
    }
  }
  
  return (
    <div>
      <div className="flex  justify-between px-[4vw] items-center">
        <h1  className="text-[4vw] md:text-[2vw]  ">Manage Categories</h1>
        <CreateCategorymodal/>
      </div>
        <NMTable data={categories} columns={columns} />
    </div>
  );
};

export default ManageCategories;
