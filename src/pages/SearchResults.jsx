import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetSearchResultsQuery } from '../redux/services/youtubeApi';
import { Loader, VideoCard } from '../components/';

const SearchResults = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSearchResultsQuery(id);

  if (!isLoading) { console.log(data) }

  return (
    <div className='text-white'>
      {isLoading && <Loader />}
      {error && <p>An error has occurred</p>}
      {(!isLoading && !error) && (
        <div className='mt-4 w-full lg:w-4/5 mx-auto'>
          <p className='px-4 my-3 md:text-lg text-left text-neutral-300'>Results for <span className='font-semibold text-blue-100'>{id}</span></p>
          {data?.items.map((video, id) => (
            <VideoCard
              key={id}
              type='search'
              videoId={video.id.videoId}
              channelId={video.snippet.channelId}
              channelTitle={video.snippet.channelTitle}
              description={video.snippet.description}
              publishTime={video.snippet.publishTime}
              thumbnail={video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url}
              title={video.snippet.title}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults