import React, { useEffect} from 'react';
import { useParams } from 'react-router';
import { IMAGE_BASE_URL } from '../Constant/Api_key';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovieDetails } from '../features/Movie/movieDetail';
import {fetchMovieVideos} from "../features/Movie/movieVideo";
import {fetchCastFromMovie} from "../features/Movie/castSlice";
import {signInStart, signInSuccess, signInFailure} from "../features/Auth/userAuthSlice";
import {FaRegPlayCircle} from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { FaHouse, FaHeart } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import StarRating from '../Componets/StarRating';
import Loading from '../Componets/Loading';
import ErrorContainer from '../Componets/ErrorContainer';
import toast from 'react-hot-toast';
import axiosInstance from '../Constant/Backend/axiosInstance';


const Details = () => {

  const {id} = useParams();
  const dispatch  = useDispatch();
  const {selectedMovie, loading, error} = useSelector((state) => state.movieDetail);
  const {selectedCast, loading : castLoading, error: castError, } = useSelector((state) => state.castDetails);


  // console.log(selectedMovie);
  // console.log(selectedCast);
  // console.log(actorDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchCastFromMovie(id));
    dispatch(fetchMovieVideos(id));
  },[dispatch, id]);

  const handleWatchList = async(movie) => {
    // dispatch(fetchFavoriteMovies(movie));
    try {
      dispatch(signInStart());
      const response = await axiosInstance.post('/api/movie/addFavorite', {
        movieData : movie
      });
    
      if(!response){
        dispatch(signInFailure(response.data));
        toast.error("This movie is already in the favorites list");
      }

      dispatch(signInSuccess(response.data));
      toast.success("Movie added successfully");

      // console.log(response);
      
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error("This movie is already in the favorite list");
  }
  }


  if (loading || castLoading) {
    return <Loading />;
  }

  if (error || castError) {
    let msg = error || castError
    return <ErrorContainer message={msg} />;
  }

  if (!selectedMovie) {
    return <ErrorContainer message={"Movie details not found."} />;
  }

  if (!selectedCast) {
    return <div>Casts details not found.</div>;
  }

  return (
    <div className='detail-container relative overflow-y-scroll block '>
      <div className='opacity-10 left-0 right-0'>
            <img src={`${IMAGE_BASE_URL}${selectedMovie.backdrop_path
            }`} alt={selectedMovie.original_title} loading='lazy'
            className='w-full h-screen'/>
      </div>
      <div className='content flex justify-center items-center w-full absolute top-2 '>
       <div className='flex flex-col w-full h-full p-5 md:mx-16'>
        <div className='flex flex-col md:flex-row  justify-center items-center w-full h-full p-5 '>
          <div className='h-full w-full'>
            <Link to={'/home'}><button className='mb-3'>Back</button></Link>
            <img className='md:h-[500px] md:w-[400px] border border-zinc-200  
            rounded-md shadow-xl shadow-gray-800' loading='lazy' src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`}
            alt={selectedMovie.original_title} />
          </div>
          <div className='md:p-5 mt-5'>
           <div className='subTitle text-[#f9f9f9f] text-base font-semibold md:text-5xl mx-24 md:mx-0'>{selectedMovie.original_title}</div>
              <div className='subTitle flex gap-3 text-[#f9f9f9f] text-base md:text-lg mt-10 mx-24 md:mx-0'>
                <div className='flex flex-col md:flex-row gap-3'>
                  <div className='flex justify-center items-center gap-3'>
                    <p className='bg-red-600 w-16 text-center px-1 rounded-sm'>HD4k</p>
                     <div className='flex gap-2'>
                     {
                       selectedMovie.genres.slice(0,3).map((genre) => (
                      <button className='bg-white p-1 text-xs text-black whitespace-nowrap'>{genre.name}</button>
                       ))
                     }
                     </div>
                  </div>
                  <div className='flex gap-3 flex-col md:flex-row'>
                     <p className='flex gap-2 items-center md:whitespace-nowrap'><IoCalendarOutline className='text-red-500' /> {selectedMovie.release_date}</p>
                     <p className='flex gap-2 items-center md:whitespace-nowrap'><CiClock1 className='text-red-500' />{(selectedMovie.runtime / 60).toFixed(2)} hrs</p>
                   </div>
                </div>
              </div>
              <div className='space-x-2 text-sm md:text-base  mx-20 md:mx-0 mb-10 mt-3  text-[#f9f9f9] '>{selectedMovie.overview}</div>
              <div className='flex justify-center items-center md:max-w-[600px] h-auto py-10 bg-[#050716ab]'>
                 <div className='flex justify-center gap-10 items-center'>
                    <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-10 items-center'>
                      <div className='flex justify-center gap-4 md:gap-10 items-center'>
                          <div className='mt-2 flex items-center gap-2'>
                              <h4 className='text-red-500 flex'>Vote:</h4>
                              <p className='text-white'>{(selectedMovie.vote_average).toFixed(1)}/10</p>
                          </div>
                          <div className='h-16 hidden md:block bg-white w-[0.5px]'></div>
                          <div className='flex items-center gap-2 '>
                             <p>Language:</p>
                             <p>{selectedMovie.spoken_languages.length > 0 &&
                               selectedMovie.spoken_languages[0].english_name}</p>
                          </div>
                      </div>
                      <Link to={`/watch/${id}`} className='flex justify-center w-full'>
                       <button className='flex w-[150px] text-zinc-300 rounded-full border-2
                        border-red-500 bg-[#070d37ab] justify-center items-center gap-5 hover:bg-red-500 hover:border-none'><FaRegPlayCircle />Watch</button>
                      </Link>
                    </div>
                 </div>
              </div>
              <div className='mx-20 md:mx-0'>
               <div className='flex justify-center  md:justify-start gap-5 items-center '>
                <div className='mt-3 p-2 flex items-center gap-2 cursor-pointer bg-red-600 w-10 h-10 
                text-center rounded-md hover:bg-black hover:text-white transition-all duration-100 scale-95' onClick={() => handleWatchList(selectedMovie)}>
                  <FaHeart className='text-2xl' />
                </div>
                <p className='mt-3 p-1 flex items-center gap-2 bg-red-600 w-20 text-center rounded-md' onClick={() => handleWatchList(selectedMovie)}>
                  <LuView className='text-2xl' />{(selectedMovie.popularity).toFixed(0)}K
                </p>
               </div>
                <div className='flex justify-center md:justify-start items-center'>
                  <StarRating stars={(selectedMovie.vote_average / 2).toFixed(0)} />
                </div>
              </div>
          </div>
        </div>
        <div className='mx-4 mt-10'>
          <div className='flex flex-col md:flow-row gap-5'>
            <div className='flex gap-5 items-center'>
              <h4 className=' text-xl md:text-2xl flex gap-3 items-center font-bold'>
              <FaHouse className='text-red-500' />Production House  </h4>
            </div>
            <div className='flex gap-2'>
              {
                selectedMovie.production_companies.map((production) => (
                 <Link to={`/productionMovies/${production.name.split(" ")[0]}`}>
                   < img src={ production.logo_path === null ?
                     "https://png.pngtree.com/element_pic/17/03/12/1f9b204cc3e4aac79f79a42772359c88.png" : `${IMAGE_BASE_URL}${production.logo_path}`} 
                     alt='production-house' loading='lazy' className='w-10 md:w-14 h-10 md:h-14 text-black object-contain p-1 rounded-full bg-white' /> 
                 </Link>
                ))
              }
            </div>
          </div>

           <div className='mt-10'>
             <div className='flex gap-5 items-center'>
               <FaUserFriends className='text-3xl text-red-500' />
               <h3 className='text-3xl font-bold'>Casts</h3>
             </div>
             <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-5'>
              {
                selectedCast.cast.slice(0,5).map((cast) => (
                  <Link to={`/actor/${cast.id}`} className='flex flex-col bg-[#070d37a8] border-2 border-[#262e6e8f] w-32 sm:w-44 md:w-56 rounded-lg p-3 cursor-pointer'>
                    <img src={cast.profile_path === null ? "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" : 
                    `${IMAGE_BASE_URL}${cast.profile_path}`} loading='lazy' alt={cast.original_name}
                    className='w-36 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-md'/>
                    <h2 className='text-center text-[#cacaca]  mt-2'>{cast.original_name}</h2>
                    <i className='text-center text-[#cacaca] '>as</i>
                    <i className='text-center text-[#7c7c7c]  mt-1 font-serif'>{cast.character}</i>
                  </Link>
                ))
              }
             </div>
          </div>

          <div className='mt-10'>
             <div className='flex gap-5 items-center'>
               <FaUserFriends className='text-3xl text-red-500' />
               <h3 className='text-3xl font-bold'>Crew</h3>
             </div>
             <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-5'>
              {
                selectedCast.crew.slice(0,5).map((crew) => (
                  <Link to={`/actor/${crew.id}`} className='flex flex-col bg-[#070d37a8] border-2 border-[#262e6e8f] w-32 sm:w-44 md:w-56 rounded-lg p-3 cursor-pointer'>
                    <img src={crew.profile_path === null ? "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" : 
                    `${IMAGE_BASE_URL}${crew.profile_path}`} loading='lazy' alt={crew.original_name}
                    className='w-36 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-md'/>
                    <h2 className='text-center text-[#cacaca] mt-2'>{crew.original_name}</h2>
                    <i className='text-center text-[#7c7c7c] mt-1 font-serif'>({crew.job})</i>
                  </Link>
                ))
              }
             </div>
          </div>
        </div>
        </div>
      </div> 
    </div>
  )
}

export default Details