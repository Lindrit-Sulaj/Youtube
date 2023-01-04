import { useState } from 'react'
import './assets/index.scss';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { SearchResults, Discover, Channel, Video, Saves, History } from './pages'

function App() {
  const state = useSelector(state => state);


  return (
    <div className="App font-default bg-neutral-100 dark:bg-neutral-1000">
      <Navbar />
      <Sidebar />
      <div className="content pt-[75px]">
        <Routes>
          <Route exact path='/' element={<Discover />}></Route>
          <Route path='/search/:id' element={<SearchResults />}></Route>
          <Route path='/channel/:id' element={<Channel />}></Route>
          <Route exact path='/video/:id' element={<Video />}></Route>
          <Route exact path='/feed/saved-videos' element={<Saves />}></Route>
          <Route exact path='/feed/history' element={<History />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
