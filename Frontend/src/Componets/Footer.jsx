import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from './../assets/Images/logo.jpeg'

const Footer = () => {
  return (
    <div className='px-5 py-8 bg-[#070b2ed5]'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        <div className='flex flex-col justify-start items-start gap-4'>
            <h4 className='text-xl'>Company</h4>
            <ul className='flex flex-col gap-3 text-zinc-600 cursor-pointer '>
                <Link to={'/home'}><li className='text-zinc-600 hover:text-red-500'>Home</li></Link>
                <Link to={'/search'}><li className='text-zinc-600 hover:text-red-500'>Search</li></Link>
                <Link to={'/favorite'}><li className='text-zinc-600 hover:text-red-500'>Favorite</li></Link>
                <Link to={'/home'}><li className='text-zinc-600 hover:text-red-500'>Movies</li></Link>
                <Link to={'/series'}><li className='text-zinc-600 hover:text-red-500'>Series</li></Link>
            </ul>
        </div>
        <div className='flex flex-col justify-start items-start gap-4'>
            <h4 className='text-xl'>Top Category</h4>
            <ul className='flex flex-col gap-3 text-zinc-600 cursor-pointer '>
                <Link to={'productionMovies/Disney'}><li className='text-zinc-600 hover:text-red-500'>Disney</li></Link>
                <Link to={'/productionMovies/Pixar'}><li className='text-zinc-600 hover:text-red-500'>Pixar</li></Link>
                <Link to={'productionMovies/Marvel'}><li className='text-zinc-600 hover:text-red-500'>Marvel</li></Link>
                <Link to={'productionMovies/Star war'}><li className='text-zinc-600 hover:text-red-500'>Star war</li></Link>
                <Link to={'productionMovies/National geographic'}><li className='text-zinc-600 hover:text-red-500'>National geographic</li></Link>
            </ul>
        </div>
        <div className='flex flex-col justify-start items-start gap-4'>
            <h4 className='text-xl'>My Account</h4>
            <ul className='flex flex-col gap-3 text-zinc-600 cursor-pointer '>
                <Link to={'/admin/profile'}><li className='text-zinc-600 hover:text-red-500'>Profile</li></Link>
                <Link to={'/admin/profile'}><li className='text-zinc-600 hover:text-red-500'>Subscription</li></Link>
                <Link to={'/admin/profile'}><li className='text-zinc-600 hover:text-red-500'>Top Plans</li></Link>
                <Link to={'/admin/profile'}><li className='text-zinc-600 hover:text-red-500'>Change Password</li></Link>
            </ul>
        </div>
        <div className='flex flex-col justify-start items-start text-zinc-600 gap-4'>
          <img src={logo} className='w-[80px] 
           md:w-[55px] md:h-[55px] object-cover rounded-full' alt='logo' />
          <a href='https://github.com/Madanraj0519' 
          className='flex justify-center items-center gap-2 text-zinc-600 hover:text-red-500'><FaGithub className='text-xl' />Madanraj0519</a>
          <a href='https://www.linkedin.com/in/madanraj-7b8b23232/'
           className='flex justify-center items-center gap-2 text-zinc-600 hover:text-red-500'><FaLinkedin className='text-xl'/>Madnraj P</a> 
          <p>Created by Madanraj</p>
        </div>
      </div>
    <p className='text-zinc-600 text-xs md:text-base mt-4 text-center whitespace-nowrap'>© 2024 Madanraj. All rights reserved.</p>
    </div>
  )
}

export default Footer