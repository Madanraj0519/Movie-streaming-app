import React, {useEffect} from 'react';
import Slider from '../Componets/Slider';
import ProductionHouse from '../Componets/ProductionHouse';
import GenreMovieList from '../Componets/GenreMovieList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../features/Movie/MoviesSlice';
import Loading from '../Componets/Loading';
// const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

const Home = () => {

  const dispatch = useDispatch();
  const {upcomingMovies, loading, error} = useSelector((state) => state.movies);
  // console.log(upcomingMovies);
  useEffect(() => {
      dispatch(fetchUpcomingMovies());
    },[dispatch]);

    if(loading){
      return <div><Loading /></div>
    }

    if(error){
      return <div>Error : {error}</div>
    };

    if(!upcomingMovies){
      return <div>Failed to fetch the movie</div>
    }

  return (
    <div>
       {/* <h4 className='mx-14 text-xl md:text-4xl font-semibold'>Trending Movies</h4> */}
        <Slider movies={upcomingMovies} />
        <ProductionHouse />
        <GenreMovieList genreType={"movie"} />
    </div>
  )
}

export default Home