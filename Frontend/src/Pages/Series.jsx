import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingSeries } from '../features/Movie/MoviesSlice';
import Slider from '../Componets/Slider';
import GenreMovieList from '../Componets/GenreMovieList';
import Loading from '../Componets/Loading';

const Series = () => {

  const dispatch = useDispatch();
  const {trendingSeries, loading, error} = useSelector((state) => state.movies);

  // console.log(trendingSeries);

  useEffect(() => {
      dispatch(fetchTrendingSeries());
    },[dispatch])

    if(loading){
      return <Loading />
    }
  
    if(error){
      return <div>Error : {error}</div>
    }

  return (
    <div>
      <h4 className='mx-14 mt-10 text-4xl font-semibold'>Top Series</h4>
      <Slider movies={trendingSeries} />
      <GenreMovieList genreType={"tv"} />
    </div>
  )
}

export default Series