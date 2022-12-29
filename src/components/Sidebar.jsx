import React from 'react';
import MenuItem from './MenuItem';

const Sidebar = () => {
  return (
    <div className="sidebar py-4 pt-[75px] overflow-auto">
      
      <div className=''>
        <MenuItem title="Home" link="/" icon="fa-solid fa-house" />
        <MenuItem title="Subscriptions" link="/feed/subscriptions" icon="fa-solid fa-clapperboard" />
        <a href="https://github.com/Lindrit-Sulaj" className="transition-all flex px-4 items-center py-2 gap-4 lg:gap-5 lg:py-[10px] hover:bg-neutral-800" onClick={() => setMenuOpened(false)}>
          <div className='flex justify-center items-center'>
            <i className={`fa-brands fa-github text-neutral-200`}></i>
          </div>
          <span className='text-neutral-200 lg:text-lg font-secondary'>Creator</span>
        </a>
      </div>
      <hr className='my-4 border-none h-[2px] bg-neutral-800' />
      <dir>
        <MenuItem title="Saved videos" link="feed/saved-videos" icon="fa-solid fa-bookmark"/>
        <MenuItem title="History" link="feed/history" icon="fa-solid fa-address-book"/>
        <MenuItem title="Coding" link="playlist/coding" icon="fa-solid fa-code"/>
      </dir>
    </div>
  )
}

export default Sidebar