import React from 'react'
import GenresList from '../Constant/genreList'
import MovieList from './MovieList'

function GenreMovieList({genreType}) {
  return (
    <div>
        {GenresList.genere.map((item,index)=>index<=6&&(
            <div className='p-2 px-4 md:px-16' key={item.id}>
                <h2 className='text-[20px] text-white 
                font-bold'>{item.name}</h2> 
                <MovieList genreType={genreType} genreId={item} index_={index} />   
            </div>
        ))}
    </div>
  )
}

export default GenreMovieList