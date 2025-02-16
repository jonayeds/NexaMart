
import { cn } from '@/lib/utils';
import { Input } from '../../input'

type TImageUploaderProps ={
    imageFiles: File[]| [];
    setImageFiles:React.Dispatch<React.SetStateAction<[] | File[]>>
    setImagePreview:React.Dispatch<React.SetStateAction<[] | string[]>>
    lebel:string;
    className?:string

}


const NMImageUploader = ({imageFiles, setImageFiles, setImagePreview, lebel, className}:TImageUploaderProps) => {
    
    
    const handleImagechange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files![0]
        setImageFiles((prev)=>[...prev, file])
        if(file){
            const reader = new FileReader() //--> reads image file and converts into data url link
            reader.onloadend = () =>{ // --> executes callback function when reading of the file is done
                setImagePreview((prev)=>[...prev, reader.result as string ]) // --> setting image preview state from from the result
            }
            reader.readAsDataURL(file)
            e.target.value = ""
        }
    }
    console.log(imageFiles)
  return (
    <div className={cn("", className)}>
        <label htmlFor='image-uploader' className='bg-gray-100  w-28 h-28  size-28  flex items-center  justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-white'>{lebel}</label>
        {/*  'image/*' to accept all image extensions */}
        <Input className='hidden' id='image-uploader' onChange={handleImagechange} type='file' multiple accept='image/*'/>
        
    </div>
  )
}

export default NMImageUploader