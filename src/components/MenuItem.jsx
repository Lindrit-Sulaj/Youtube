import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = ({ title, link, icon, setMenuOpened }) => {
  return (
    <Link to={link} className="transition-all bg-neutral-150 dark:bg-neutral-850 h-14 w-14 flex items-center justify-center rounded-lg hover:rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700" onClick={() => setMenuOpened(false)}>
      <div className='flex justify-center items-center' tooltip={title}>
        <i className={`${icon} text-neutral-600 dark:text-neutral-200`}></i>
      </div>
    </Link>
  )
}

export default MenuItem