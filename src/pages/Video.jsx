import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useGetVideoDetailsQuery, useGetVideoCommentsQuery, useGetSuggestedVideosQuery } from '../redux/services/youtubeApi';
import { Loader, VideoCard } from '../components'

const Video = () => {
  const [descriptionOpened, setDescriptionOpened] = useState(false);
  const [viewComments, setViewComments] = useState(true);
  const { id } = useParams();
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  const videoDetails = useGetVideoDetailsQuery(id);
  const videoComments = useGetVideoCommentsQuery(id);

  if (videoDetails.isLoading) return <div className='text-white'><Loader /></div>


  return (
    <section className="video px-4 overflow-hidden">
      {!videoDetails.isLoading && !videoDetails.error && (
        <>
          <div className="text-white overflow-y-auto px-2 md:px-4">
          <iframe className='aspect-video w-full rounded-xl'
              src={`https://www.youtube-nocookie.com/embed/${id}`}>
            </iframe>
            <div className="text-white flex items-center justify-between  my-6">
              <div>
                <Link to={`/channel/${videoDetails?.data?.items[0].snippet.channelId}`} className="text-neutral-500">{videoDetails?.data?.items[0]?.snippet.channelTitle}</Link>
                <h1 className='text-xl font-secondary mt-1'>{videoDetails.data?.items[0].snippet.title}</h1>
                <p className='flex gap-1 text-neutral-300 mt-2'>
                  <span>{formatter.format(videoDetails?.data.items[0].statistics.viewCount)}</span>
                  <span>views</span>
                </p>
              </div>
              <div className='flex gap-4'>
                <button className="transition-all w-10 h-10 bg-neutral-700 flex items-center justify-center rounded-full hover:bg-neutral-800">
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
                <button className="transition-all w-10 h-10 bg-neutral-700 flex items-center justify-center rounded-full hover:bg-neutral-800">
                  <span className="material-symbols-outlined">
                    update
                  </span>
                </button>
              </div>
            </div>
            <div className='bg-neutral-800 rounded-lg p-4 border-solid border-[1px] border-neutral-800' onClick={() => {
              if (!descriptionOpened) {
                setDescriptionOpened(true);
              }
            }}>
              <div className='flex justify-between'>
                <button className='uppercase font-medium' onClick={() => setDescriptionOpened(true)}>Description</button>
                <button onClick={() => setDescriptionOpened(false)} className={`${(!descriptionOpened) ? 'hidden' : 'flex justify-center items-center'} w-8 h-8 bg-neutral-700 rounded-full`}>
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
                      <p>Tags</p>
                      <ul className='ml-6 text-neutral-300'>
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

            <div className='mt-8 pb-4'>
              <div className='flex justify-between mb-2'>
                <p className='font-secondary'>Comments</p>
                <button onClick={() => setViewComments(!viewComments)} className='text-blue-300'>{viewComments ? 'Hide' : 'Show'}</button>
              </div>
              {(!videoComments.isLoading && !videoComments.error && !videoComments.data.hasOwnProperty('snippet')) && (
                <div className={`${viewComments ? 'block' : 'hidden'}`}>
                  {videoComments.data.items.map(comment => (
                    <Comment
                      key={comment.id}
                      channelId={comment.snippet.topLevelComment.snippet.authorChannelId.value}
                      profileImage={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                      text={comment.snippet.topLevelComment.snippet.textDisplay}
                      likes={comment.snippet.topLevelComment.snippet.likeCount}
                      replies={comment.snippet.totalReplyCount}
                      displayName={comment.snippet.topLevelComment.snippet.authorDisplayName}
                      formatter={formatter}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='overflow-auto'>
            <RelatedVideos id={id} />
          </div>
        </>
      )
      }
    </section >
  )
}

const RelatedVideos = (id) => {
  const { data, isLoading, error } = useGetSuggestedVideosQuery(id.id);

  if (isLoading) return <p>Loading related videos</p>
  if (error) return <p>Error</p>

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-y-8 lg:flex-col">
      {data.items.map(video => (
        <div className='w-full md:w-1/3 md:px-2 lg:w-full lg:px-0' key={video.id.videoId}>
          <Link to={video.id.videoId}>
            <img className='w-full  object-cover aspect-video rounded-lg' src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
            </Link>
          <Link className="text-white block font-medium mt-4 mb-2" to={video.id.videoId}>
            {video.snippet.title}
            </Link>
          <Link className='text-neutral-400 font-secondary' to={video.snippet.channelId}>
            {video.snippet.channelTitle}
          </Link>
          <p className='text-neutral-500 mt-1'>{video.snippet.publishTime.slice(0, 10)}</p>
        </div>
      ))}
    </div>
  )
}

const Comment = (
  { channelId, displayName, profileImage, text, likes, replies, formatter }
) => {
  const navigate = useNavigate();
  const goToProfile = () => navigate(`/channel/${channelId}`)

  return (
    <div className='my-2 px-3 py-3 bg-neutral-900 rounded-lg overflow-x-auto'>
      <div className='flex gap-2 items-center' onClick={goToProfile}>
        <img className='rounded-full w-10 h-10' src={profileImage} alt={displayName} />
        <h2 className='text-neutral-400 font-medium'>{displayName}</h2>
      </div>
      <p className='mt-3 font-secondary'>{text}</p>
      <div className='flex gap-4 mt-2'>
        <div className='flex items-center gap-1'>
          <span className='material-symbols-outlined text-red-400 text-xl'>favorite</span>
          <span className='text-sm'>{formatter.format(likes)}</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className="material-symbols-outlined text-neutral-400 text-xl">forum</span>
          <span className='text-sm'>{formatter.format(replies)}</span>
        </div>
      </div>
    </div>
  )
}

export default Video