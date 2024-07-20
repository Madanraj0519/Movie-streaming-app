import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

function HrMovieCard({movie}) {
  
  return (
   <>
    <Link to={`/detail/${movie.id}`}>
    <section className='hover:scale-110 transition-all duration-150 ease-in'>
        <img src={IMAGE_BASE_URL+movie.backdrop_path} 
        className='w-[110px] md:w-[260px] rounded-lg
        hover:border-[3px] border-gray-400 cursor-pointer' loading='lazy' alt=''/>
        <div className='flex justify-between items-center mt-1'>
         <h2 className='w-[110px] md:w-[260px] text-[#cacaca] 
         mt-2 text-xs md:text-sm '>{movie.original_name || movie.title}</h2>
         <FaHeart className='-ml-4 text-zinc-200 hover:text-red-500' />
        </div>
    </section>
   </Link>
   </>
  )
}

export default HrMovieCard