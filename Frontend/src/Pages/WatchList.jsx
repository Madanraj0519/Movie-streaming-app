import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiTwotoneDelete} from "react-icons/ai";
import {toast} from "react-hot-toast";
import axiosInstance from "../Constant/Backend/axiosInstance";
import { FaHandPointLeft } from "react-icons/fa6";
import { BASE_BACKEND_URL } from '../Constant/Backend/constant';
import { useSelector } from 'react-redux';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";


const WatchList = () => {

    const [userError, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const { currentUser } = useSelector(state => state.authUser);

    // console.log(currentUser.user._id);

    useEffect(() => {
      const fetchMovies = async() => {
        const res = await fetch(`${BASE_BACKEND_URL}/api/movie/getFavorite/${currentUser.user._id}`);
        const data = await res.json();
        setData(data.favorite);
      }

      fetchMovies();

    }, [isDeleted]);

    // console.log(data);


    const deleteWatchList = async(movieId) => {
      try{
        const response = await axiosInstance.delete(`/api/movie/deleteFavorite/${movieId}`);
  
        if(!response){
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
      data.length > 0 ? (
        <div className='scroll grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 overflow-x-auto overflow-clip gap-8
     scrollbar-none scroll-smooth pt-4 px-8 pb-4'>
     {
        data.map((movie) => (
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