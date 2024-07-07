import  { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import { useMutation} from '@tanstack/react-query';
import { FieldType, igender} from '../types/typeMyForm';
import { Idata } from '../types/typePage';
import { addUserAthlete } from '../components/API/apiAthlete';
import { addUserTrener } from '../components/API/apiTrener';
import { app } from '../firebase';

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

const optionSelect:igender [] = [
    {label: 'выберите пол', value: 'gender', disabled: true},
    {label: 'male', value: 'male', disabled: false},
    {label: 'female', value: 'female', disabled: false}
]
 const objReg:Idata = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    age: 0,
    roles: role,
    gender : '',
    date: new Date(),
    auth: false,
    myathlete: [],
    foto: '',
    tasks: [],
    skils: [],
    rating: {sum:0, count:0}
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

const onSubmit=()=>{
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(({user})=>{
          addUser.mutate({obj:value, uid: user.uid})
      })
      .catch((console.error)
      //   (error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      // }
    )
}  

const onChangeAge: any = (v:number) => {
  setValue({...value, age: v })
};
const handleChange = (v: string) => {
    setValue({...value, gender: v})
  };

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
      <Space style={{display: suc ? 'block' : 'none'}}>Успешно зарегестрирован</Space>
    </Form.Item>
  </Form>
}

