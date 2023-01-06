import { useState } from 'react'
import './assets/index.scss';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { SearchResults, Discover, Channel, Video, Saves, History, Subscriptions } from './pages'

function App() {
  const state = useSelector(state => state);


  return (
    <div className="App font-default bg-white dark:bg-neutral-1000">
      <Navbar />
      <Sidebar />
      <div className="content pt-[75px]">
        <Routes>
          <Route path='/' element={<Discover />}></Route>
          <Route path='/search/:id' element={<SearchResults />}></Route>
          <Route path='/channel/:id' element={<Channel />}></Route>
          <Route path='/video/:id' element={<Video />}></Route>
          <Route path='/feed/saved-videos' element={<Saves />}></Route>
          <Route path='/feed/history' element={<History />}></Route>
          <Route path="/feed/subscriptions" element={<Subscriptions />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
