import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = (
  { type = 'normal', thumbnail, channelTitle, description, title, publishTime = '', channelId, videoId }
) => {
  return (
    <>
      {type === 'normal' ? (
        <div className='w-[100%] mx-auto text-black dark:text-white py-4 md:p-4 md:w-1/3 md:mx-0 lg:w-1/4 xl:w-1/5'>
          <img src={thumbnail} alt={title} className="w-full aspect-video object-cover md:h-auto md:rounded-xl dark:md:border-solid dark:md:border-[2px]  dark:md:border-neutral-850" />
          <Link to={`/video/${videoId}`}>
            <h2 className='text-[17px] mt-6 mb-1 mx-2 md:mx-0 font-medium dark:text-white'>{title}</h2>
          </Link>
          <Link to={`/channel/${channelId}`} className='text-neutral-500 dark:text-neutral-400 mx-2 md:mx-0 font-medium font-secondary flex items-center gap-1'>
            <span className="material-symbols-outlined text-lg flex items-center justify-center">
              check_circle
            </span>
            {channelTitle}
          </Link>
          <p className='text-neutral-500 dark:text-neutral-500 text-sm mt-1 font-medium mx-2 md:mx-0'>{publishTime.slice(0, 10)}</p>
        </div>
      ) : (
        <div className='flex flex-col w-full px-5 py-6 gap-4 md:flex-row max-w-[1000px]'>
          <img src={thumbnail} alt={title} className="object-cover w-96 max-w-full rounded-xl aspect-video" />
          <div className='md:flex flex-col md:justify-center'>
            <Link to={`/video/${videoId}`}>
              <h2 className='text-[17px] mt-4 my-2 font-medium dark:text-white'>{title}</h2>
            </Link>
            <Link to={`/channel/${channelId}`} className='text-neutral-500 dark:text-neutral-400 font-medium font-secondary flex items-center gap-1'>
              <span className="material-symbols-outlined text-lg flex items-center justify-center">
                check_circle
              </span>
              {channelTitle}
            </Link>
            <p className='text-neutral-500 text-sm mt-2 font-medium'>{publishTime.slice(0, 10)}</p>

            <p className='mt-3 font-secondary text-sm text-neutral-500' >{description}</p>
          </div>
        </div>
      )}
    </>

  )
}

export default VideoCard