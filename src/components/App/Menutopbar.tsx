import React, { useState } from 'react';
import { DownOutlined,} from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Dropdown, Space, Menu, Button  } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import useModalForm from '../MyModals/useModalForm';


export default function MenuTopBar () {

  const modal = useModalForm()
  const nav = useNavigate()
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('mail');
 const pathProfil = localStorage.getItem('path') 
 const valid = pathProfil ? pathProfil : '/home'
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const menuHeader = [
    {id:1, title: 'Главная', path: '/home'},
    {id:2, title: 'профиль', path: `${valid}`},
    {id:3, title: 'акции', path: '/'},
    {id:4, title: 'Контакты'},
    {id:5, title: 'Наша команда'},
  ]
  const item = menuHeader.map(({id,title, path})=>{ 
   return {
    label: <NavLink to={`${path}`}>{title}</NavLink>,
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

let role = ''
  const itemsPersonalArea: MenuProps['items'] = [
    {
      // label: <NavLink to={`/client`}>Клиент</NavLink>,
      label: 'Клиент',
      key: '1', 
      onClick: ()=>{modal.showModal(role='athelete')}
    },
    {
      // label: <NavLink to={`/trener`}>Тренер</NavLink>,
      label: 'Тренер',
      key: '2',
      onClick: ()=>{modal.showModal(role='trener')}
    },
  ];
    
  const outProfil=()=>{
    localStorage.clear()
    nav('/home')
  }  
    
    
    return<>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={item} style={{width:'500px'}}/>
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
    <Button
    onClick={()=>{outProfil()}}
    >Выйти</Button>
    {
      modal.modal()
    }
    </>
}