import React from 'react';
import MenuItem from './MenuItem';

const Sidebar = () => {
  return (
    <div className="sidebar py-4 pt-[75px] overflow-auto">

      <div className='flex flex-col items-center gap-3'>
        <MenuItem title="Home" link="/" icon="fa-solid fa-house" />
        <MenuItem title="Subscriptions" link="/feed/subscriptions" icon="fa-solid fa-clapperboard" />
        <MenuItem title="Saved videos" link="/feed/saved-videos" icon="fa-solid fa-bookmark" />
        <MenuItem title="History" link="/feed/history" icon="fa-solid fa-address-book" />
        <a href="https://github.com/Lindrit-Sulaj" className="bg-neutral-800 h-14 w-14 flex items-center justify-center rounded-lg">
          <div className='flex justify-center items-center'>
            <i className={`fa-brands fa-github text-neutral-200`}></i>
          </div>
        </a>
      </div>

    </div>
  )
}

export default Sidebar