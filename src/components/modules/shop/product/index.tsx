"use client";


import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { deleteAProduct } from "@/services/Product";
import { IProduct } from "@/types/product";

type TProductsProps = {
  products: IProduct[];
};

const ManageProducts = ({ products }: TProductsProps) => {
  const columns: ColumnDef<IProduct>[] = [
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
        <div className="flex items-center justify-start">
          {/* <Dialog>
            <DialogTrigger asChild>
              <Trash2
                className="text-red-500 cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Delete Item</DialogTitle>
              <DialogDescription>Are you sure to delete <span className="text-red-500 font-semibold">{row.original.name}</span>? This action cannot be undone.</DialogDescription>
              <DialogFooter className="flex justify-end gap-4">
                <DialogClose className="px-4 hover:bg-white focus:ring-0 rounded-xl duration-200">
                  Cancel
                </DialogClose>
                
                <DialogClose
                onClick={() => handleDeleteRow(row.original._id)}
                 className="bg-red-500 text-white px-4 py-2 rounded-xl">Confirm</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
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
        <Link href={"/user/shop/products/add-product"} className="bg-primary px-4 py-3 rounded-xl items-center text-white gap-2 flex ">Create Product <Plus/></Link>
      </div>
      <NMTable data={products} columns={columns} />
    </div>
  );
};

export default ManageProducts;
