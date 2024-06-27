import React from 'react';
import { AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAthleteId } from '../components/API/apiUser';



type MenuItem = Required<MenuProps>['items'][number];

export default function AthletePage () {
  let { userId } = useParams();
 const validator = userId ? userId : localStorage.getItem('iduser')
 console.log(validator)
 
  const {data,isPending, isError} = useQuery({queryKey: ['athlete'], queryFn: ()=>getAthleteId(userId)})
  
    const items: MenuItem[] = [
        {
          key: 'sub1',
          icon: <MailOutlined />,
          label: 'Акции',
        
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
        {
            key: 'sub5',
            label: 'Программы тренировок',
            icon: <MailOutlined />,
            onClick: ()=>{console.log('sub5');
           }
          },
      ];
      
      const onClick: MenuProps['onClick'] = (e) => {
        if(e.key ==='sub4'){
            console.log('sub4');
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
эта страница открывается для авторизованного пользователя!
{
    data && <>
    <p>{data.name}</p>
    <p>{data.date}</p>
    </>
}
</div>

}
</>
}