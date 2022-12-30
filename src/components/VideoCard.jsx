import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = (
  { type = 'normal', thumbnail, channelTitle, description, title, publishTime, channelId, videoId }
) => {
  return (
    <>
      {type === 'normal' ? (
        <div className='w-[100%] mx-auto p-4 md:w-1/3 md:mx-0 lg:w-1/4 xl:w-1/5'>
          <img src={thumbnail} alt={title} className="w-full h-60 object-cover md:h-auto rounded-xl border-solid border-[2px] border-neutral-850" />
          <Link to={`/video/${videoId}`}><h2 className='text-[17px] mt-4 my-2 font-medium'>{title}</h2></Link>
          <Link to={`/channel/${channelId}`} className='dark:text-neutral-400 font-medium font-secondary flex items-center gap-1'>
            <span className="material-symbols-outlined text-lg flex items-center justify-center">
              check_circle
            </span>
            {channelTitle}
          </Link>
          <p className='text-neutral-500 text-sm mt-1 font-medium'>{publishTime.slice(0, 10)}</p>
        </div>
      ) : (
        <div className='flex flex-col w-full px-5 py-3 gap-4 md:flex-row max-w-[1000px]'>
          <img src={thumbnail} alt={title} className="h-48 md:h-60 object-cover rounded-xl" />
          <div className='md:flex flex-col md:justify-center'>
            <Link to={`/video/${videoId}`}><h2 className='text-[17px] mt-4 my-2 font-medium'>{title}</h2></Link>
            <Link to={`/channel/${channelId}`} className='dark:text-neutral-400 font-medium font-secondary flex items-center gap-1'>
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