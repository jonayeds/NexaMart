"use client";


import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Edit, Eye, Plus} from "lucide-react";
import { toast } from "sonner";

import Link from "next/link";
import { deleteAProduct } from "@/services/Product";
import { IProduct } from "@/types/product";
import PermissionDialog from "@/components/shared/PermissionDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import DiscountModal from "./DiscountModal";

type TProductsProps = {
  products: IProduct[];
};

const ManageProducts = ({ products }: TProductsProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]) 
  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            if(value){
              setSelectedIds(products.map(item => item._id))
            }else{
              setSelectedIds([])
            }
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if(value){
              setSelectedIds((prev)=> [...prev, row.original._id])
            }else{
              setSelectedIds((prev)=> prev.filter(p=> p !== row.original._id) )
            }
            row.toggleSelected(!!value)
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.original?.imageUrls[0]}
            alt={row.original?.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div>Category</div>,
      cell: ({ row }) => (
          <span>{`${row.original.category.name}`}</span>
      ),
    },
    {
      accessorKey: "brand",
      header: () => <div>Brand</div>,
      cell: ({ row }) => (
          <span>{`${row.original.brand.name}`}</span>
      ),
    },
    {
      accessorKey: "stock",
      header: () => <div>Stock</div>,
      cell: ({ row }) => (
          <span>{`${row.original.stock}`}</span>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div>Price</div>,
      cell: ({ row }) => (
          <span>{`${row.original.price}`}</span>
      ),
    },
    {
      accessorKey: "offerPrice",
      header: () => <div>Offer Price</div>,
      cell: ({ row }) => (
          <span>{`${row.original.offerPrice}`}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-2  justify-start">
          <Link href={`/user/shop/products/product`}><Eye /></Link>
          <Link href={`/user/shop/products/update-product/${row.original._id}`}><Edit /></Link>

          <PermissionDialog handler={handleDeleteRow} id={row.original._id} name={row.original.name} type="delete" />
          
        </div>
      ),
    },
  ];

  const handleDeleteRow = async (rowId: string) => {  
    const res = await deleteAProduct(rowId);
    console.log(res);
    if (res?.success) {
      toast.success(res.message);
    }
  };

  return (
    <div>
      <div className="flex  justify-between px-[4vw] items-center">
        <h1 className="text-[4vw] md:text-[2vw]  ">Manage Products</h1>
        <div className="flex gap-4 items-center">
        <Link href={"/user/shop/products/add-product"} className="bg-primary px-4 py-3 rounded-xl items-center text-white gap-2 flex ">Create Product <Plus/></Link>
        <DiscountModal selectedProducts={selectedIds}/>
        </div>
      </div>
      <NMTable data={products} columns={columns} />
    </div>
  );
};

export default ManageProducts;
