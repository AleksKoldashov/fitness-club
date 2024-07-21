import  { useState } from 'react';
import { DownOutlined,} from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Dropdown, Space, Menu, Button, Avatar  } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import useModalForm from '../MyModals/useModalForm';

export default function MenuTopBar () {

  const modal = useModalForm()
  const nav = useNavigate()
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('mail');
  const avatar = localStorage.getItem('avatar') 
  const pathProfil = localStorage.getItem('path') 
  const valid = pathProfil ? pathProfil : '/fitness_club/profil'
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

const menuHeader = [
    {id:1, title: 'Главная', path: '/fitness_club/home'},
    {id:2, title: 'Профиль', path: `${valid}`},
    {id:3, title: 'Акции', path: '/fitness_club/homepromo'},
    {id:4, title: 'Наши тарифы', path: '/fitness_club/rates'},
    {id:5, title: 'Наша команда', path: '/fitness_club/ourteam'},
    {id:6, title: 'Контакты', path: '/fitness_club/contacts'},
  ]
const item = menuHeader.map(({id,title, path})=>{ 
   return {
    label: <NavLink to={`${path}`}>{title}</NavLink>,
    key: id
          }
        })

const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

const itemsPersonal = [
  {id:1,label:'Спортсмен', role:'athelete'},
  {id:2,label:'Тренер', role:'trener'},
]
 
const itemsPersonalArea = itemsPersonal.map(({id, label, role})=>({
  key:`${id}`,
  label,
  onClick: ()=>{modal.showModal(role)}
}))

const outProfil=()=>{
    localStorage.clear()
    nav('/fitness_club/home')
  }    
    return<>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={item} style={{width:'700px'}}/>
    <div className='menu_in'>
    {avatar ?  <Avatar shape="circle" src={avatar}/> : null}
     <Dropdown
      menu={{
        items: itemsPersonalArea,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()} href='#/'>
        <Space
        >
         Личный кабинет
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
 
    <Button style={{marginTop: 5}}
    onClick={()=>{outProfil()}}
    >Выйти</Button>
    </div>
  
    {
      modal.modal()
    }
    </>
}