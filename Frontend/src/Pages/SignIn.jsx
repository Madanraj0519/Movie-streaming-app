import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from "../features/Auth/userAuthSlice";
import {useNavigate} from "react-router"
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../Constant/Backend/axiosInstance";
import OAuth from '../Componets/Oauth/OAuth';
import {toast} from "react-hot-toast";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async(e) => {
    e.preventDefault();

    if(!email){
      setError("Please enter a valid email");
      toast.error("Please enter a valid email");
      return;
    }

    if(!password){
      setError("Please enter a valid password");
      toast.error("Please enter a valid password");
      return;
    }

    setError("");

    // sign in api calls
    try {
      dispatch(signInStart());
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password
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
    <div className='container w-full overflow-hidden flex flex-col text-center'>
      <div  className='md:w-2/6 mx-auto pt-2 mt-10 border-2 bg-[#e4dfdf2e] rounded-lg border-[#e4dfdf8c] p-4'>
          <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
           <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                <input type='text-' placeholder='User Email' value={email}
                onChange={(e) => setEmail(e.target.value)} id='userEmail' className=' p-3 rounded-lg' />
                <input type='password' placeholder='User Password' value={password}
                onChange={(e) => setPassword(e.target.value)} id='userPassword' className=' p-3 rounded-lg' />
                <button type='submit' className='bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
                <OAuth />
          </form>
      <div className='md:flex gap-2 mt-5'>
        <p>Dont Have a account?</p>
        <Link to={'/sign-up'}>
           <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error ? error || 'something went wrong' : ''}</p>
      </div>
    </div>
  )
}

export default SignIn