import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = ({ title, link, icon, setMenuOpened }) => {
  return (
    <Link to={link} className="transition-all flex px-4 items-center py-2 gap-4 lg:gap-5 lg:py-[10px] hover:bg-neutral-800" onClick={() => setMenuOpened(false)}>
      <div className='flex justify-center items-center'>
        <i className={`${icon} text-neutral-200`}></i>
      </div>
      <span className='text-neutral-200 lg:text-lg font-secondary truncate'>{title}</span>
    </Link>
  )
}

export default MenuItem