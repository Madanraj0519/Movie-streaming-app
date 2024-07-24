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
    </div>
  )
}

export default MovieCard