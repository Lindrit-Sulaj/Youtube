import { useState } from 'react'
import './assets/index.scss';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

function App() {
  const state = useSelector(state => state);

  return (
    <div className="App font-default bg-neutral-100 dark:bg-neutral-1000">
      <Sidebar />
      <div className="content pt-[65px]">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<p>Landing</p>}></Route>
          <Route exact path='/hi' element={<p>Hi</p>}></Route>
        </Routes>
        <div className="h-[140vh]"></div>
      </div>
    </div>
  )
}

export default App
