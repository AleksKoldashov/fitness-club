import { useState } from 'react';
import { Button, Modal } from 'antd';
import MyFormAuth from '../../Auth/MyFormAuth';
import MyFormRegistr from '../../Auth/MyFormRegistr';

export default function useModalForm  () {
  const [role, setRole] = useState<string>('')
  const [open, setOpen] = useState(false);
  const [togle, setTogle]=useState(true)

  const showModal = (role:string) => {
    setRole(role);
    setOpen(true);
  };

  const handleOk = () => {
      setTogle(true)
      setOpen(false);
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
        onCancel={handleCancel}
      >
        <>
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

