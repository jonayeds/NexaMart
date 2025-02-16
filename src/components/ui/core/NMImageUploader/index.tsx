import React, { useState } from 'react'
import { Input } from '../../input'
import Image from 'next/image'

type TImageUploaderProps ={
    imageFiles: File[]| [];
    setImageFiles:React.Dispatch<React.SetStateAction<[] | File[]>>
}


const NMImageUploader = ({imageFiles, setImageFiles}:TImageUploaderProps) => {
    
    const [imagePreview, setImagePreview] = useState<string[]|[]>([])
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
    <div>
        <label htmlFor='image-uploader' className='bg-gray-100  w-full h-16 md:h-28 md:size-28 size-16 flex items-center  justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-white'>Upload logo</label>
        {/*  'image/*' to accept all image extensions */}
        <Input className='hidden' id='image-uploader' onChange={handleImagechange} type='file' multiple accept='image/*'/>
        <div>
            {
                imagePreview.map((preview,idx)=>(
                    <Image src={preview} key={idx} width={100} height={100} alt='images' />
                ))
            }
        </div>
        
    </div>
  )
}

export default NMImageUploader