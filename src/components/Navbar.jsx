import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import useMediaQuery from '../hooks/useMediaQuery';
import MenuItem from './MenuItem';

const Navbar = () => {
  const navigate = useNavigate();
  const [windowWidth, breakpoint] = useMediaQuery();
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm === '' || searchTerm.split(" ").length < 1) return;

    navigate(`/search/${searchTerm}`);
  }

  return (
    <nav className='navbar h-[75px] fixed top-0 w-full pr-4 bg-neutral-200 dark:bg-neutral-1000'>
      {(breakpoint === 'sm' || breakpoint === 'md') ? (
        <div className='bg-neutral-200 dark:bg-neutral-850 my-3 ml-5 mr-0 py-2 px-6 flex items-center rounded-xl relative'>
          <button className='w-[5%] text-black dark:text-blue-400' onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" className='w-[90%] bg-transparent h-full outline-none px-3 text-white' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for any video' />
          <button className='rounded-full text-blue-500 dark:text-blue-400 text-2xl w-[5%]' onClick={() => setMenuOpened(!menuOpened)}>
            <i className="fa-solid fa-circle-user"></i>
          </button>

          {menuOpened && (
            <div className='absolute top-[60px] right-0 w-40  slide-in-top py-3 bg-neutral-850 rounded-lg'>
              <div className='flex justify-between items-center pb-2 border-solid border-b-[1px] mb-4 px-3 border-b-neutral-800'>
                <div className='text-sky-100 font-medium'>
                  <p>Youtube</p>
                </div>
                <button className='block text-xl text-neutral-200' onClick={() => setMenuOpened(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className='flex justify-center'>
                <MenuItem
                  icon="fa-solid fa-bookmark"
                  title="Saved videos"
                  link="/feed/saved-videos" />
                <MenuItem
                  icon="fa-solid fa-address-book"
                  title="History"
                  link="/feed/history" />
                <MenuItem
                  icon="fa-solid fa-clapperboard"
                  title="Subscriptions"
                  link="/feed/subscriptions" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-between h-full items-center px-4'>
          <div className='text-white ml-2 flex gap-2 items-center'>
            <img src="https://ik.imagekit.io/0s9lwb2yr/Youtube/logo?ik-sdk-version=javascript-1.4.3&updatedAt=1672143987388" className='w-6 h-6' alt="Logo" />
            <h1 className='text-blue-300 text-xl font-medium'>YouTube</h1>
          </div>
          <div className='flex items-center bg-neutral-850 px-4 gap-2 rounded-lg'>
            <i className="fa-solid fa-magnifying-glass text-white" onClick={handleSearch}></i>
            <input type="text" className='bg-transparent w-[340px] h-12 outline-none text-white px-2' placeholder='Search for videos' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className='flex items-center gap-6 justify-end text-2xl text-blue-300'>
            <i className="fa-solid fa-square-plus"></i>
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-circle-user"></i>
          </div>
        </div>
      )}
    </nav>
  )
}



export default Navbar