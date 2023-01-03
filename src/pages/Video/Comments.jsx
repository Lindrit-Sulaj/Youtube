import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { useGetVideoCommentsQuery } from '../../redux/services/youtubeApi';

const Comments = () => {
  const [viewComments, setViewComments] = useState(false);
  const { id } = useParams();
  const videoComments = useGetVideoCommentsQuery(id);
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <div className='mt-8 pb-4'>
      <div className='flex justify-between mb-2'>
        <p className='font-secondary'>Comments</p>
        <button onClick={() => setViewComments(!viewComments)} className='text-blue-300'>{viewComments ? 'Hide' : 'Show'}</button>
      </div>
      {(!videoComments.isLoading && !videoComments.error && !videoComments.data.hasOwnProperty('snippet')) && (
        <div className={`${viewComments ? 'block' : 'hidden'}`}>
          {videoComments.data?.items?.map(comment => (
            <Comment
              key={comment.id}
              channelId={comment.snippet.topLevelComment.snippet.authorChannelId?.value}
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

export default Comments