import React, { useState, useRef } from "react";
import {
  AiOutlineArrowRight,
} from "react-icons/ai";
import { avatar } from "../../utilities/ProfileImage";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from"@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router";
import {signInStart, signInSuccess, signInFailure} from "../../features/Auth/userAuthSlice";
import {toast} from "react-hot-toast";
import axiosInstance from "../../Constant/Backend/axiosInstance";

const screenWidth=window.innerWidth;

const ProfilePage = ({ active }) => {

  const { currentUser, loading, error} = useSelector((state) => state.authUser);

  // console.log(currentUser);
  
  const [name, setName] = useState(currentUser.user && currentUser.user.userName);
  const [email, setEmail] = useState(currentUser.user && currentUser.user.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.user && currentUser.user.phoneNumber);
  const [password, setPassword] = useState(currentUser.user && currentUser.user.createdOn);
  const [userError, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(currentUser.user.url);
  const [isActive, setISActive] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  // console.log(currentUser.user);

  const elementRef=useRef();

  const sliderRight=(element)=>{
      element.scrollLeft+=screenWidth-110
  }
  const sliderLeft=(element)=>{
      element.scrollLeft-=screenWidth-110
  }

  const handleAvatar = (url, index) => {
    setProfileImage(url);
    setAvatarUrl(url);
    setISActive(index);
 }

  const handleSubmit = async(e) => {
       e.preventDefault();
           
    // update user api calls
    try {
      dispatch(signInStart());
      const response = await axiosInstance.post(`/api/user/updateUser/${currentUser.user._id}`, {
        userName : name,
        email : email,
        phoneNumber : phoneNumber,
        url : avatarUrl,
      });
      
      if(response.data.success === false){
        dispatch(signInFailure(response.data));
        toast.error(response.data.message);
        setError(response.data.message);
      }

      dispatch(signInSuccess(response.data));
      toast.success(response.data.message);
      navigate("/admin/profile");
      
    } catch (error) {
      dispatch(signInFailure(error));
      setError(error.message);
    }

  };


  const handleDeleteUser = async(e) => {
    e.preventDefault();

    try{
      dispatch(signInStart());
      const response = await axiosInstance.delete(`/api/user/deleteUser/${currentUser.user._id}`);

      if(response.data.success === false){
        dispatch(signInFailure(response.data));
        toast.error(response.data.message);
        setError(response.data.message);
      }

      dispatch(signInSuccess(null));
      toast.success(response.data.message);
      navigate("/");

    }catch (error) {
      dispatch(signInFailure(error));
      setError(error.message);
    }
  }

  return (
    <div className="w-full rounded-xl overflow-y-scroll md:overflow-y-hidden">
      {/* profile */}
      {active === 1 && (
      <div className="w-full bg-[#090e3d80] rounded-xl md:p-2 ">
          <h4 className="mx-8 text-3xl font-semibold text-red-500 pt-2">Update Profile</h4>
          <div className="flex justify-center items-center w-full py-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5 relative mt-0 md:mt-2">
              <img
                src={profileImage}
                className="w-[130px] h-[130px] md:w-[190px] md:h-[190px] rounded-full object-cover border-[3px] border-red-500 mt-5"
                alt=""
              />
              <div className="w-full">
               <h4 className="text-center md:text-2xl mb-2">Update your avatar</h4>
               <div className="relative w-[270px] sm:w-[400px] md:w-[800px] border-2 border-dotted border-red-500 h-[140px] 
                md:h-[180px] bg-[#07051bbd] flex flex-col items-center justify-center cursor-pointer">
                <div className='scroll flex overflow-x-auto w-full mt-4 px-2 md:px-16 py-2
                   scrollbar-none scroll-smooth cursor-pointer' ref={elementRef}> 
                   {avatar.map((item, index)=>(
                     <>
                         <img src={item.url} onClick={() => handleAvatar(item.url, index)}
                         className={` w-[80px] h-[80px] md:w-[110px] md:h-[110px] object-center
                          mr-5 rounded-full border-[3px] border-red-700 hover:border-[4px]
                         hover:border-green-400 transition-all duration-100 ease-in
                         ${isActive === index ? "border-[4px] border-green-500" : "border-red-500"} `}
                         loading='lazy' alt={''}/>

                      </>   
                     ))}
                 </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-2 py-2 pb-10 md:px-10 md:py-6 ">
            <form 
             aria-required="true">
              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2 text-red-500">Full Name</label>
                  <input
                    type="text"
                    className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} text-black !w-[95%] mb-4 md:mb-0`}
                    required
                    value={name}
                     placeholder="User name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2 text-red-500">Email Address</label>
                  <input
                    type="text"
                    className={`${'w-full  bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'}  text-black !w-[95%] mb-1 md:mb-0`}
                    required
                     placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2 text-red-500">Phone Number</label>
                  <input
                    type="number"
                    className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'}  text-black !w-[95%] mb-4 md:mb-0`}
                    required
                     placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2 text-red-500">{currentUser.user.isUpdate ? "Last updated on" : "Created On"}</label>
                  <input
                    type="text"
                    className={`${'w-full bg-[#b9b9b9] pointer-events-none border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'}  text-black !w-[95%] mb-4 md:mb-0`}
                    required
                    placeholder="Current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2">
              <button
              onClick={handleDeleteUser}
                className={`w-[250px] md:h-[40px] border border-red-500 bg-black text-white flex justify-center 
                  items-center hover:bg-red-500 hover:border-red-500 scale-90 duration-100 rounded-[3px] md:mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              >Delete</button>
              <button
                onClick={handleSubmit}
                className={`w-[250px] md:h-[40px] border border-red-500 hover:bg-black text-white flex justify-center 
                  items-center bg-red-500 hover:border-red-500 scale-90 duration-100 rounded-[3px] md:mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              >Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* order */}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Change Password */}

      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
    </div>
  );
};


const AllRefundOrders = () => {

  const { user } = useSelector((state) => state.authUser);
//   const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllOrdersOfUser(user._id));
  }, []);

//   const eligibleOrders =
//     orders && orders.filter((item) => item.status === "Processing refund");


  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "orderDetails",
      flex: 1,
      minWidth: 150,
      headerName: "BookingDetails",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

//   eligibleOrders &&
//   eligibleOrders.forEach((item) => {
//       row.push({
//         id: item._id,
//         total: "₹" + item.totalPrice,
//         status: item.status,
//       });
//     });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const ChangePassword = () => {
  const { currentUser, loading, error} = useSelector((state) => state.authUser);
  
  const [userError, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await axiosInstance.post(`/api/user/updateUserPassword/${currentUser.user._id}`, {
        oldPassword,
        newPassword,
        confirmPassword
      });
      
      if(response.data.success === false){
        dispatch(signInFailure(response.data));
        toast.error(response.data.message);
        setError(response.data.message);
      }

      dispatch(signInSuccess(response.data));
      toast.success(response.data.message);
      navigate("/admin/profile");
      
    } catch (error) {
      dispatch(signInFailure(error));
      setError(error.message);
    }

  };

  return (
    <div className="w-full  bg-[#090e3d80] rounded-xl p-2 py-6">
      <h1 className="mx-8 text-3xl font-semibold text-red-500">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required="true"
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] md:w-[50%] mt-5">
            <label className="block pb-2 text-red-500">Enter your old password</label>
            <input
              type="password"
              className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'}  text-black !w-[95%] mb-4 md:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block text-red-500 pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'}  text-black !w-[95%] mb-4 md:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block text-red-500 pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'}  text-black !w-[95%] mb-4 md:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

            <button
                className={`w-[250px] h-[40px] border border-red-500 bg-black text-white flex justify-center 
                  items-center hover:bg-red-500 hover:border-red-500 scale-90 duration-100 rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit">Update
            </button>
        </form>
      </div>
    </div>
  );
};


const AllOrders = () => {
    const { user } = useSelector((state) => state.authUser);
    // const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
  
    useEffect(() => {
      // dispatch(getAllOrdersOfUser(user._id));
    }, []);
  
    const columns = [
      { field: "id", headerName: "Booking ID", minWidth: 150, flex: 0.7 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) => {
          return params.api.getCellValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
  
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  
      {
        field: "orderDetails",
        flex: 1,
        minWidth: 150,
        headerName: "BookingDetails",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/user/order/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const row = [];
  
    // orders &&
    //   orders.forEach((item) => {
    //     row.push({
    //       id: item._id,
    //       total: "₹" + item.totalPrice,
    //       status: item.status,
    //     });
    //   });
  
    return (
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    );
  };

export default ProfilePage;