import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ChannelCard } from '../../components';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subs = useSelector(state => state.subs);
  console.log(subs);

  return (
    <section className='lg:px-4'>
      <h2 className='mt-3 ml-4 lg:mx-0 text-2xl font-medium text-white font-secondary'>Subscriptions</h2>

      <section className='grid md:grid-cols-2 xl:grid-cols-3 mt-6 gap-4 md:px-2 lg:px-4'>
        {
          subs.map(sub => (
            <ChannelCard key={sub.channelId} {...sub} />
          ))
        }
      </section>
    </section>
  )
}

export default Subscriptions