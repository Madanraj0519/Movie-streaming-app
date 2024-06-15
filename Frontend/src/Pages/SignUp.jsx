import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from "../features/Auth/userAuthSlice";
import {useNavigate} from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../Constant/Backend/axiosInstance";
import {toast} from "react-hot-toast";
import OAuth from '../Componets/Oauth/OAuth';

const SignUp = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!userName){
      setError("Please enter your name");
      return;
    }

    if(!email){
      setError("Please enter a valid email");
      return;
    }

    if(!password){
      setError("Please enter a valid password");
      return;
    }

    setError("");

    // Sign up api call
    try {
      const response = await axiosInstance.post('/api/auth/create-account', {
        userName,
        email,
        password,
      });

      if(response.data.success === false){
        dispatch(signInFailure(response.data.message));
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

  }

  return (
    <div className='container w-full overflow-hidden flex flex-col text-center'>
        <div  className='w-2/5 mx-auto pt-2 mt-10'>
          <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
           <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='text' placeholder='User Name' value={userName} 
                onChange={(e) => setUserName(e.target.value)} id='userName' className=' p-3 rounded-lg' />
                <input type='text' placeholder='User Email' value={email}
                onChange={(e) => setEmail(e.target.value)} id='userEmail' className='p-3 rounded-lg' />
                <input type='text' placeholder='User Password' value={password}
                onChange={(e) => setPassword(e.target.value)} id='userPassword' className='p-3 rounded-lg' />
                <button type='submit' className='bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
                <OAuth />
            </form>
      <div className='md:flex gap-2 mt-5'>
        <p>Already having a account?</p>
        <Link to={'/sign-in'}>
           <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error ? error.message || 'something went wrong' : ''}</p>
    </div>
    </div>
  )
}

export default SignUp