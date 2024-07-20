import React from 'react';
import errorImg from "../assets/Images/error-removebg-preview.png";
import Marquee from "react-fast-marquee";

const ErrorContainer = ({message}) => {
  return (
    <div className='relative w-full h-full bg-[#0f0e0eea]'>
      <div className='relative top-0 left-0 w-full h-full opacity-80 bg-[#0f0e0eea]'></div>
        <img className='fixed w-full h-screen object-contain' src={errorImg} />
    </div>
  )
}

export default ErrorContainer