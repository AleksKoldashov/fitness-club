import { useEffect, } from 'react';
import './App.css'
import MenuTopBar from './components/App/Menutopbar';
import {Outlet, useNavigate} from 'react-router-dom';

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
