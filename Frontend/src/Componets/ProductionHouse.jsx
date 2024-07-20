import React, { lazy } from 'react'
import disney from './../assets/Images/disney.png'
import marvel from './../assets/Images/marvel.png'
import nationalG from './../assets/Images/nationalG.png'
import pixar from './../assets/Images/pixar.png'
import starwar from './../assets/Images/starwar.png'
 
import starwarV from './../assets/Videos/star-wars.mp4'
import disneyV from './../assets/Videos/disney.mp4'
import marvelV from './../assets/Videos/marvel.mp4'
import nationalGeographicV from './../assets/Videos/national-geographic.mp4'
import pixarV from './../assets/Videos/pixar.mp4'
import { Link } from 'react-router-dom'


function ProductionHouse() {
    const productionHouseList=[
        {
            id:1,
            image:disney,
            name : "Disney",
            video:disneyV,
            url : "u2zSl6FO1uM"
        },
        {
            id:2,
            image:pixar,
            name : "Pixar",
            video:pixarV,
            url : "DSAhbBhAe4Y"
        },
        {
            id:3,
            image:marvel,
            name : "Marvel",
            video:marvelV,
            url : "os2C0TdDphc"
        },
        {
            id:4,
            image:starwar,
            name : "Star war",
            video:starwarV,
            url : "_omJ3b6WHMk"
        },
        {
            id:5,
            image:nationalG,
            name : "National geographic",
            video:nationalGeographicV,
            url : "SNS2fgO5AQM"
        },

    ]
  return (
    <div className='flex gap-2 md:gap-5 p-2 px-2 md:px-16 '>
        {productionHouseList.map((item)=>(
          <Link to={`/productionMovies/${item.name}/${item.url}`} className='border-[2px] border-gray-600
            rounded-lg hover:scale-110 transition-all duration-300
            ease-in-out cursor-pointer relative shadow-xl shadow-gray-800
            ' key={item.id}>
                 <video src={item.video} autoPlay loop playsInline muted onLoad={lazy}
            className='absolute z-0  top-0 rounded-md 
            opacity-0 hover:opacity-50'/> 
                <img src={item.image} className='w-full z-[1] opacity-100' loading='lazy' alt={item.name} /> 
               
            </Link>
        ))}
    </div>
  )
}

export default ProductionHouse