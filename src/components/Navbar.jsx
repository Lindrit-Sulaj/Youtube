import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';

const Navbar = () => {
  const [windowWidth, breakpoint] = useMediaQuery();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <nav className='navbar h-[65px] fixed top-0 w-full tablet:'>
      {(breakpoint === 'sm' || breakpoint === 'md') ? (
        <div className='bg-neutral-200 dark:bg-neutral-850 my-3 mx-4 py-2 px-6 flex items-center rounded-xl relative'>
          <button className='w-[5%] text-black dark:text-blue-400'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" className='w-[90%] bg-transparent h-full outline-none px-3 text-white' placeholder='Search for any video' />
          <button className='rounded-full text-blue-500 dark:text-blue-400 text-2xl w-[5%]' onClick={() => setMenuOpened(!menuOpened)}>
            <i className="fa-solid fa-circle-user"></i>
          </button>

          {menuOpened && (
            <div className='absolute top-[60px] right-0 w-60  slide-in-top py-3 bg-neutral-850 rounded-lg'>
              <div className='flex justify-between items-center pb-2 border-solid border-b-[1px] mb-4 px-3 border-b-neutral-800'>
                <div className='text-sky-100 font-medium'>
                  <p>Youtube</p>
                </div>
                <button className='block text-xl text-neutral-200' onClick={() => setMenuOpened(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <MenuItem
                icon="fa-solid fa-bookmark"
                title="Saved videos"
                link="/feed/saved-videos" />
              <MenuItem
                icon="fa-solid fa-address-book"
                title="History"
                link="/feed/history" />
              <MenuItem
                icon="fa-solid fa-clock"
                title="Watch Later"
                link="/feed/watch-later" />
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-between h-full items-center'>
          <div className='text-white'>
            Youtube
          </div>
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" />
          </div>

          <div>
            <i className="fa-solid fa-square-plus"></i>
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-circle-user"></i>
          </div>
        </div>
      )}
    </nav>
  )
}

const MenuItem = ({ title, link, icon, setMenuOpened }) => {
  return (
    <Link to={link} className="transition-all flex px-4 items-center py-2 gap-4 hover:bg-neutral-800" onClick={() => setMenuOpened(false)}>
      <i className={`${icon} text-neutral-200`}></i>
      <span className='text-neutral-200'>{title}</span>
    </Link>
  )
}

export default Navbar