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
      <div className='suggestions flex gap-3 px-4 mt-2 overflow-auto'>
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

      {(!isLoading && !error) ? (<div className='videos-normal flex flex-wrap'>
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
    <button className={`${selectedSuggestion === videoId ? 'bg-neutral-300 text-black hover:bg-neutral-400' : ''} transition-all whitespace-nowrap rounded-md bg-neutral-800 px-2 py-1 font-secondary capitalize hover:bg-neutral-700`} onClick={() => setSelectedSuggestion(videoId)}>
      {title}
    </button>
  )
}

export default Discover