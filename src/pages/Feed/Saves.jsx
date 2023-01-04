import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FeedVideo } from '../../components/';
import { unsaveVideo } from '../../redux/features/savesSlice'

const Saves = () => {
  const dispatch = useDispatch();
  const saves = useSelector(state => state.saves);

  const handleUnsave = (id) => {
    dispatch(unsaveVideo(id));
  }

  return (
    <section className='lg:px-4'>
      <h2 className='mt-3 ml-4 lg:mx-0 text-2xl font-medium text-white font-secondary'>Saved videos</h2>
      {saves.length < 1 && <p className='text-neutral-200 ml-4 lg:mx-0 mt-3'>You have no saved videos :(</p>}

      <div className="flex flex-wrap mt-6">
        {
          saves.map(video => (
            <FeedVideo
              key={video.videoId}
              thumbnail={video?.thumbnail}
              title={video.title}
              videoId={video.videoId}
              channelId={video.channelId}
              channelTitle={video.channelTitle}
              handleAction={handleUnsave}
              actionIcon="fa-solid fa-bookmark"
            />
          ))
        }
      </div>
    </section>
  )
}

export default Saves