import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined,} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getTrenerId } from '../components/API/apiUser';
import ListAthlete from '../components/UserTrener/list_athlete/ListAthlete';
import MySchedule from '../components/UserTrener/my_schedule/MySchedule';


type MenuItem = Required<MenuProps>['items'][number];



export default function TrenerPage () {
  let { userId } = useParams();
  const {data,isPending, isError, refetch} = useQuery({queryKey: ['trener'], queryFn: ()=>getTrenerId(userId)})
  const [page, setPage] = useState({list: false, schedule: false})
  console.log(data);
  
    const items: MenuItem[] = [
        {
          key: 'sub1',
          icon: <MailOutlined />,
          label: 'Список спортсменов',
        
        },
        {
          key: 'sub2',
          icon: <AppstoreOutlined />,
          label: 'Мое Расписание',
        },
        {
          key: 'sub4',
          label: 'Сообщения',
          icon: <MailOutlined />,
          danger:true
        },
      ];
      
      const onClick: MenuProps['onClick'] = (e) => {
        if(e.key === 'sub1'){
          setPage({list: true, schedule: false})
        }else if(e.key==='sub2'){
          setPage({list: false, schedule: true})
        }
        console.log('click', e);

      };
return<>
{ 
isPending ? <p>loading</p>
:
isError ? <p>что то пошло не так</p>
:
<div style={{display:'flex'}}>
<Menu onClick={onClick} style={{ width: 200, height: 1000 }} mode="vertical" items={items}/>
<div style={{width:'100%'}}>
<h5>эта страница открывается для авторизованного пользователя</h5>
{
    data && <>
    <p>{data.name}</p>
    <p>{data.date}</p>
    </>
}
   {
    page.list ?  
    <ListAthlete data={data} refetch={refetch}/>
    :
    null
    }
    {
    page.schedule ?  
    <MySchedule/>
    :
    null
    }
</div>
</div>
}

</>
}