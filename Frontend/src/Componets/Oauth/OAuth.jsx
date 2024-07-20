import React from 'react';
import axiosInstance from "../../Constant/Backend/axiosInstance"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../features/Auth/userAuthSlice";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuth = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await axiosInstance.post('/api/auth/google-auth', {
                userName : result.user.displayName,
                email : result.user.email,
            });
            console.log(res);
            dispatch(signInSuccess(res.data));
            toast.success(res.data.message);
            navigate('/home');
        } catch (error) {
            console.log("Could not login with google auth", error);
            toast(
                "Unfortunately, the google OAuth provider is not supporting, so Please do normal login or sign up ",
                {
                  duration: 6000,
                }
              );
        }
    }

  return (
    <button onClick={handleGoogleAuth} type='button' 
    className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        Continue with google
    </button>
  )
}

export default OAuth