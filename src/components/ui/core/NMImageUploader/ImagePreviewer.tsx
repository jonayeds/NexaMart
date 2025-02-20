import Image from "next/image";
import { Button } from "../../button";
import { X } from "lucide-react";

type TImagePreviewer = {
    setImageFiles:React.Dispatch<React.SetStateAction<[] | File[]>>
    setImagePreview:React.Dispatch<React.SetStateAction<[] | string[]>>
    imagePreview:string[]| [];
    className?:string
}

const ImagePreviewer = ({setImageFiles,setImagePreview,imagePreview,className}:TImagePreviewer) => {
    const handelRemove = (index:number) =>{
        setImageFiles((prev)=> prev.filter((_,idx)=> idx !== index))
        setImagePreview((prev)=> prev.filter((_,idx)=> idx !== index))
    }

  return (
    <div className={className}>
        {
                imagePreview.map((preview,idx)=>(
                    <div key={idx} className={`lg:relative overflow-hidden w-28 h-28 border-dashed border-gray-400 border-2 rounded-md absolute  left-${idx*8} lg:left-0 ${(idx ===4) && ' left-32 '}  `}>

                    <Image src={preview}  width={500} height={500} alt='images' className="min-h-full min-w-fulls h-maxs w-maxs" />
                    <Button onClick={()=>handelRemove(idx)} className="bg-red-300 hover:bg-red-500 absolute top-0 right-0 w-5 h-5 rounded-full"><X className="w-3 h-3"/></Button>
                    </div>
                ))
            }
    </div>
  )
}

export default ImagePreviewer