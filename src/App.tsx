import React, { createContext, useEffect, } from 'react';
import './App.css'
import MenuTopBar from './components/App/Menutopbar';
import {Outlet, useNavigate} from 'react-router-dom';



export const AppContext=createContext<any>({})

function App() {



const nav = useNavigate()
useEffect(()=>{
  nav('/home')
},[nav])



  return (
    <>
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
