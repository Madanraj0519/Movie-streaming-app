import React, { useState } from 'react'
import logo from './../assets/Images/logo.png'
import { HiHome,
    HiMagnifyingGlass,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import HeaderItem from './HeaderItem';
// import { auth, provider } from '../firebase';
import { useSelector } from 'react-redux';
import {useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getInitials } from '../utilities/helper';
import { TbProgressHelp } from "react-icons/tb";
import toast from 'react-hot-toast';

function Header() {
    const [toggle,setToggle]=useState(false);  
    const currentPath = useLocation();
    const {currentUser} = useSelector((state) => state.authUser);

    const handleHelpButton = () => {
        toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <h4 className='text-md font-medium text-gray-900'>Custom user</h4>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      UserEmail : madan__raj@hotmail.com
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      UserPassword : madan
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 
                  flex items-center justify-center text-sm font-medium text-zinc-100 
                  hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
    }

    const menu = currentUser ? [
      {
          link:"/home",
          name:'HOME',
          icon:HiHome
      },
      {
          link:"/search",
          name:'SEARCH',
          icon:HiMagnifyingGlass
      },
      {
          name:'MOVIES',
          icon:HiPlayCircle
      },
      {
          link:"/series",
          name:'SERIES',
          icon:HiTv
      },
      {
        link:"/watchlist",
        name:'Favorite',
        icon:FaHeart
      },
    ] : [
       {
        link:"/home",
        name:'HOME',
        icon:HiHome
       },
       {
        link:"/search",
        name:'SEARCH',
        icon:HiMagnifyingGlass
       },
       {
        name:'MOVIES',
        icon:HiPlayCircle
       },
       {
        link:"/series",
        name:'SERIES',
        icon:HiTv
       }
   ]

    // console.log(currentUser);
  return (
    <div className='flex items-center justify-between p-5 shadow-lg shadow-gray-700'>
        <div className='flex justify-evenly gap-8 items-center'>
          <Link to={"/"}>
          <img src={logo} alt='logo' className='w-[80px] 
           md:w-[115px] object-cover' />
          </Link>
         {
            currentPath.pathname !== '/' ? 
            <>
    <div className='hidden top-3 md:flex gap-8'>
        {menu.map((item)=>(
            <Link to={item.link} key={item.id}>
              <HeaderItem name={item.name} Icon={item.icon} />
            </Link>
        ))}
          </div>
          <div className='flex md:hidden gap-5'>
        {menu.map((item,index)=>index<3&&(
            <Link to={item.link} key={item.id}>
               <HeaderItem name={''} Icon={item.icon} />
            </Link>
        ))}
         <div className='md:hidden' onClick={()=>setToggle(!toggle)}>       
            <HeaderItem name={''} Icon={HiDotsVertical} />
           {toggle? <div className='absolute mt-3 bg-[#121212] 
            border-[1px] border-gray-700 p-3 px-5 py-4'>
            {menu.map((item,index)=>index>2&&(
             <Link to={item.link} key={item.id}>
               <HeaderItem name={item.name} Icon={item.icon} />
             </Link>
            ))}
            </div>:null}
            </div> 
          </div>
            </> : 
            <></>
         }
        </div>

        {
            currentPath.pathname !== '/' ? 
            <>
             {
              currentUser ?
              (
             <>
              <Link to={'/admin/profile'} className='relative  h-8 w-8 md:h-12 md:w-12 flex cursor-pointer items-center justify-end'>
             <h4 className='w-full h-full rounded-full bg-slate-500 text-zinc-100 flex justify-center
             items-center text-xl'>{getInitials(currentUser.user.userName)}</h4>
           </Link>
             </>
              ) : (
                <Link to={'/sign-in'}>
                <button className='bg-black flex justify-center items-center gap-3
                  py-2 px-4 uppercase border text-zinc-300 border-zinc-500 rounded-lg duration-200 cursor-pointer
                  hover:bg-[#f9f9f9] hover:text-[#000] border-transparent'>Login</button>
                </Link>
              )
             }
            </> : 
            <>
              <button onClick={handleHelpButton} className='bg-black flex justify-center items-center gap-3
               py-2 px-4 uppercase border text-zinc-300 border-zinc-500 rounded-lg duration-200 cursor-pointer
               hover:bg-[#f9f9f9] hover:text-[#000] border-transparent'>Help <TbProgressHelp className='text-2xl' /></button>
            </>
        }
    </div>
  )
}

export default Header