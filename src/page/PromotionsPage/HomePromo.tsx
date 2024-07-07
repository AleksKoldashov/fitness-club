import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const HomePromo: React.FC=()=>{
    const nav = useNavigate()
    useEffect(()=>{
        nav('/homepromo/promotions')
      },[nav])
    return<>
    <Outlet/>
    </>
}

export default HomePromo;
