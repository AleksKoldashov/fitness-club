import React, { useState } from 'react';
import { Flex, Menu,} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import ListAthlete from '../components/UserTrener/list_athlete/ListAthlete';
import MySchedule from '../components/my_schedule/MySchedule';
import MyMesseger from '../components/UserTrener/my_messeger/MyMesseger';
import MySetting from '../components/UserTrener/my_setting/MySetting';
import { getTrenerId } from '../components/API/apiTrener';


export default function TrenerPage () {
  let { userId } = useParams();

  const {data,isPending, isError, refetch} = useQuery({
    queryKey: ['trener'], 
    queryFn: ()=>getTrenerId(userId)})

localStorage.setItem('avatar', `${data?.foto}`)
  const [page, setPage] = useState<number>(2)

const arrMenu=[
  {id:1, label: 'Список спортсменов', icon: <TeamOutlined/>, path: <ListAthlete data={data} refetch={refetch}/>},
  {id:2, label: 'Мое Расписание', icon: <AppstoreOutlined />, path: <MySchedule data={data}/>},
  {id:3, label: 'Сообщения', icon: <MailOutlined />, path: <MyMesseger/>},
  {id:4, label: 'Настройки', icon: <SettingOutlined />, path: <MySetting data={data} refetch={refetch}/>},
]

const items=arrMenu.map(({label, id, icon})=>({
  key:`${id}`,
  label,
  icon,
  onClick: ()=>{setPage(id)}
}))

return<>
{ 
isPending ? <p>loading</p>
:
isError ? <p>что то пошло не так</p>
:
<Flex>
<Menu
style={{ width: 200, height: 1000 }} 
mode="vertical" 
items={items}
/>
<div>
<h5>эта страница открывается для авторизованного пользователя</h5>
  {
    arrMenu.map((item:any)=>item.id===page ? <div key={item.id}>{item.path}</div> : null)
  }
</div>
</Flex>
}
</>
}