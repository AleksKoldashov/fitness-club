import React, { useEffect, useState } from "react";
import { Idata } from "../../../types/typePage";
import { Flex, Select, Tag } from "antd";
import { Image } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, } from 'antd';
import { message, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrenerId, putAddFoto, putNewName, putSkils, removeUser } from "../../API/apiTrener";
import { getAuth, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import useMyInput from "../../UI/MyInput";
import { ParseArr } from "../../UI/Utilits";
import { getDatabase, ref, set,  onValue  } from "firebase/database";
import { database } from "../../../firebase";
import { useParams } from "react-router-dom";

interface Iseting {
    data: Idata;
    refetch: ()=>void;
}



const MySetting: React.FC<Iseting>=({data, refetch})=>{
// const {userId} = useParams()
// console.log(userId);
// const {data,isPending, isError, refetch} = useQuery({
//     queryKey: ['trener'], 
//     queryFn: ()=>getTrenerId(userId)})

const queryClient = useQueryClient()
const [newData, setNewData] = useState()

const Ref = ref(database, 'trener/'+data.id)

useEffect(()=>{
    onValue(Ref, (snapshot) => {
        const data = snapshot.val();
        setNewData(data);
        refetch()
      });
   
},[])

const newname=useMyInput()
const newlastname=useMyInput()
const newage=useMyInput()
const foto=useMyInput()




const changeName=useMutation({
    mutationFn: ():any=>{
        let name = !!newname.valueInput ? newname.valueInput : data.name
        let lastname = !!newlastname.valueInput ? newlastname.valueInput : data.lastname
        let age = !!newage.valueInput ? newage.valueInput : data.age
        putNewName({data, name, lastname, age})
    }
})


const DUser=useMutation({
        mutationFn: ():any=>{
           removeUser(data)
        }
      })
     
const delUser=()=>{
            const auth = getAuth();
            signInWithEmailAndPassword(auth, data.email, data.password)
           .then(({user})=>{
              deleteUser(user)
              DUser.mutate()
            })
            .catch(console.error)
          }





const AddFoto=useMutation({
    mutationFn:():any=>{
            putAddFoto({data, foto: foto.valueInput})
    }
})
const confirm: PopconfirmProps['onCancel'] = (e) => {
      AddFoto.mutate()
    message.success('Click on Yes');
  };
const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Click on No');
  };

const fn1=(e:any)=>{  
if(e.key==='Enter'){
    // e.preventDefault();
    changeName.mutate()
}
}
const [skils, setSkils]=useState<string>()


const optionSkils=[
    {value: '{"value": "Пилатес", "color": "magenta"}', label: 'Пилатес',},
    {value:'{"value": "Фитнес", "color":"volcano"}', label: 'Фитнес'},
    {value:'{"value": "Кардио", "color":"orange"}', label: 'Кардио'},
    {value:'{"value": "Силовые упражнения", "color":"gold"}', label: 'Силовые упражнения'},
    {value:'{"value": "Бокс", "color":"lime"}', label: 'Бокс'},
    {value:' {"value": "Борьба", "color":"green"}', label: 'Борьба'},
    {value:' {"value": "Йога", "color":"blue"}', label: 'Йога'},

  ] 



const handleChangeSkils = (val: string) => {
    setSkils(val);
};
const addSkils=useMutation({
    mutationFn: ():any=>{
        putSkils({data, skils})
    }
})




useEffect(()=>{
    refetch()
},[AddFoto,changeName, queryClient, addSkils, refetch])

    return <>
   <Flex>
    <Flex vertical={true}>
        <Image
            width={500}
            height={500}
            src={data.foto}
            alt="FOTO"
        />

        <Popconfirm
            title="Загрузка фото"
            description={
            <div>
                <p>Хотите загрузить фото?</p>
                {foto.input({placeholder:"mysite"})}
            </div>
            }
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            >
            <Button type="primary" icon={<DownloadOutlined />}>
                        можно загрузить только URL
            </Button>
        </Popconfirm>
    </Flex>
    {   
       data && <div className="profil_setting">
            <h3 onDoubleClick={()=>{}}>{data.name}</h3>
            {newname.input({placeholder:"mysite", onKeyUp: (e:any)=>{fn1(e)}})}
            <h3>{data.lastname}</h3>
            {newlastname.input({placeholder:"mysite", onKeyUp: (e:any)=>{fn1(e)}})}
            <h4>Возраст: {data.age}</h4>
            {newage.input({placeholder:"mysite", onKeyUp: (e:any)=>{fn1(e)}})}
            <h4>Пол: {data.gender}</h4>
            <div>
            {data.roles === 'trener' 
            ? 
            <>
            <h4>Навыки:</h4> 
            {
                ParseArr(data?.skils).map((item, index)=><Tag color={item.color} key={index}>{item.value}</Tag>)
            }
             <Select
                mode="multiple"
                placeholder="выбрать навыки"
                style={{ width: 320 }}
                onChange={handleChangeSkils}
                options={optionSkils}
                // optionRender={(option) => (
                //         <Space>
                //           <span role="img" aria-label={option.data.label} >
                //             {option.data.label}
                //           </span>
                //         </Space>
                //       )
                // }
                />
            <Button onClick={()=>{addSkils.mutate()}}>Добавить себе</Button>
            </>
            : null
            }
            
            </div>
           <div className="btn_del_profil">
                <Button onClick={()=>{delUser()}}>Удалить профиль</Button>
           </div>
        </div>
    }
   </Flex>
    </>
}

export default MySetting;