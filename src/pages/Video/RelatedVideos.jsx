import React from 'react';
import { useGetSuggestedVideosQuery } from '../../redux/services/youtubeApi';
import { Link } from 'react-router-dom';

const RelatedVideos = (id) => {
  const { data, isLoading, error } = useGetSuggestedVideosQuery(id.id);

  if (isLoading) return <p>Loading related videos</p>
  if (error) return <p>Error</p>

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-y-8 lg:flex-col">
      {data?.items?.map(video => (
        <div className='w-full md:w-1/3 md:px-2 lg:w-full lg:px-0' key={video.id.videoId}>
          <Link to={`../../video/${video.id.videoId}`} relative="path">
            <img className='w-full  object-cover aspect-video rounded-lg' src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
          </Link>
          <Link to={`/video/${video.id.videoId}`} relative='path' className="text-white block font-medium mt-4 mb-2">
            {video.snippet.title}
          </Link>
          <Link className='text-neutral-400 font-secondary' to={`../../channel/${video.snippet.channelId}`} relative="path">
            {video.snippet.channelTitle}
          </Link>
          <p className='text-neutral-500 mt-1'>{video.snippet.publishTime.slice(0, 10)}</p>
        </div>
      ))}
    </div>
  )
}

export default RelatedVideos