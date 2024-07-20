import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../Constant/Api_key';
import { fetchActorDetails, fetchActorMovies } from "../features/Movie/actorDetails";
import {FaRegPlayCircle} from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import StarRating from '../Componets/StarRating';
import { RiMovie2Fill } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import Loading from '../Componets/Loading';

const ActorDetails = () => {

    const { id } = useParams();
    const dispatch  = useDispatch();

    const {actorDetails, loading : actorLoading, error : actorError} = useSelector((state) => state.actorDetails);
    const {actorMovies} = useSelector((state) => state.actorDetails);

    // console.log(actorDetails);
    // console.log(actorMovies.results[0]);

    useEffect(() => {
        dispatch(fetchActorDetails(id));
        dispatch(fetchActorMovies(actorDetails.name));
    },[dispatch, id]);

    useEffect(() => {
        dispatch(fetchActorMovies(actorDetails.name));
    },[dispatch, actorDetails]);


    if(actorLoading){
      return <Loading />
    };

    if(actorError){
      return <div>Error : {actorError}</div>
    }

    if(!actorDetails){
      return <div>Failed to fetch the Actor Details</div>
    }

    if(!actorMovies){
      return <div>Failed to fetch the Actor Movies</div>
    }

  return (
  <div className='w-full h-full'>

    <div className='mx-8 md:mx-28'>
       <div className='flex  flex-col mt-5 md:flex-row justify-center items-center gap-5 w-full h-full'>
          <div className='h-full w-full'>
            <img className='md:h-[500px] md:max-w-[550px] object-contain border border-zinc-200 shadow-xl shadow-gray-800  rounded-md' 
            src={actorDetails.profile_path !== null ? `${IMAGE_BASE_URL}${actorDetails.profile_path}`: 
            "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"} loading='lazy' />
          </div>
          <div>
          <div className='md:px-16 md:mt-5'>
           <div className='subTitle text-[#f9f9f9f] text-3xl text-center font-semibold md:text-5xl px-2 md:mx-0'>{actorDetails.name}</div>
              <div className='subTitle flex gap-3 text-[#f9f9f9f] text-base md:text-lg mt-10 mx-8 md:mx-0'>
                <div className='flex flex-col md:flex-row gap-3'>
                  <div className='flex justify-center items-center gap-3'>
                    <p className='bg-red-600 w-28 text-center px-1 rounded-sm'>{actorDetails.known_for_department}</p>
                     <div className='flex gap-2'>
                     {
                       actorDetails.also_known_as.slice(0,3).map((genre) => (
                      <button className='bg-white p-1 md:whitespace-nowrap text-xs text-black'>{genre}</button>
                       ))
                     }
                     </div>
                  </div>
                  <div className='flex gap-3 flex-col md:flex-row'>
                     <p className='flex gap-2 md:whitespace-nowrap items-center'><IoCalendarOutline className='text-red-500' /> 
                     {actorDetails.birthday !== null ? actorDetails.birthday : "Not Available"}
                    </p>
                    <p className='flex gap-2 md:whitespace-nowrap items-center'><CiClock1 className='text-red-500' />
                     {actorDetails.place_of_birth !== null ? actorDetails.place_of_birth : "Not Available"}
                    </p>
                   </div>
                </div>
              </div>
              <div className='space-x-2 text-sm md:text-base md:mx-0 mb-10 mt-3 px-3 text-[#f9f9f9] '>
                <p>{actorDetails.biography !== "null" ? actorDetails.biography : `${actorDetails.name} biography is not found`}</p>
              </div>
              <div className='flex justify-center items-center md:max-w-[600px] h-auto py-10 bg-[#050716ab]'>
                 <div className='flex justify-center gap-10 items-center'>
                    <div className='flex flex-col md:flex-row justify-center gap-10 items-center'>
                      <div className='flex justify-center gap-10 items-center'>
                        <button><FaRegPlayCircle /></button>
                        <div className='h-16 bg-white w-[0.5px]'></div>
                        <div className='flex gap-2 '>
                         <p>Language</p>
                        </div>
                      </div>
                      <div className='flex justify-center w-full'>
                       <button className='flex w-[150px] rounded-full border-2 border-red-500 bg-[#070d37ab] 
                       justify-center items-center gap-5'><FaRegPlayCircle />Watch</button>
                       </div>
                    </div>
                 </div>
              </div>
              <div className='mx-4 md:mx-0'>
                <p className='mt-5 font-bold p-1 flex items-center gap-2 bg-white text-red-500 w-20 text-center rounded-md'>
                  <FaStar className='text-2xl text-yellow-500' />{(actorDetails.popularity).toFixed(0)}K
                </p>
              </div>
        </div>
          </div>
       </div>
       </div>

       <div className='w-full h-full mt-10 bg-[#070d3739]'>
         <h4 className='md:text-4xl text-center flex justify-center text-[#cacaca] items-center md:-ml-80 gap-4 pt-10 font-semibold mb-5'>
            <RiMovie2Fill className='text-red-500' />{actorDetails.name}'s Top Movies
        </h4>
         <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[900px] flex flex-col gap-5 h-auto mb-6 bg-[#090909a4] overflow-x-scroll md:overflow-x-hidden py-4 md:py-8 px-2 md:px-8'>
              {
                actorMovies.results[0].known_for.map((actor) => (
                    <Link to={`/detail/${actor.id}`} className='w-[300px] md:w-[800px] h-auto md:h-[150px] overflow-x-scroll md:overflow-x-hidden  rounded-lg bg-[#070d3772]'>
                        <div className='mt-1 md:mt-2 flex justify-between items-center md:mx-8 p-2 overflow-x-scroll md:overflow-x-hidden '>
                            <div className='flex flex-row gap-3 md:gap-5'>
                              <img src={`${IMAGE_BASE_URL}${actor.poster_path}`} loading='lazy'
                              className='w-16 md:w-24 h-20 md:h-28 object-cover rounded-md border border-white p-0' />
                              <div>
                                  <h4 className='whitespace-nowrap text-[#cacaca] text-base md:text-2xl'>{actor.original_title === null ? "Name Not found" : actor.original_title}</h4>
                                  <div className='flex gap-2 items-center mt-2'>
                                    <IoCalendarOutline className='text-red-500' />
                                    <p className='text-[#cacaca]'>{actor.release_date === null ? "Not found" : actor.release_date}</p>
                                  </div>
                                  <div className='mt-2 flex gap-2 text-sm md:text-lg'>
                                    <p className='text-red-500'>Vote : </p>
                                    <p className='text-[#cacaca]'>{(actor.vote_average).toFixed(1)}/10</p>
                                  </div>
                              </div>
                            </div>
                            <div>
                                <StarRating stars={(actor.vote_average/2).toFixed(0)} />
                                <div className=' mt-4 md:p-2 flex items-center gap-2 bg-red-500 justify-center rounded-lg'>
                                  <LuView className='text-xs md:text-sm text-white' />
                                  <p className='text-sm text-white'>
                                    {(actor.popularity).toFixed(0)}K
                                  </p>
                                </div>
                            </div>
                         </div>
                   </Link>
                ))
              }
            </div>
         </div>
       </div>
    </div>
  )
}

export default ActorDetails