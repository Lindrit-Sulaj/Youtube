import React, { useEffect, useState } from 'react';

import { suggestedVideos } from '../assets/constants';
import { VideoCard } from '../components';
import { Loader } from '../components';
import { useGetSuggestedVideosQuery } from '../redux/services/youtubeApi';

const Discover = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(suggestedVideos.all.videoId);

  const { data, isLoading, error } = useGetSuggestedVideosQuery(selectedSuggestion);

  return (
    <div className='text-white'>
      <div className='suggestions flex gap-3 px-4 mt-4 overflow-auto'>
        {
          Object.entries(suggestedVideos).map((suggestion, id) => (
            <Suggestion
              key={id}
              title={suggestion[0]}
              videoId={suggestion[1].videoId}
              selectedSuggestion={selectedSuggestion}
              setSelectedSuggestion={setSelectedSuggestion}
            />
          ))
        }
      </div>

      {(!isLoading && !error) ? (<div className='videos-normal flex flex-wrap my-6'>
        {data?.items.map((video, index) => (
          <VideoCard
            key={index}
            videoId={video.id.videoId}
            channelId={video.snippet.channelId}
            thumbnail={video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url}
            publishTime={video.snippet.publishTime}
            title={video.snippet.title}
            channelTitle={video.snippet.channelTitle}
          />
        ))}

      </div>) : (isLoading) ? (
        <Loader />
      ) : (
        <p>An error has occurred</p>
      )}
    </div>
  )
}

const Suggestion = ({ title, videoId, selectedSuggestion, setSelectedSuggestion }) => {
  return (
    <button className={`${selectedSuggestion === videoId ? 'text-white bg-neutral-700 hover:bg-neutral-800  dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400' : 'bg-neutral-100 hover:bg-neutral-150 text-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'} transition-all whitespace-nowrap  rounded-md px-2 py-1 font-secondary capitalize`} onClick={() => setSelectedSuggestion(videoId)}>
      {title}
    </button>
  )
}

export default Discover