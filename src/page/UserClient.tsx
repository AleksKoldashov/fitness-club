import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export default function UserClient () {

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
 <Menu onClick={onClick} style={{ width: 200, height: 1000 }} mode="vertical" items={items}/>
</>
}