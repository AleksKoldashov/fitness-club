import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];



export default function UserTrener () {
    const items: MenuItem[] = [
        {
          key: 'sub1',
          icon: <MailOutlined />,
          label: 'Список клиентов',
        
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
        console.log('click', e);
      };
return<>
<Menu onClick={onClick} style={{ width: 200, height: 1000 }} mode="vertical" items={items}/>
</>
}