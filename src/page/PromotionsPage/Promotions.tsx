import React from "react"
import { Card, Space } from 'antd';
import { NavLink } from "react-router-dom";

export const arrPromo=[
  {id:1, title: 'Приведи друга', body: 'Приведи друга получи 15% скидку', path: `/homepromo/promotionfriend`},
  {id:2, title: 'Акция 3+1', body: 'Купи абонемент на 3 месяца получи месяц в подарок'},
  {id:3, title: 'Акция "Почти даром"', body: 'Купи абонемт на год получи скидку 20%'},
]

const Promotions: React.FC=()=>{

    return <>
 <Space direction="vertical" size="middle" style={{display: 'flex', margin: '25px'}}>
    {
        arrPromo.map((item:any)=>      
        <Card title={item.title} size="small" style={{marginTop: '25px'}} key={item.id}>
          <p>{item.body}</p>
          <NavLink to={item.path}>Узнать подробнее</NavLink>
        </Card>
        )
    }  
  </Space>
    </>
}

export default Promotions;