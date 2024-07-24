import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchSearchMovie, fetchSearchSeries} from "../features/Movie/searchMovie";
import {fetchTrendingMovies} from "../features/Movie/MoviesSlice"
import {FaSearch} from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loading from '../Componets/Loading';
import SearchResultContainer from '../Componets/SearchResultContainer';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

const Search = () => {

    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('movie');
    const dispatch = useDispatch();
    const { searchResult, loading, error, Query} = useSelector((state) => state.search);
    const {trendingMovies} = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchTrendingMovies());
    },[dispatch])

    const handleSearch = () => {
      if(searchType === 'movie') {
        dispatch(fetchSearchMovie(query));
      }else{
        dispatch(fetchSearchSeries(query));
      }
    }

    // console.log(Query);

    if(loading){
      return <Loading />
    }

    if(error){
      return <Loading />
    }

    if(!trendingMovies){
      return <div>Failed to fetch the trending movies</div>
    }


  return (
    <div>
        <div className='relative overflow-x-hidden flex w-full md:px-10 md:py-4
        scrollbar-none scroll-smooth shadow-2xl shadow-gray-800'>
          <div className='w-full opacity-40'>
          <img className='min-w-full h-[280px] md:h-[410px] object-cover md:object-center
             mr-5 rounded-md transition-all duration-100 ease-in' alt='searchBanner' loading='lazy'
             src={"https://149512919.v2.pressablecdn.com/wp-content/uploads/2021/12/philly-movies-hero-banner.jpg"} /> 
          </div>

          <div className='absolute flex justify-center items-center top-24 md:top-44 px-5 md:px-8 md:-ml-8 w-full font-mono'>
            <div className='relative flex justify-center items-center w-[350px] md:w-[950px] '>
             <input className='relative search w-full h-12 rounded-md text-black md:text-xl bg-slate-100 
             text-sm text-start px-2 md:text-center placeholder:text-slate-900'
              placeholder='Search for movies/series'
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
              onKeyDown={(e) => {
               e.key === 'Enter' && handleSearch();
              }}
              />
             <button className='absolute right-0 h-12 focus:outline-none border-none rounded-md top-[0px] bg-red-700'
             onClick={handleSearch}>
               <FaSearch className='text-lg md:text-xl text-slate-900'/>
            </button>
            </div>
        </div>
        </div>
       

        <div className='flex justify-end md:px-5 mb-10 px-4 mt-5 w-full'>
          <div className='relative w-[100px]bg-red-500'>
           <select className=' bg-[#090e3db0] border border-red-400 rounded-md w-[100px] md:w-[200px] h-[30px] md:h-[30px] cursor-pointer text-center 
           hover:bg-slate-100 hover:text-red-500 md:text-xl' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
             <option value="movie">Movie</option>
             <option value="tv">TV Show</option>
          </select>
          </div>
        </div>

        <div className='px-9 mb-4 text-2xl'>
          <h2 className='font-semibold'>{`Your ${searchType === "movie" ? "Movies" : "Tv Shows"} Search result`}</h2>
        </div>
        <div className='scroll grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 overflow-x-auto overflow-clip gap-4 md:gap-8
         scrollbar-none scroll-smooth pt-4 px-2 md:px-8 pb-4'>
       {
       Query !== '' ? 
          <SearchResultContainer searchResult={searchResult} />
          :
          trendingMovies.map((movie) => (
            <div className='relative'>
             <Link to={`/detail/${movie.id}`}>
               <div className='w-[110px] md:w-[200px] rounded-lg relative
                 hover:border-[3px] border-gray-400 cursor-pointer
                 hover:scale-110 transition-all duration-150 ease-in'>
                 <img src={IMAGE_BASE_URL+movie.poster_path} alt='' />
               </div>
             </Link>
            </div>
        ))
     }
        </div>
    </div>
  )
}

export default Search