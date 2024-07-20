import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import HrMovieCard from './HrMovieCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {API_KEY, BASE_URL} from "../Constant/Api_key";
import Loading from './Loading';
// import Slider from "react-slick";


function MovieList({genreType, genreId,index_}) {

    const dispatch = useDispatch();
    const [movieState, setMovieState] = useState([]);

    const elementRef=useRef(null);

    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }

    useEffect(() => {
        getByGenre(genreId.id);
    },[genreId, dispatch]);

    const getByGenre = (genre) => {
      axios.get(`${BASE_URL}/discover/${genreType}?api_key=${API_KEY}&with_genres=${genre}`)
      .then(res =>{
        setMovieState(res.data.results)
      })
    }

    if(!movieState){
      return <Loading />
    }

  return (
    <div className='relative'>
      <IoChevronBackOutline onClick={()=>slideLeft(elementRef.current)} 
         className={`text-[50px] text-white
           p-2 z-10 cursor-pointer 
            hidden md:block absolute
            ${index_%3===0?'mt-[80px]':'mt-[150px]'} `} key={index_}/>
   
          <div ref={elementRef} className='scroll flex overflow-x-auto overflow-clip gap-4 md:gap-8
           scrollbar-none scroll-smooth  pt-2 md:pt-4 md:px-3 pb-2 md:pb-4'>
              {movieState.map((item,index)=>(
                 <div>
                {index_%3===0?<HrMovieCard movie={item}/>:<MovieCard movie={item} />}
                 </div> 
              ))}
          </div>

      <IoChevronForwardOutline onClick={()=>slideRight(elementRef.current)}
           className={`text-[50px] text-white hidden md:block
           p-2 cursor-pointer z-10 top-0
            absolute right-0 
            ${index_%3===0?'mt-[80px]':'mt-[150px]'}`}/> 
    </div>
  )
}

export default MovieList