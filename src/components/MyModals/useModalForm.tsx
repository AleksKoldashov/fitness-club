import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import MyFormAuth from '../MyForms/MyFormAuth';
import MyFormRegistr from '../MyForms/MyFormRegistr';

export default function useModalForm  () {
  const [role, setRole] = useState<string>('')
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [togle, setTogle]=useState(true)
  const showModal = (role:string) => {
    setRole(role);
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setTogle(true)
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setTogle(true)
  };
const modal=()=>{
return<>
    <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <>
        {modalText}    
        {togle ?
        <MyFormAuth  role={role}/>
        :
        <MyFormRegistr role={role}/>
        }
        <Button onClick={()=>{setTogle(false)}}>Регистрация</Button>
        </>
    </Modal>
    </>
}
  return {modal, showModal}
};

