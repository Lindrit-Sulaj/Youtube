import React from 'react';
import { useParams } from 'react-router-dom';

import { Loader, VideoCard } from '../components';
import { useGetChannelDetailsQuery, useGetChannelVideosQuery } from '../redux/services/youtubeApi';

const Channel = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetChannelDetailsQuery(id);
  const { data: videosData, isLoading: videosLoading, error: videosError } = useGetChannelVideosQuery(id);

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  console.log(videosData)

  if (isLoading) return <div className='text-white'><Loader /></div>

  return (
    <div className="text-white my-3">
      {(!isLoading && !error) && (
        <div>
          <div>
            <img className="w-full h-60 object-cover md:h-80 rounded-xl" src={data.items[0].brandingSettings.image.bannerExternalUrl} alt={`${data.items[0].brandingSettings.channel.title} banner`} />
          </div>
          <div className='flex w-full px-4 md:px-0 mt-8 md:w-5/6 mx-auto gap-4 items-center'>
            <img className="w-24 h-24 object-cover rounded-full" src={data.items[0].snippet.thumbnails.high.url} alt={`${data.items[0].brandingSettings.channel.title} profile picture`} />
            <div>
              <h1 className="text-lg font-medium font-secondary">{data.items[0].brandingSettings.channel.title}</h1>
              <h2 className='text-neutral-400 mb-2'>{data.items[0].snippet.customUrl}</h2>
              <p className='text-neutral-400 font-medium'>{formatter.format(data.items[0].statistics.subscriberCount)} Subscribers</p>
            </div>
          </div>
          <div className='w-full md:w-5/6 px-4 md:px-0 mx-auto mt-16'>
            <p className='font-secondary font-medium uppercase text-sky-400'>About</p>
            <p className='mt-3 text-neutral-300'>{data.items[0].snippet.description}</p>
          </div>
          <hr className='md:w-5/6 mx-auto border-none h-1 my-8 bg-neutral-800' />

          {videosLoading && <p>Loading videos</p>}
          {videosError && <p>Couldn't load videos</p>}
          { (!videosLoading && !videosError) && (
            <div className='flex flex-wrap'>
              { videosData.items.map((video, id) => (
                <p>Hello</p>
              )) }
            </div>  
          )}
        </div>
      )}
    </div>
  )
}

export default Channel