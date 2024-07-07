import { AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import { Flex, Menu } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MySchedule from '../components/my_schedule/MySchedule';
import {  useState } from 'react';
import MySetting from '../components/UserTrener/my_setting/MySetting';
import { getAthleteId } from '../components/API/apiAthlete';


export default function AthletePage () {
  let { userId } = useParams();

 const {data,isPending, isError, refetch} = useQuery({queryKey: ['athlete'], queryFn: ()=>getAthleteId(userId)})
 localStorage.setItem('avatar', `${data?.foto}`)
const [page, setPage]=useState<number>()

const arrMenu = [
  {id:1, label: 'Сообщения', icon: <MailOutlined />, path: ''},
  {id:2, label: 'Мое Расписание', icon: <AppstoreOutlined />, path: <MySchedule data={data}/>},
  {id:3, label: 'Акции', icon: <MailOutlined />, path: ''},
  {id:4, label: 'Программы тренировок', icon: <MailOutlined />, path: ''},
  {id:5, label: 'Настройки', icon: <SettingOutlined />, path: <MySetting data={data} refetch={refetch}/>},
]

const items=arrMenu.map(({label, id, icon})=>({
  key:`${id}`,
  label,
  icon,
  onClick: ()=>{setPage(id)}
})
)

      
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
items={items}/>
<div>
  эта страница открывается для авторизованного Спортсмена!
{
  arrMenu.map((item:any)=>item.id===page? <div key={item.id}>{item.path}</div>: null)
}
</div>
</Flex>
}
</>
}