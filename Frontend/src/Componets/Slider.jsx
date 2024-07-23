import React, { useRef, useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider({ movies }) {
  const elementRef = useRef();
  const [scrollDirection, setScrollDirection] = useState('right');

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollDirection === 'right') {
        elementRef.current.scrollLeft += screenWidth / 3.5;
        if (elementRef.current.scrollLeft + elementRef.current.clientWidth >= elementRef.current.scrollWidth) {
          setScrollDirection('left');
        }
      } else {
        elementRef.current.scrollLeft -= screenWidth / 3.5;
        if (elementRef.current.scrollLeft <= 0) {
          setScrollDirection('right');
        }
      }
    }, 1000); // Change the scroll position every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [scrollDirection]);

  const sliderRight = (element) => {
    element.scrollLeft += screenWidth - 50;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= screenWidth - 50;
  };

  return (
    <div>
      <div className='opacity-25 hover:opacity-100'>
        <HiChevronLeft
          className="hidden md:block text-white text-[30px] md:text-[60px] absolute mx-2 md:mx-2 mt-[220px] cursor-pointer"
          onClick={() => sliderLeft(elementRef.current)}
        />
        <HiChevronRight
          className='hidden md:block text-white text-[30px] md:text-[60px] absolute mx-2 md:mx-2 mt-[200px] cursor-pointer right-0'
          onClick={() => sliderRight(elementRef.current)}
        />
      </div>

      <div className='scroll flex overflow-x-auto w-full px-2 md:px-16 py-2 md:py-4 scrollbar-none scroll-smooth cursor-pointer' ref={elementRef}>
        {movies.map((item, index) => (
          <img
            key={index}
            src={IMAGE_BASE_URL + item.backdrop_path}
            className='min-w-full md:h-[410px] object-center mr-5 rounded-md hover:border-[4px] cursor-pointer border-gray-400 transition-all duration-100 ease-in'
            loading='lazy'
            alt={`Movie ${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
