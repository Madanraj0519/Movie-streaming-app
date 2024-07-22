import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {  MdOutlineTrackChanges } from "react-icons/md";
import { RxPerson } from "react-icons/rx";

import axiosInstance from "../../Constant/Backend/axiosInstance";
import { signOut } from "../../features/Auth/userAuthSlice";
import { useDispatch } from 'react-redux';


const AdminSideBar = ({ setActive, active }) => {

    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = async() => {
      try {
          const response = await axiosInstance.get('/api/auth/signOut');
          dispatch(signOut());
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div className="md:w-full w-[300px] h-[60px] md:h-full flex md:flex-col justify-center ml-6
     md:ml-0 bg-[#090e3db0] shadow-sm rounded-[5px] md:p-4 pt-8">
      <div
        className={`flex items-center ${active === 1  ? 'md:bg-[#e7e3e3ed]' : 'md:hover:bg-[#000000c4]'} cursor-pointer w-full md:w-auto mb-4  md:h-12 px-2
        hover:scale-100 hover:duration-100 md:p-4 rounded-md`}
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : "white"} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-red-800" : "text-white"
          } md:block hidden`}
        >
          Profile
        </span>
      </div>

      <div
        className={`flex items-center ${active === 2  ? 'md:bg-[#e7e3e3ed]' : 'md:hover:bg-[#000000c4]'} cursor-pointer w-full md:w-auto mb-4 md:h-12 px-2
        hover:scale-100 hover:duration-100 md:p-4 rounded-md`}
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : "white"} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : "text-white"
          } md:block hidden`}
        >
          Subscriptions
        </span>
      </div>

      <div
        className={`flex items-center ${active === 3  ? 'md:bg-[#e7e3e3ed]' : 'md:hover:bg-[#000000c4]'} cursor-pointer w-full md:w-auto mb-4 md:h-12 px-2
        hover:scale-100 hover:duration-100 md:p-4 rounded-md`}
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : "white"} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : "text-white"
          } md:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
      className={`flex items-center ${active === 5  ? 'md:bg-[#e7e3e3ed] ' : 'md:hover:bg-[#000000c4]'} cursor-pointer w-full md:w-auto mb-4  md:h-12 px-2
      hover:scale-100 hover:duration-100 md:p-4 rounded-md`}
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : "white"} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : "text-white"
          } md:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className={`flex items-center ${active === 6  ? 'md:bg-[#e7e3e3ed] ' : 'md:hover:bg-[#000000c4]'} cursor-pointer w-full md:w-auto mb-4  md:h-12 px-2
        hover:scale-100 hover:duration-100 md:p-4 rounded-md`}
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : "white"} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : "text-white"
          } md:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
      onClick={handleSignOut}
        className={`flex items-center ${active === 9  ? 'md:bg-red-300 ' : 'md:hover:bg-[#000000c4]'} cursor-pointer w-full md:w-auto mb-4 md:h-12 px-2
        hover:scale-100 hover:duration-100 md:p-4 rounded-md`}
        // onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 9 ? "red" : "white"} />
        <span
          className={`pl-3 ${
            active === 9 ? "text-[red]" : "text-white"
          } md:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  )
}

export default AdminSideBar