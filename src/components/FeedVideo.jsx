import React from 'react';
import { Link } from 'react-router-dom';

const FeedVideo = ({ thumbnail, title, videoId, channelId, channelTitle, handleAction, actionIcon }) => {
  if (!videoId) return;

  return (
    <div className='w-full md:w-1/2 lg:w-1/4 xl:w-1/5 md:p-2'>
      <div className='flex justify-between items-center flex-wrap mx-4 mb-2 md:mx-2'>
        <Link to={`/channel/${channelId}/`}>
          <p className='text-[17px] font-secondary font-medium text-neutral-600 dark:text-neutral-500'>{channelTitle}</p>
        </Link>
        <button className='flex items-center justify-center bg-neutral-200 hover:bg-neutral-300 w-10 h-10 dark:bg-neutral-850 rounded-full dark:text-neutral-400 transition-all dark:hover:bg-neutral-700 dark:hover:text-neutral-100' onClick={() => handleAction(videoId || '')}>
        <i className={actionIcon}></i>
        </button>
      </div>
      <Link to={`/video/${videoId}`}>
        <img className='aspect-video w-full object-cover md:rounded-xl' src={thumbnail} alt={title} />
      </Link>
      <Link to={`/video/${videoId}`}>
        <h2 className='text-lg  font-medium mx-2 mt-4 text-neutral-700 dark:text-white'>{title}</h2>
      </Link>
    </div>
  )
}


export default FeedVideo