import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {AiTwotoneDelete} from "react-icons/ai";
import {fetchWatchListMovies} from "../features/WatchList/watchList";
import { useDispatch} from 'react-redux';
import {toast} from "react-hot-toast";
import axiosInstance from "../Constant/Backend/axiosInstance";
import { FaHandPointLeft } from "react-icons/fa6";
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

const WatchList = () => {

    const dispatch  = useDispatch();
    const [userError, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    const { watchListMovies } = useSelector((state) => state.watchList);
    // console.log(watchListMovies.favorite);

    useEffect(() => {
      dispatch(fetchWatchListMovies());
    }, [dispatch, isDeleted]);


    const deleteWatchList = async(movieId) => {
      try{
        const response = await axiosInstance.delete(`/api/movie/deleteFavorite/${movieId}`);
  
        if(response.data.success === false){
          toast.error(response.data.message);
          setError(response.data.message);
        }
  
        toast.success(response.data.message);
        setIsDeleted(!isDeleted);
        navigate("/watchlist");
  
      }catch (error) {
        setError(error.message);
      }
    }

  return (
   <>
    {
      watchListMovies.favorite.length > 0 ? (
        <div className='scroll grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto overflow-clip gap-8
     scrollbar-none scroll-smooth pt-4 px-8 pb-4'>
     {
        watchListMovies.favorite.map((movie) => (
      <div className='relative'>
        <Link to={`/detail/${movie.movieData.id}`}>
          <div className='w-[110px] md:w-[200px] rounded-lg relative
            hover:border-[3px] border-gray-400 cursor-pointer
            hover:scale-110 transition-all duration-150 ease-in' key={movie.movieData.id}>
            <img src={IMAGE_BASE_URL+movie.movieData.poster_path} loading='lazy' alt='' />
          </div>
        </Link>
        <div className='absolute -bottom-3 -right-1 w-12 h-12 p-2 cursor-pointer
           rounded-full bg-[#000000d2]' onClick={() => deleteWatchList(movie._id)}>
          <AiTwotoneDelete className='text-3xl text-white' />
        </div>
       </div>
        ))
     }
    </div>
      ) : (
        <div className='w-full h-screen bg-black'>
          <div className='flex justify-center items-center'>
             <div>
                <h4 className='md:text-5xl mt-10'>Favorite movies is empty</h4>
                <div className='flex justify-center items-center gap-2 mt-5'>
                <p className='md:text-3xl'>Watch Movies and add it to your favorites</p>
                <Link className='md:text-3xl' to={'/home'}>
                   <FaHandPointLeft />
                </Link>
                </div>
             </div>
          </div>
        </div>
      )
    }
   </>
  )
}

export default WatchList