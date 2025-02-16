import React, { useState } from 'react'
import { Input } from '../../input'

const NMImageUploader = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([])
    const handleImagechange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files![0]
        setImageFiles((prev)=>[...prev, file])
    }
  return (
    <div>
        <label htmlFor='image-uploader' className='bg-gray-100  w-full h-16 md:h-28 md:size-28 size-16 flex items-center  justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-white'>Upload logo</label>
        {/*  'image/*' to accept all image extensions */}
        <Input className='hidden' id='image-uploader' onChange={handleImagechange} type='file' multiple accept='image/*'/>
    </div>
  )
}

export default NMImageUploader