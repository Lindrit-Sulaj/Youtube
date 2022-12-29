import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = (
  { type = 'normal', thumbnail, channelTitle, description, title, publishTime, channelId, videoId }
) => {
  return (
    <div className='w-[80%] mx-auto p-4 md:w-1/3 md:mx-0 lg:w-1/4 xl:w-1/5'>
      <img src={thumbnail} alt={title} className="w-full h-60 object-cover md:h-auto"/>
      <Link to={`/video/${videoId}`}><h2 className='text-[17px] mt-4 my-2 font-medium'>{title}</h2></Link>
      <Link to={`/channel/${channelId}`} className='dark:text-neutral-400 font-medium font-secondary'>{channelTitle}</Link>
      <p className='text-neutral-500 text-sm mt-1 font-medium'>{publishTime.slice(0, 10)}</p>
    </div>
  )
}

export default VideoCard