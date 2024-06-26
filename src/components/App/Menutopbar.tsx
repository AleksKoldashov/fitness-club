import React, { useState } from 'react';
import { DownOutlined,} from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Dropdown, Space, Menu  } from 'antd';
import { NavLink } from 'react-router-dom';




export default function MenuTopBar () {
    const [open, setOpen] = useState(false);

  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const menuHeader = [
    {id:1, title: 'Акции'},
    {id:2, title: 'Цены'},
    {id:3, title: 'Фото'},
    {id:4, title: 'Контакты'},
    {id:5, title: 'Наша команда'},
  ]
  const item = menuHeader.map(({id,title})=>{ 
   return {
    label: title,
    key: id
          }
        })
 
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {

  };



  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };


  const itemsPersonalArea: MenuProps['items'] = [
    {
      label: <NavLink to={`/client`}>Клиент</NavLink>,
      key: '1', 
    },
    {
      label: <NavLink to={`/trener`}>Тренер</NavLink>,
      key: '2',
    },
  ];
    
    
    
    
    return<>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={item} />
     <Dropdown
      menu={{
        items: itemsPersonalArea,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
         Личный кабинет
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
    </>
}