import { useQuery } from "@tanstack/react-query";
import React from "react"
import { Idata } from "../types/typePage";
import { getTrener } from "../components/API/apiTrener";
import { ConfigProvider, Tag } from "antd";
import { ParseArr } from "../components/UI/Utilits";
import Rating from "../components/OurTeam/Rating";
import { NavLink } from "react-router-dom";




const OurTeam: React.FC=()=>{

    const {data,isPending, isError, refetch} = useQuery({
        queryKey: ['Alltrener'], 
        queryFn:getTrener})

    return<>
    {
        isPending ? <p>Loading...</p>
        :
        isError ? <p>Error</p>
        :
        data.map((item:Idata)=> 
        <div className="card" key={item.id}>
            <img alt="foto" src={item.foto} className="foto_card"/>
            <div className="block1_card">
                <h1>{item.name}</h1>
                <h1>{item.lastname}</h1>
                <div className="block2_card">
                    {ParseArr(item.skils).map((elm:any, index)=><div key={index}>
                        <ConfigProvider
                    theme={{
                        token: {
                            fontSize: 24
                        },
                      }}
                    >
                        <Tag key={index} color={elm.color}>{elm.value}</Tag>
                    </ConfigProvider>
                    </div>
                    
                    )}
                </div>
                <div className="block3_card">
                    <div>
                        <Rating item={item} refetch={refetch}/>
                    </div>
                   <NavLink to={`/fitness_club/ourteam/post/${item.id}`}>Посмотреть отзывы</NavLink>
                </div>   
            </div>
           
        </div>

        
        )
        
    }
    </>
}

export default OurTeam;