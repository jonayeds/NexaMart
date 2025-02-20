import { Trash2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";

interface IPermissionDialogProps {
    type:"upload"| "update" | "delete";
    handler: (id:string) => Promise<void>;
    id:string;
    name:string;

}



const PermissionDialog = ({type, handler, id, name}:IPermissionDialogProps) => {
  return (
    <Dialog>
            <DialogTrigger asChild>
              <Trash2
                className="text-red-500 cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Delete Item</DialogTitle>
              
              <DialogDescription>
                
                Are you sure to {type} <span className={` ${type === "delete" && "text-red-500" } ${type === "update" && "text-yellow-500" } ${type === "upload" && "text-green-500" } font-semibold`}>{name}</span>? This action cannot be undone.
                </DialogDescription>
              <DialogFooter className="flex justify-end gap-4">
                <DialogClose className="px-4 hover:bg-white focus:ring-0 rounded-xl duration-200">
                  Cancel
                </DialogClose>
                
                <DialogClose
                onClick={() => handler(id) }
                 className={` ${type === "delete" && "bg-red-500" } ${type === "update" && "bg-yellow-500" } ${type === "upload" && "bg-green-500" }   text-white px-4 py-2 rounded-xl`}>Confirm</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
  )
}

export default PermissionDialog