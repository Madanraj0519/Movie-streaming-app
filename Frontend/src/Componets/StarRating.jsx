import React from 'react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const StarRating = ({stars}) => {
    const ratingStar = Array.from({ length : 5}, (elem, index) => {
        let number = index ;

        return <span key={index}>
            {
                stars > index + 1 ?
               < FaStar className='text-yellow-500' /> : stars > number ? 
                <FaStarHalfAlt className='text-yellow-500' /> : 
                <AiOutlineStar className='text-yellow-500 text-lg' />
            }
        </span>
    })
  return (
    <div className='flex mt-3'>
        {ratingStar}
    </div>
  )
}

export default StarRating