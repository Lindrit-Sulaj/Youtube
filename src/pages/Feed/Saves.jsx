import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { VideoCard } from '../../components/'

const Saves = () => {
  const saves = useSelector(state => state.saves);
  console.log(saves);

  return (
    <section className='lg:px-4'>
      <h2 className='mt-3 ml-4 lg:mx-0 text-2xl font-medium text-white font-secondary'>Saved videos</h2>
      {saves.length < 1 && <p>You have no saved videos</p>}

      <div className="flex flex-wrap mt-6">
        {
          saves.map(video => (
            <Video
              key={video.videoId}
              thumbnail={video?.thumbnail}
              title={video.title}
              videoId={video.videoId}
              channelId={video.channelId}
              channelTitle={video.channelTitle}
            />
          ))
        }
      </div>
    </section>
  )
}

const Video = ({ thumbnail, title, videoId, channelId, channelTitle }) => {
  return (
    <div className='w-full md:w-1/2 lg:w-1/4 xl:w-1/5 md:p-2'>
      <div className='flex justify-between items-center flex-wrap mx-4 mb-2 md:mx-2'>
        <Link to={`/channel/${channelId}/`}>
          <p className='text-[17px] font-secondary font-medium text-neutral-500'>{channelTitle}</p>
        </Link>
        <button className='flex items-center justify-center w-10 h-10 bg-neutral-850 rounded-full text-neutral-400 transition-all hover:bg-neutral-700 hover:text-neutral-100'>
        <i className="fa-solid fa-bookmark"></i>
        </button>
      </div>
      <Link to={`/video/${videoId}`}>
        <img className='aspect-video w-full object-cover md:rounded-xl' src={thumbnail} alt={title} />
      </Link>
      <Link to={`/video/${videoId}`}>
        <h2 className='text-lg text-white font-medium mx-2 mt-4'>{title}</h2>
      </Link>
    </div>
  )
}

export default Saves