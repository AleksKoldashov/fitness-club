import { AppstoreOutlined, MailOutlined, SettingOutlined, TeamOutlined} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getUserId } from '../components/API/apiUser';
import ListAthlete from '../components/UserTrener/list_athlete/ListAthlete';
import MySchedule from '../components/my_schedule/MySchedule';
import MyMesseger from '../components/UserTrener/my_messeger/MyMesseger';
import MySetting from '../components/UserTrener/my_setting/MySetting';
import { Flex, Menu,Layout } from 'antd';
import { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;

export default function UserPage (){
    let { userId } = useParams();
    const role = localStorage.getItem('role')
    const {data,isPending, isError, refetch} = useQuery({
        queryKey: ['user'], 
        queryFn: ()=>getUserId({id: userId, role})
    })

if(isPending){<p>Loading....</p>}
if(isError){<p>error</p>}

    const [page, setPage] = useState<number>(2)

    const MenuTrener = [
        {id:1, label: 'Список спортсменов', icon: <TeamOutlined/>, path: <ListAthlete data={data} refetch={refetch}/>},
        {id:2, label: 'Мое Расписание', icon: <AppstoreOutlined />, path: <MySchedule data={data}/>},
        {id:3, label: 'Сообщения', icon: <MailOutlined />, path: <MyMesseger/>},
        {id:4, label: 'Настройки', icon: <SettingOutlined />, path: <MySetting data={data} refetch={refetch}/>},
      ]
      
      const MenuAthlete = [
          {id:1, label: 'Сообщения', icon: <MailOutlined />, path: ''},
          {id:2, label: 'Мое Расписание', icon: <AppstoreOutlined />, path: <MySchedule data={data}/>},
          {id:3, label: 'Акции', icon: <MailOutlined />, path: ''},
          {id:4, label: 'Программы тренировок', icon: <MailOutlined />, path: ''},
          {id:5, label: 'Настройки', icon: <SettingOutlined />, path: <MySetting data={data} refetch={refetch}/>},
      ]
const isUser=(role:any)=>{
    if(role==='trener'){
        return MenuTrener
    }else{
        return MenuAthlete
    }
}
    return <>
    <Flex>
        <Menu
        style={{ width: 200, height: 1000 }} 
        mode="vertical" 
        items={
            isUser(role).map(({label, id, icon})=>({
                key:`${id}`,
                label,
                icon,
                onClick: ()=>{setPage(id)}
              })
              )
        }
        />
        <Sider width="75%">
        {   
            isUser(role).map((item:any)=>item.id===page ? <div key={item.id}>{item.path}</div> : null)
        }
        </Sider>
    </Flex>
    </>
}