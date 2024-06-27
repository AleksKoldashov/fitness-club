import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  AddUser, addUserAthlete, addUserTrener, postUser } from '../API/apiUser';
import { FieldType, igender, iobjReg } from '../../types/typeMyForm';



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export default function MyFormRegistr ({role}:any) {
const client = useQueryClient()
const optionSelect:igender [] = [
    {label: 'выберите пол', value: 'gender', disabled: true},
    {label: 'male', value: 'male', disabled: false},
    {label: 'female', value: 'female', disabled: false}
]
 const objReg:iobjReg = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    age: 0,
    roles: role,
    gender : '',
    date: new Date(),
    auth: false
 }
 const [suc, setSuc] = useState(false)
const [value, setValue] = useState(objReg)


const addUser = useMutation({
  mutationFn: ({obj, uid}:any):any=>{
   if(role === 'athelete'){
      addUserAthlete({obj, uid})
   }else{
      addUserTrener({obj, uid})
   }
  },
  onSuccess:()=>{
  setSuc(true)
  }
})
// .then(({user})=>setValue({...value, id:user.uid}))
// .catch(console.error)
const onSubmit=()=>{
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(({user})=>{
          addUser.mutate({obj:value, uid: user.uid})
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
}  

const onChangeAge: InputNumberProps['onChange'] = (v) => {
  setValue({...value, age: v })
};
const handleChange = (v: string) => {
    setValue({...value, gender: v})
  };


console.log(value);

 return <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Пожалуйста укажите имя' }]}>
      <Input 
      value={value.name}
      onChange={(e:any)=>{setValue({...value, name: e.target.value})}}
      />
    </Form.Item>
    
    <Form.Item label="Фамилия" name="lastname" rules={[{ required: true, message: 'Пожалуйста укажите фамилию' }]}>
      <Input 
      value={value.lastname}
      onChange={(e:any)=>{setValue({...value, lastname: e.target.value})}}
      />
    </Form.Item>
    
    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true, message: 'Пожалуйста укажите электронную почту'}]}>
      <Input 
      value={value.email}
      onChange={(e:any)=>{setValue({...value, email: e.target.value})}}
      />
    </Form.Item>
    
    <Form.Item
      label="Возраст"
      name="InputAgeNumber"
      rules={[{ required: true, message: 'Пожалуйста укажите возраст' }]}
    >
      <InputNumber 
      style={{ width: '100%' }} 
      min={1} 
      max={100}
      defaultValue={18}
      value={value.age}
      onChange={onChangeAge}
      />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      value={value.password}
      onChange={(e:any)=>{setValue({...value, password: e.target.value})}}
      />
    </Form.Item>

    <Form.Item label="Пол" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
      <Select 
      defaultValue='gender'
      options={optionSelect}
      onChange={handleChange}
      />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button 
      type="primary" 
      htmlType="submit"
      onClick={()=>{onSubmit()}}
      >
        Зарегестрироватся
      </Button>
      <p style={{display: suc ? 'block' : 'none'}}>Успешно зарегестрирован</p>
    </Form.Item>
  </Form>
}
