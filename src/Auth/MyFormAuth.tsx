import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type iobjAuth={
    email: string;
    password: string;
    id: string;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function MyFormAuth ({role}:any) {

  const objAuth: iobjAuth = {
    email: '',
    password: '',
    id: ''
  }  
const [value, setValue] = useState(objAuth)

const nav = useNavigate()

const login=()=>{
  const auth = getAuth();
  signInWithEmailAndPassword(auth, value.email, value.password)
  .then(({user})=>{
    nav(`/${role}/${user.uid}`)
    localStorage.setItem('path', `/${role}/${user.uid}`);
    localStorage.setItem('iduser', `${user.uid}`)
  })
  .catch(console.error)
}

  return  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    >
    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true, message: 'Пожалуйста укажите электронную почту'}]}>
      <Input 
      value={value.email}
      onChange={(e)=>{setValue({...value, email: e.target.value})}}
      />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      value={value.password}
      onChange={(e)=>{setValue({...value, password: e.target.value})}}
      />
    </Form.Item>

    <Form.Item<FieldType>
    name="remember"
    valuePropName="checked"
    wrapperCol={{ offset: 8, span: 16 }}
    >
    <Checkbox>Запомнить меня</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button 
    type="primary" 
    onClick={()=>{login()}}
    >
    Войти
    </Button>
    </Form.Item>
    </Form>

}
