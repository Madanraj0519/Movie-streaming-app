import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Subcription = () => {

    const [active, setActive] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const subscription = [
        { 
            id : 0,
            title : 'Super',
            content : <FaCheck />,
            watch : <FaCheck />,
            ads : <FaX />,
            devices : 2,
            quality : "Full HD 1080P",
            audio : "Dolby atoms"
        },
        { 
            id : 1,
            title : 'Supreme',
            content : <FaCheck />,
            watch : <FaCheck />,
            ads : <FaCheck/>,
            devices : 2,
            quality : "Full HD 1080P",
            audio : "Dolby atoms"
        },
        { 
            id : 2,
            title : 'Premium',
            content : <FaCheck />,
            watch : <FaCheck />,
            ads : <FaCheck />,
            devices : 4,
            quality : "4K 2016P +Dolby",
            audio : "Dolby atoms"
        },
    ]
  return (
    <div className='absolute top-0 w-full h-screen bg-[#000000e7]'>
        <div className='flex w-full h-screen justify-between'>
            <div className='w-[600px] h-screen bg-[#00000087] hidden md:block '>
                <div className='container'>
                  <div className='px-16 pt-16'>
                    <Link to={`/watch/${id}`}><FaX className='text-3xl text-white hover:scale-105 duration-100 transition-all  mb-4 cursor-pointer' /></Link>
                    <h3 className='text-4xl font-semibold opacity-80'>Upgrade to get more out of your Movie subscription</h3>
                 </div>
                 <div className='px-16 mt-6'>
                    <div className='border flex justify-start items-center gap-2 border-zinc-300 p-1 rounded-md bg-[#0000008a]'>
                        <BiSolidOffer className='text-4xl' />
                        <div>
                          <h2 className='font-semibold'>Offers unlocked just for you</h2>
                          <p className='text-gray-500'>Limited period offer</p>
                        </div>
                    </div>
                 </div>
                </div>
            </div>
            <div className='bg-[#090a17d9] w-[400px] md:w-[1000px] h-screen shadow-xl shadow-zinc-500 overflow-y-scroll'>
            <Link to={`/watch/${id}`}><FaX className='text-xl text-white hover:scale-105 duration-100 mt-3 ml-3 transition-all cursor-pointer md:hidden' /></Link>
                <div className='w-full flex px-3 md:p-12 overflow-x-scroll md:overflow-x-hidden'>
                    <div className='h-full w-[250px] md:w-[400px]'>
                        <div className='md:py-14 flex flex-col gap-6 md:gap-10 mt-6 md:mt-0 justify-center'>
                            <div className='text-xl font-medium'>
                                <h2 className='text-sm md:text-xl'>All content</h2>
                                <p className='text-xs md:text-base text-zinc-500'>Movies, Live Sports, Tv Series, Specials</p>
                            </div>
                            <p className='text-xs md:text-xl font-medium'>Watch on Tv or Laptop or Mobile</p>
                            <p className='text-xs md:text-xl font-medium'>Ads free movies & shows</p>
                            <p className='text-xs md:text-xl font-medium'>Number of devices that can be logged in</p>
                            <p className='text-xs md:text-xl font-medium'>Max video Quality</p>
                            <div>
                              <p className='text-xs md:text-xl font-medium'>Max Audio Quality</p>
                              <p className='text-xs md:text-base text-zinc-500'>Atoms available on select titles only</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-full w-[200px] md:w-[600px]'>
                        <div className='py-4 px-2 md:px-4 flex flex-col gap-3 md:gap-6 justify-center pointer-events-none'>
                          <div className='flex gap-4 justify-between p-2'>
                             {
                                subscription.map((item, index) => (
                                    <div key={item.id} className={`flex flex-col gap-12 md:gap-8 justify-center cursor-pointer w-[150px] bg-[#504f4f65]
                                     items-center rounded-md border p-4 md:p-8 border-gray-300 ${active === index ? "scale-110 transition-all duration-150" : ""}`}>
                                       <p className='text-xs md:text-xl font-medium text-center text-yellow-700'>{item.title}</p>
                                       <p className='text-xs md:text-xl font-medium'>{item.content}</p>
                                       <p className='text-xs md:text-xl font-medium'>{item.watch}</p>
                                       <p className='text-xs md:text-xl font-medium'>{item.ads}</p>
                                       <p className='text-xs md:text-xl font-medium'>{item.devices}</p>
                                       <p className='text-xs md:text-xl font-medium text-center'>{item.quality}</p>
                                       <p className='text-xs md:text-xl font-medium text-center'>{item.audio}</p>
                                    </div>
                                ))
                              }
                          </div>
                        </div>
                    </div>
                </div>

                <div className='p-5 mt-3 md:mt-0 md:p-10'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div onClick={() => setActive(0)} className={`border border-gray-600 cursor-pointer rounded-md ${active === 0 ? "scale-110 transition-all duration-150 text-yellow-600" : ""} `}>
                        <div className='p-5 flex flex-col gap-2'>
                          <h2 className='text-xl font-semibold text-blue-800'>Current Plan</h2>
                          <h2 className='text-xl font-semibold '>Super</h2>
                          <h2 className='text-2xl font-semibold text-white flex gap-1 items-center'><MdCurrencyRupee />899/Year</h2>
                        </div>
                    </div>
                    <div onClick={() => setActive(1)} className={`border border-gray-600 cursor-pointer rounded-md ${active === 1 ? "scale-110 transition-all duration-150 text-yellow-600" : ""} `}>
                        <div className='p-5 flex flex-col gap-2'>
                          <h2 className='text-xl font-semibold text-blue-800'>Upgrade To</h2>
                          <h2 className='text-xl font-semibold '>Supreme</h2>
                          <h2 className='text-2xl font-semibold text-white flex gap-1 items-center'><MdCurrencyRupee />1099/Year</h2>
                        </div>
                    </div>
                    <div onClick={() => setActive(2)} className={`border border-gray-600 cursor-pointer rounded-md ${active === 2 ? "scale-110 transition-all duration-150text-yellow-600" : ""} `}>
                        <div className='p-5 flex flex-col gap-2'>
                          <h2 className='text-xl font-semibold  text-blue-800'>Upgrade To</h2>
                          <h2 className='text-xl font-semibold '>Premium</h2>
                          <h2 className='text-2xl font-semibold text-white flex gap-1 items-center'><MdCurrencyRupee />1349/Year</h2>
                        </div>
                    </div>
                </div>
                </div>

                <div className='w-full px-12 py-4 pb-4'>
                  <div className='flex gap-5'>
                    <div>
                        <h2 className='md:text-lg whitespace-nowrap font-semibold'>You pay</h2>
                        <h2>789/Year</h2>
                    </div>
                    <div className='w-full'>
                        <button className='w-full bg-blue-800 text-base whitespace-nowrap md:text-xl font-semibold hover:scale-100 duration-90 transition-all'>
                            Upgrade Now
                        </button>
                    </div>
                  </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Subcription