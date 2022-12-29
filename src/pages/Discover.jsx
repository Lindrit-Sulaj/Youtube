import React, { useState } from 'react';
import { suggestedVideos } from '../assets/constants';

const Discover = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(suggestedVideos.all.videoId);

  return (
    <div className='text-white'>
      <div className='suggestions flex gap-3 px-4 mt-2 overflow-auto'>
            {
              Object.entries(suggestedVideos).map((suggestion, id) => (
                <Suggestion
                  key={id}
                  title={suggestion[0]}
                  videoId={suggestion[1].videoId}
                  selectedSuggestion={selectedSuggestion}
                  setSelectedSuggestion={setSelectedSuggestion}
                />
              ))
            }
          </div>
    </div>
  )
}

const Suggestion = ({ title, videoId, selectedSuggestion, setSelectedSuggestion }) => {
  return (
    <button className={`${selectedSuggestion === videoId ? 'bg-neutral-300 text-black hover:bg-neutral-400' : ''} transition-all whitespace-nowrap rounded-md bg-neutral-800 px-2 py-1 font-secondary capitalize hover:bg-neutral-700`} onClick={() => setSelectedSuggestion(videoId)}>
      {title}
    </button>
  )
}

export default Discover