import React, { useState, useEffect } from 'react'
import logo from './../assets/Images/logo.png'
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
import { HiPlus,HiDotsVertical } from "react-icons/hi";
import HeaderItem from './HeaderItem';
// import { auth, provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "../features/Auth/userAuthSlice"
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import axiosInstance from "../Constant/Backend/axiosInstance";
import { getInitials } from '../utilities/helper';
import { TbProgressHelp } from "react-icons/tb";
import toast from 'react-hot-toast';

function Header() {
    const [toggle,setToggle]=useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const [mouseHovering, setMouseHovering] = useState(false);
    
    const {currentUser} = useSelector((state) => state.authUser);


    const handleSignOut = async() => {
        try {
            const response = await axiosInstance.get('/api/auth/signOut');
            dispatch(signOut());
        } catch (error) {
            console.log(error);
        }
    }

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

    const menu=[
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
            link:"/watchlist",
            name:'WATCH LIST',
            icon:HiPlus
        },
        {
            name:'ORIGINALS',
            icon:HiStar
        },
        {
            name:'MOVIES',
            icon:HiPlayCircle
        },
        {
            name:'SERIES',
            icon:HiTv
        }
    ]

    // console.log(currentUser);
  return (
    <div className='flex items-center justify-between p-5'>
        <div className='flex justify-evenly gap-8 items-center'>
          <img src={logo} className='w-[80px] 
           md:w-[115px] object-cover' />
         {
            currentUser ? 
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
            <HeaderItem name={''} Icon={item.icon} />
        ))}
         <div className='md:hidden' onClick={()=>setToggle(!toggle)}>       
            <HeaderItem name={''} Icon={HiDotsVertical} />
           {toggle? <div className='absolute mt-3 bg-[#121212] 
            border-[1px] border-gray-700 p-3 px-5 py-4'>
            {menu.map((item,index)=>index>2&&(
            <HeaderItem name={item.name} Icon={item.icon} />
            ))}
            </div>:null}
            </div> 
          </div>
            </> : 
            <></>
         }
        </div>

        {
            currentUser ? 
            <>
       <div onMouseOver={() => setMouseHovering(true)} onMouseOut={() => setMouseHovering(false)}
       className='relative  h-8 w-8 md:h-12 md:w-12 flex cursor-pointer items-center justify-end'>
            <h4 className='w-full h-full rounded-full bg-slate-500 flex justify-center
             items-center text-xl'>{getInitials(currentUser.user.userName)}</h4>
            {
                mouseHovering && (
                <div className='absolute  top-6 w-28 h-12 right-3 bg-[#121212] border
                  border-slate-900 rounded-ee-lg shadow-sm shadow-zinc-50 p-2 
                  text-sm  duration-200'>
                     <div onClick={handleSignOut} className='text-center'>Sign Out</div>
                 </div>
                )
            }
        </div>
            </> : 
            <>
              <button onClick={handleHelpButton} className='bg-black flex justify-center items-center gap-3
               py-2 px-4 uppercase border text-white border-[#f9f9f9] rounded-lg duration-200 cursor-pointer
               hover:bg-[#f9f9f9] hover:text-[#000] border-transparent'>Help <TbProgressHelp className='text-2xl' /></button>
            </>
        }
    </div>
  )
}

export default Header