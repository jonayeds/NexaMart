import React from 'react'
import CreateBrandModal from './CreateBrandModal'

const ManageBrand = () => {
  return (
    <div>
        <div className='flex justify-between px-[4vw]'>
            <h1>Manage Brand</h1>
            <CreateBrandModal/>
        </div>
    </div>
  )
}

export default ManageBrand