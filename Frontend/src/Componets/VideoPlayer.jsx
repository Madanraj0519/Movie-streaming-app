import React, { lazy, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../Constant/Api_key';
import { FaHeart } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FaBackwardFast } from "react-icons/fa6";
import {fetchMovieVideos} from "../features/Movie/movieVideo";
import { fetchMovieDetails } from '../features/Movie/movieDetail';
import { Link } from 'react-router-dom';
import {toast} from "react-hot-toast";
import Loading from './Loading';
import ErrorContainer from './ErrorContainer';

const VideoPlayer = () => {

    const {id} = useParams();
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const {selectedMovie, loading, error} = useSelector((state) => state.movieDetail);
    const {currentUser} = useSelector((state) => state.authUser);
    const {videos, loading: videoLoading, error: videoError} = useSelector((state) => state.movieVideos);
    const randomVideo = Math.floor(Math.random() * videos.length);
    const [showVideo, setShowVideo] = useState(true);
    
    // console.log(currentUser.user);

    useEffect(() => {
      dispatch(fetchMovieDetails(id));
      dispatch(fetchMovieVideos(id));
    },[dispatch, id]);

    const handleVideoWatch = () => {
      toast.error('Sig-in your account to watch video');
      setTimeout(() => {navigate('/sign-in');}, 1000)

      return <Loading />
    }

    if(videoLoading || loading){
      return <Loading />
    }

    if(videoError || error){
      return <ErrorContainer />
    }

    if(!videos || !selectedMovie){
      return <ErrorContainer />
    }

  return (
    <div className='w-full h-screen md:h-full' >
      <div className="aspect-w-16 aspect-h-9 p-6 md:p-20">
        <div className='flex justify-between items-center w-full bg-[#090e3d80] border border-zinc-700 
        rounded-md h-[80px] px-4'>
          <div className='flex gap-3 justify-start items-center'>
            <Link to={`/detail/${id}`}><FaBackwardFast className='text-xl md:text-2xl cursor-pointer text-zinc-300' /></Link>
            <h3 className='text-sm md:text-3xl'>{selectedMovie.original_title}</h3>
          </div>
          <div className='flex gap-1 md:gap-3 justify-center items-center'>
            <div className='bg-zinc-600 p-2 md:p-3 rounded-lg'>
             <FaHeart className='text-sm hover:text-red-500 
             cursor-pointer md:text-2xl' />
            </div>
            <button className='bg-red-500 p-1 md:p-3 text-sm md:text-xl'>Download</button>
          </div>
        </div>
        {
          showVideo ?
          (
            <div className='relative opacity-70'>
              <img src={`${IMAGE_BASE_URL}${selectedMovie.backdrop_path
              }`} alt={selectedMovie.original_title} loading='lazy'
               className='w-full h-[280px] md:h-[100vh] mt-5'/>
               <div onClick={()=>setShowVideo(false)} className='absolute top-[100px] left-[100px] md:top-[300px] md:left-[600px] opacity-100
                bg-zinc-200 md:w-20 md:h-20 p-4 rounded-full border border-red-400 cursor-pointer'>
                 <TbPlayerPlayFilled className=' text-xl md:text-5xl text-red-500' />
               </div>
            </div>
          ) : 
            currentUser ? (
              <iframe
               className="w-full h-[280px] md:h-screen mt-5"
               src={`https://www.youtube.com/embed/${videos[randomVideo].key}?autoplay=1`}
               title="YouTube video player"
               frameborder="0"
               onLoad={lazy}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen
               ></iframe>
            ) : (
              handleVideoWatch()
            )
          }
      </div>
    </div>
  )
}

export default VideoPlayer