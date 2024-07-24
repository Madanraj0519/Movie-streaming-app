import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

const SearchResultContainer = ({searchResult}) => {

  return (
    <>
    {
        searchResult.slice(0,18).map((movie) => (
          <div className='relative hover:border-[3px] w-full border-gray-400 cursor-pointer
             hover:scale-110 transition-all duration-150  rounded-lg ease-in-out'>
            <Link to={`/detail/${movie.id}`}>
             <div className='w-[110px] md:w-[210px]'>
               <img className=' rounded-lg' src={IMAGE_BASE_URL+movie.poster_path} alt={movie.original_name} loading='lazy' />
              </div>
             </Link>
          </div>
        ))
    }
    </>
  )
}

export default SearchResultContainer