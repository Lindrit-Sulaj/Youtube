import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChannelCard = ({ channelId, customUrl, description, subscribers, thumbnail, title, views }) => {
  const navigate = useNavigate();
  const goToChannel = () => navigate(`/channel/${channelId}`);
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <div className='w-full bg-neutral-150 dark:bg-neutral-900 flex gap-4 pt-6 pb-4 md:rounded-xl px-3'>
      <img className='w-20 h-20 rounded-full' onClick={goToChannel} src={thumbnail} alt={title} />
      <div className='cursor-pointer' onClick={goToChannel}>
        <h2 className='text-[17px] font-medium font-secondary text-neutral-800 dark:text-neutral-100'>{title} / {customUrl}</h2>
        <div className='flex gap-2 items-center'>
          <p className='text-neutral-600 dark:text-neutral-300'>{formatter.format(subscribers)} subscribers</p>
          <i className="fa-solid fa-circle text-[6px]  text-neutral-300 dark:text-neutral-500"></i>
          <p className='text-neutral-600 dark:text-neutral-300'>{formatter.format(views)} views</p>
        </div>
        <p className='mt-4 font-secondary text-neutral-500 dark:text-neutral-300 max-w-[380px]'>{(description.split(' ').length > 15) ? `${description.split(' ').splice(0, 15).join(' ')}...` : description}</p>
      </div>
    </div>
  )
}

export default ChannelCard