import React from 'react';
import { useParams } from 'react-router-dom';

import { Loader, VideoCard } from '../components';
import { useGetChannelDetailsQuery, useGetChannelVideosQuery } from '../redux/services/youtubeApi';

const Channel = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetChannelDetailsQuery(id);
  const { data: videosData, isLoading: videosLoading, error: videosError } = useGetChannelVideosQuery(id);

  console.log(videosData);

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  if (isLoading) return <div className='text-white'><Loader /></div>

  return (
    <div className="text-white my-3">
      {(!isLoading && !error) && (
        <div>
          <div>
            <img className="w-full h-auto object-cover md:h-80 rounded-xl" src={data.items[0].brandingSettings.image?.bannerExternalUrl || 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'} alt={`${data.items[0].brandingSettings.channel.title} banner`} />
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
          {(!videosLoading && !videosError) && (
            <div className='px-4 mx-auto mt-14'>
              <div className='flex gap-6 md:gap-8 px-4'>
                <p className='text-neutral-300 font-medium font-secondary'>Videos: {formatter.format(data.items[0].statistics.videoCount)}</p>
                <p className="text-neutral-300 font-medium font-secondary">Views: {formatter.format(data.items[0].statistics.viewCount)}</p>
              </div>
              <div className='flex flex-wrap'>
                {videosData.items.map((video, id) => {
                  if (!video.id.videoId) return
                  return <VideoCard
                    key={id}
                    thumbnail={video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url}
                    title={video.snippet.title}
                    channelId={video.snippet.channelId}
                    videoId={video.id.videoId}
                    publishTime={video.snippet.publishTime}
                    channelTitle={video.snippet.channelTitle}
                  />
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Channel