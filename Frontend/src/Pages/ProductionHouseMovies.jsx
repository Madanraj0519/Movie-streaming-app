import React, { lazy, useEffect} from 'react';
import Marvel from '../assets/Images/marvel.webp';
import Disney from "../assets/Images/disney_banner.jpg";
import nationalGeo from "../assets/Images/national-geographic.png";
import Pixar from "../assets/Images/Pixar.webp";
import star from "../assets/Images/star_war.jpg";
import { useParams } from 'react-router';
import { RiMovie2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import {fetchProductionMovie} from '../features/Movie/searchMovie'
import SearchResultContainer from '../Componets/SearchResultContainer';
import Loading from '../Componets/Loading';


const ProductionHouseMovies = () => {
    const {id, url} = useParams();
    const dispatch = useDispatch();
    const { productionMovie, loading, error } = useSelector((state) => state.search);

    // console.log(name);

    const production = [
        {
            name : 'Marvel',
            image : Marvel,
        },
        {
            name : "Disney",
            image : Disney,
        },
        {
            name : "National geographic",
            image : nationalGeo,
        },
        {
            name : "Star war",
            image : star,
        },
        {
            name : "Pixar",
            image : Pixar,
        }
    ];

    let uniqueVideo = production.find((video) => video.name === id );

    // console.log(uniqueVideo);

    useEffect(() => {
        dispatch(fetchProductionMovie(id));
    }, [dispatch, id]);

    if(loading){
        return <Loading />
    }

    if(error){
        return <div>Error : {error}</div>
    }

    if(!productionMovie){
        return <div>Failed to fetch Production movie</div>
    }
    
  return (
    <div className='w-full h-full'>
        <div className='scroll flex w-full
        scrollbar-none scroll-smooth shadow-2xl shadow-gray-800'>
            {
                uniqueVideo ? (
                <iframe
               className="min-w-full h-[280px] md:h-[410px] object-cover md:object-center
               mr-5 rounded-md transition-all duration-100 ease-in pointer-events-none"
               src={`https://www.youtube.com/embed/${url}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${url}`}
               name="iframe_all"
               title="YouTube video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
               allowfullscreen
               onLoad={lazy}
               ></iframe>
                ) : (
                <img className='min-w-full h-[280px] md:h-[410px] object-cover md:object-center
                  mr-5 rounded-md transition-all duration-100 ease-in' loading='lazy' alt='custom Banner'
                  src={"https://cdn.celluloidjunkie.com/wp-content/uploads/2021/04/30144535/Paper-vs-Digital-Movie-Posters-Featured.jpg"} /> 
                )
            }
        </div>

        <div className='flex items-center gap-4 px-4 md:px-8 py-4 md:py-6'>
          <RiMovie2Fill className='text-xl md:text-3xl text-red-600' />
         <h2 className='text-xl md:text-3xl font-semibold'>{id} Collection's</h2>
        </div>

        <div className='scroll grid grid-cols-3 md:grid-cols-6 overflow-x-auto overflow-clip gap-4 md:gap-8
         scrollbar-none scroll-smooth pt-4 mx-2 md:px-10 pb-4'>
            <SearchResultContainer searchResult={productionMovie} />
        </div>
    </div>
  )
}

export default ProductionHouseMovies