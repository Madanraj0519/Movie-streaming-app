import React, {useRef} from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
const screenWidth=window.innerWidth;


function Slider({movies}) {
    const elementRef=useRef();

    const sliderRight=(element)=>{
        element.scrollLeft+=screenWidth-110
    }
    const sliderLeft=(element)=>{
        element.scrollLeft-=screenWidth-110
    }

  return (
    <div>
      <div className='opacity-25 hover:opacity-100'>
       <HiChevronLeft className="hidden md:block text-white text-[30px] md:text-[60px] absolute
        mx-2 md:mx-2 mt-[220px] cursor-pointer " 
        onClick={()=>sliderLeft(elementRef.current)}/>
        <HiChevronRight className='hidden md:block text-white text-[30px] md:text-[60px] absolute
        mx-2 md:mx-2 mt-[200px] cursor-pointer right-0' 
        onClick={()=>sliderRight(elementRef.current)}/>
      </div>

   
    <div className='scroll flex overflow-x-auto w-full px-2 md:px-16 py-2 md:py-4
    scrollbar-none scroll-smooth' ref={elementRef}> 
        {movies.map((item)=>(
            <>
            <img src={IMAGE_BASE_URL+item.backdrop_path} 
            className='min-w-full  md:h-[410px] object-center
             mr-5 rounded-md hover:border-[4px]
            border-gray-400 transition-all duration-100 ease-in'
            loading='lazy' alt={item.original_name}/>
             </>   
        ))}
    </div>
    </div>
  )
}

export default Slider