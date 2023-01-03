import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Loader, VideoCard } from '../components';
import { useGetChannelDetailsQuery, useGetChannelVideosQuery } from '../redux/services/youtubeApi';
import { subscribe, unsubscribe } from '../redux/features/subsSlice';

const Channel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const { data, isLoading, error } = useGetChannelDetailsQuery(id);
  const { data: videosData, isLoading: videosLoading, error: videosError } = useGetChannelVideosQuery(id);

  const subs = useSelector(state => state.subs);
  const isSubscribed = useMemo(() => {
    let index = subs.findIndex(elem => elem.channelId === id);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }, [subs, id]);

  const handleSubscribe = () => {
    let items = data.items;

    if (isSubscribed) {
      dispatch(unsubscribe(id));
      return;
    }

    const channel = {
      channelId: items[0]?.id,
      title: items[0]?.brandingSettings?.channel?.title,
      description: items[0]?.brandingSettings?.channel?.description,
      customUrl: items[0]?.snippet?.customUrl,
      thumbnail: items[0]?.snippet?.thumbnails?.high?.url,
      subscribers: items[0]?.statistics?.subscriberCount,
      views: items[0]?.statistics?.viewCount
    }

    dispatch(subscribe(channel));
  }

  if (isLoading) return <div className='text-white'><Loader /></div>

  if (!data.hasOwnProperty('items')) {
    return <p className='text-white text-center font-secondary'>Couldn't load channel details</p>
  }

  return (
    <div className="text-white my-3">
      {(!isLoading && !error) && (
        <div>
          <div>
            <img className="w-full h-auto object-cover md:h-80 rounded-xl" src={data.items[0].brandingSettings.image?.bannerExternalUrl || 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'} alt={`${data.items[0].brandingSettings.channel.title} banner`} />
          </div>
          <div className='flex w-full px-4 md:px-0 mt-8 md:w-5/6 mx-auto gap-4 items-center'>
            <img className="w-12 h-12 md:w-24 md:h-24 object-cover rounded-full" src={data.items[0].snippet.thumbnails.high.url} alt={`${data.items[0].brandingSettings.channel.title} profile picture`} />
            <div>
              <h1 className="text-[17px] md:text-lg font-medium font-secondary">{data?.items[0].brandingSettings.channel.title}</h1>
              <h2 className='text-neutral-400 text-[15px] mb-1 md:mb-2 md:text-base'>{data?.items[0].snippet.customUrl}</h2>
              <p className='text-neutral-400 text-sm font-medium md:text-base'>{formatter.format(data?.items[0].statistics.subscriberCount)} Subscribers</p>
            </div>
            <button
              onClick={handleSubscribe}
              className={`transition-all ml-auto px-4 py-[6px] rounded-md ${!isSubscribed ? 'bg-neutral-600 hover:bg-neutral-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isSubscribed ? 'Subscribed' : 'Subscribe '}
            </button>
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