import React, { useState } from "react";
import {
  AiOutlineArrowRight,
} from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from"@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.authUser);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
    //   toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
    //   toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    
  };


  return (
    <div className="w-full rounded-xl">
      {/* profile */}
      {active === 1 && (
        <div className="w-full bg-[#090e3d80] rounded-xl md:p-2">
          <h4 className="mx-8 text-3xl font-semibold text-red-500">Update Profile</h4>
          <div className="flex justify-center w-full py-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5 relative mt-5">
              <img
                src={`https://as1.ftcdn.net/v2/jpg/05/99/32/28/1000_F_599322870_hufBazDahX69a57xhcprgfn4WSjAlXZj.jpg`}
                className="w-[60px] h-[60px] md:w-[150px] md:h-[150px] rounded-full object-cover border-[3px] border-red-500"
                alt=""
              />
              <div className="relative w-[270px] sm:w-[300px] md:w-[800px] border-2 border-dotted border-red-500 h-[100px]  md:h-[140px] bg-[#07051bed] flex
               items-center justify-center cursor-pointer">
                <input
                  type="file"
                  id="image"
                  className="mt-3 hidden md:block cursor-pointer"
                  onChange={handleImage}
                />
                <div className="flex gap-2 flex-col justify-center items-center">
                  <label htmlFor="image" className="text-red-500 text-2xl">
                    <FiUploadCloud />
                  </label>
                  <p>Drag your image here</p>
                  <p className="text-xs opacity-40">only .png and .jpg file will accepted</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-2 py-2 pb-10 md:px-10 md:py-6">
            <form onSubmit={handleSubmit} aria-required="true">
              <div className="w-full md:flex block pb-3">
                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2 text-red-500">Full Name</label>
                  <input
                    type="text"
                    className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-4 md:mb-0`}
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
                    className={`${'w-full  bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-1 md:mb-0`}
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
                    className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-4 md:mb-0`}
                    required
                     placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] md:w-[50%]">
                  <label className="block pb-2 text-red-500">Enter your password</label>
                  <input
                    type="password"
                    className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-4 md:mb-0`}
                    required
                    placeholder="Current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-2">
              <button
                className={`w-[250px] md:h-[40px] border border-red-500 bg-black text-white flex justify-center 
                  items-center hover:bg-red-500 hover:border-red-500 scale-90 duration-100 rounded-[3px] md:mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              >Delete</button>
              <button
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

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
              className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-4 md:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block text-red-500 pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-4 md:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block text-red-500 pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${'w-full bg-[#b9b9b9] border-red-500 border-2 bg-[#07051bed] md:h-14 text-lg active:outline-red-500 p-1 rounded-[5px]'} !w-[95%] mb-4 md:mb-0`}
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