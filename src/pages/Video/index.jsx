import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useGetVideoDetailsQuery } from '../../redux/services/youtubeApi';
import { saveVideo, unsaveVideo } from '../../redux/features/savesSlice';
import { addVideo } from '../../redux/features/historySlice';
import { Loader, VideoCard } from '../../components';
import Comments from './Comments';
import RelatedVideos from './RelatedVideos';

const Video = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const videoDetails = useGetVideoDetailsQuery(id);
  const [descriptionOpened, setDescriptionOpened] = useState(false);
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const saves = useSelector(state => state.saves);

  const isVideoSaved = useMemo(() => {
    let index = saves.findIndex(elem => elem.videoId == id);

    if (index > -1) {
      return true;
    }

    return false;
  }, [saves, id]);

  useEffect(() => {
    if (videoDetails.isLoading && videoDetails.status !== 'fulfilled') return;

    const result = videoDetails.data;

    const video = {
      thumbnail: result?.items[0]?.snippet?.thumbnails?.high?.url,
      channelTitle: result?.items[0]?.snippet?.channelTitle,
      title: result?.items[0]?.snippet?.title,
      channelId: result?.items[0]?.snippet?.channelId,
      videoId: result?.items[0]?.id
    };

    dispatch(addVideo(video));
  }, [videoDetails, id])

  const handleSaveVideo = () => {
    const result = videoDetails.data;

    const video = {
      thumbnail: result?.items[0]?.snippet?.thumbnails?.high?.url,
      channelTitle: result?.items[0]?.snippet?.channelTitle,
      title: result?.items[0]?.snippet?.title,
      channelId: result?.items[0]?.snippet?.channelId,
      videoId: result?.items[0]?.id
    }

    if (!isVideoSaved) {
      dispatch(saveVideo(video));
    } else if (isVideoSaved) {
      dispatch(unsaveVideo(id));
    }
  };

  if (videoDetails.isLoading) return <div className='text-white'><Loader /></div>

  return (
    <section className="video px-2 pl-3 md:px-4 overflow-hidden">
      {!videoDetails.isLoading && !videoDetails.error && (
        <>
          <div className="text-white overflow-y-auto px-0 md:px-4">
            <iframe className='aspect-video w-full rounded-xl cursor-pointer'
              src={`https://www.youtube-nocookie.com/embed/${id}`}>
            </iframe>
            <div className="text-black dark:text-white flex items-center justify-between  my-6">
              <div>
                <Link to={`/channel/${videoDetails?.data?.items[0]?.snippet?.channelId}`} className="text-neutral-500">{videoDetails?.data?.items[0]?.snippet.channelTitle}</Link>
                <h1 className='text-xl text-neutral-800 dark:text-white font-secondary mt-1'>{videoDetails.data?.items[0]?.snippet.title}</h1>
                <p className='flex gap-1 text-neutral-400 dark:text-neutral-300 mt-2'>
                  <span>{formatter.format(videoDetails?.data.items[0]?.statistics.viewCount)}</span>
                  <span>views</span>
                </p>
              </div>
              <div className='flex gap-4'>
                <button className="transition-all w-10 h-10 dark:text-white dark:bg-neutral-700 flex items-center justify-center rounded-full dark:hover:bg-neutral-800" onClick={handleSaveVideo}>
                  <i className={`fa-${(isVideoSaved) ? 'solid' : 'regular'} fa-bookmark`}></i>
                </button>
              </div>
            </div>
            <div className='bg-neutral-150 dark:bg-neutral-800 rounded-lg p-4 border-solid border-[1px] border-neutral-300 dark:border-neutral-800' onClick={() => {
              if (!descriptionOpened) {
                setDescriptionOpened(true);
              }
            }}>
              <div className='flex justify-between'>
                <button className='uppercase text-black font-medium dark:text-white' onClick={() => setDescriptionOpened(true)}>Description</button>
                <button onClick={() => setDescriptionOpened(false)} className={`${(!descriptionOpened) ? 'hidden' : 'flex justify-center items-center'} w-8 h-8 bg-neutral-500 dark:bg-neutral-700 rounded-full`}>
                  <span className="material-symbols-outlined">
                    close
                  </span>
                </button>
              </div>
              {(descriptionOpened && !videoDetails.isLoading) && (
                <div className='description'>
                  <p className='text-neutral-400 font-secondary mt-4'>{videoDetails?.data?.items[0].snippet.description}</p>

                  {(videoDetails.data.items[0].snippet.hasOwnProperty('tags')) && (
                    <>
                      <p className='mt-6 mb-2 text-black dark:text-white'>Tags</p>
                      <ul className='ml-6 text-neutral-700 dark:text-neutral-300'>
                        {videoDetails.data.items[0].snippet.tags.map((tag, index) => (
                          <li className='list-style list-disc underline underline-offset-2' key={index}>
                            <Link to={`/search/${tag}`}>{tag}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
            <Comments />
          </div>
          <div className='overflow-y-auto overflow-x-hidden'>
            <RelatedVideos id={id} />
          </div>
        </>
      )
      }
    </section >
  )
}

export default Video