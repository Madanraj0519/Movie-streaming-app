import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

function MovieCard({movie}) {
  return (
    <div className='relative hover:border-[3px] border-gray-400 cursor-pointer
        hover:scale-110 transition-all duration-150  rounded-lg ease-in-out'>
    <Link to={`/detail/${movie.id}`}>
      <div className='w-[110px] md:w-[200px]'>
        <img className=' rounded-lg' src={IMAGE_BASE_URL+movie.poster_path} loading='lazy' alt='' />
      </div>
    </Link>
    <div className='absolute bottom-0 right-0 z-0 w-full opacity-70 bg-black h-14'>
      <h5 className='absolute bottom-0 px-0.5 text-sm md:text-base  text-white'>{movie.original_name || movie.title}</h5>
      <div className='absolute bottom-0 z-20 right-0 w-6 md:w-8 h-6 md:h-8 opacity-100 p-1 md:p-1.5 cursor-pointer
         rounded-md bg-red-500 hover:bg-zinc-100 text-base md:text-xl text-white hover:text-red-500'>
         <FaHeart/>
      </div>
    </div>
    </div>
  )
}

export default MovieCard