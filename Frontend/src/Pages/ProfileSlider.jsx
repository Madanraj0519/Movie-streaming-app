import React, {useRef, useState} from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router";
import {toast} from "react-hot-toast";
import { avatar } from '../utilities/ProfileImage';
import {signInStart, signInSuccess, signInFailure} from "../features/Auth/userAuthSlice";
import axiosInstance from "../Constant/Backend/axiosInstance";
import logo from '../assets/Images/logo.jpeg';


const screenWidth=window.innerWidth;

const ProfileSlider = () => {

  const { currentUser, loading, error} = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userError, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isActive, setISActive] = useState(null);

  // console.log(avatarUrl);

  const elementRef=useRef();

  const sliderRight=(element)=>{
      element.scrollLeft+=screenWidth-110
  }
  const sliderLeft=(element)=>{
      element.scrollLeft-=screenWidth-110
  }

  const handleAvatar = (url, index) => {
     setAvatarUrl(url);
     setISActive(index);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
        
 // update user api calls
 try {
   dispatch(signInStart());
   const response = await axiosInstance.post(`/api/user/updateUserAvatar/${currentUser.user._id}`, {
     url : avatarUrl
   });
   
   if(response.data.success === false){
     dispatch(signInFailure(response.data));
     toast.error(response.data.message);
     setError(response.data.message);
   }

   dispatch(signInSuccess(response.data));
   toast.success(response.data.message);
   navigate("/home");
   
 } catch (error) {
   dispatch(signInFailure(error));
   setError(error.message);
 }
};

return (
<div className='absolute w-full p-5 md:p-20 bg-[#000000da] h-full'>
  
 <div className='bg-[#090e3da4] mt-28 md:-mt-10 py-20 md:py-10 rounded-md border border-gray-500'>
     <h2 className='flex justify-center items-end md:gap-2 text-xl md:text-2xl'>Hey { currentUser && currentUser.user.userName},  welcome to 
      <img src={logo} className='h-5 w-5 md:h-10 md:w-10 hidden md:block rounded-full mt-2' /> cinemas</h2>
     <div  className='scroll flex overflow-x-auto w-full mt-5 px-2 md:px-16 py-2 md:py-4
         scrollbar-none scroll-smooth cursor-pointer' ref={elementRef}> 
         {avatar.map((item, index)=>(
            <>
             <img src={item.url} onClick={() => handleAvatar(item.url, index)} 
             className={`w-[90px] h-[90px] md:w-[180px] md:h-[180px] object-center
              mr-5 rounded-full border-[3px]  hover:border-[4px] 
              ${isActive === index ? "border-[4px] border-green-300" : "border-red-500"}
             hover:border-green-400 transition-all duration-100 ease-in`}
             loading='lazy' alt={''}/>
            </>   
         ))}
     </div>

     <div className='flex justify-center items-center opacity-25 hover:opacity-100'>
       <HiChevronLeft className="hidden md:block text-white text-[10px] md:text-[40px] 
        mx-2 md:mx-2 cursor-pointer " 
       onClick={()=>sliderLeft(elementRef.current)}/>
       <HiChevronRight className='hidden md:block text-white text-[10px] md:text-[40px]
       mx-2 md:mx-2 cursor-pointer right-0' 
       onClick={()=>sliderRight(elementRef.current)}/>
    </div>

    <div className='flex justify-center items-center mt-5'>
     <button onClick={handleSubmit} className='bg-red-500 border scale-100 duration-100 hover:bg-black hover:border-red-500'>
       Choose your Avatar
     </button>
    </div>
  </div>  

</div>
)
}

export default ProfileSlider