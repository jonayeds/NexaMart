"use client"
import React from 'react'
import CreateBrandModal from './CreateBrandModal'
import { NMTable } from '@/components/ui/core/NMTable'
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteABrand } from '@/services/Brand';
import { IBrand } from '@/types/brand';

type TBrandProps ={
  brands: IBrand[]
}

const ManageBrand = ({brands}:TBrandProps) => {
  const columns: ColumnDef<IBrand>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.original?.logo}
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
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div
          className={`${
            row.original.isActive ? "bg-green-400" : "bg-red-400"
          } rounded-full  w-max px-4 py-1 `}
        >
          <span>{`${row.original.isActive}`}</span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center justify-start">
          <Dialog>
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
          </Dialog>
        </div>
      ),
    },
  ];

  const handleDeleteRow = async (rowId: string) => {
    const res = await deleteABrand(rowId);
    console.log(res);
    if (res?.success) {
      toast.success(res.message);
    }
  };


  return (
    <div>
        <div className='flex justify-between px-[4vw]'>
            <h1>Manage Brand</h1>
            <CreateBrandModal/>
        </div>
            <NMTable data={brands} columns={columns} />
    </div>
  )
}

export default ManageBrand