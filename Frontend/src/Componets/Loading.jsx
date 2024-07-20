import React from 'react';
import loading from "../assets/Videos/loading.gif";

const Loading = () => {
  return (
    <div className='bg-black min-h-[90vh]'>
        <div className='flex justify-center items-center text-center '>
          <img className='w-[300px] h-[300px] mt-28' src={loading} />
        </div>
    </div>
  )
}

export default Loading