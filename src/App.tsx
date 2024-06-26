import React, { useState } from 'react';
import './App.css'
import MenuTopBar from './components/App/Menutopbar';
import {Outlet } from 'react-router-dom';




function App() {
  
  return (<>
  <div className="topbar">
     <MenuTopBar/>
  </div>
   <div className='app'>
      <Outlet/>
    </div>
  </>
   
  );
}

export default App;
