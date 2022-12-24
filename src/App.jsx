import { useState } from 'react'
import './assets/index.scss';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';

function App() {
  const state = useSelector(state => state);
  console.log(state);

  return (
    <div className="App text-2xl font-mulish">
      <div className="sidebar"></div>
      <div className="content">
        <Routes>
          <Route exact path='/hi' element={<p>Hi</p>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
