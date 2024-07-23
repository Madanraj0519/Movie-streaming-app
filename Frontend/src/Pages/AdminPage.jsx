import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminSideBar from "../Componets/Admin/AdminSideBar";
import ProfilePage from "../Componets/Admin/ProfilePage";
import Loading from "../Componets/Loading";

const AdminPage = () => {
    const { loading } = useSelector((state) => state.authUser);
    const [active, setActive] = useState(1);
  
    return (
      <div className="h-screen">
        {loading ? (
          <Loading />
        ) : (
           <>
            <div className={`w-11/12 mx-4 md:mx-14 flex flex-col md:flex-row justify-center md:items-center
                gap-2 md:gap-4 lg:items-start h-full py-4 mt-10`}>
               <div className="w-[50px] md:w-[335px] sticky">
                 <AdminSideBar active={active} setActive={setActive} />
               </div>
               <ProfilePage active={active} />
            </div>
          </>
        )} 
      </div>
    );
}

export default AdminPage