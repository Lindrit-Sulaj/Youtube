import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FeedVideo } from '../../components';
import { clearHistory, removeVideo } from '../../redux/features/historySlice';

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history);

  const handleRemoveVideo = (id) => {
    dispatch(removeVideo(id));
  }

  return (
    <section className='lg:px-4'>
      <h2 className=' text-2xl font-medium text-white font-secondary mt-3 ml-4 lg:mx-0'>History</h2>
      {history.length > 0 &&
        (
          <button
            className='text-red-300 mt-3 ml-4 lg:mx-0 hover:bg-neutral-900 py-1'
            onClick={() => dispatch(clearHistory())}>
            Clear all
          </button>
        )
      }

      {history.length < 1 &&
        (
          <p className='text-neutral-200 ml-4 lg:mx-0 mt-3'>Your history is empty</p>
        )
      }

      <div className="flex flex-wrap mt-6">
        {
          history.map(video => (
            <FeedVideo
              key={video.videoId}
              thumbnail={video?.thumbnail}
              title={video.title}
              videoId={video.videoId}
              channelId={video.channelId}
              channelTitle={video.channelTitle}
              handleAction={handleRemoveVideo}
              actionIcon='fa-solid fa-trash'
            />
          ))
        }
      </div>
    </section>
  )
}

export default History