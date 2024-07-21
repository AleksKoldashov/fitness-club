import React, { useEffect, useState } from 'react';
import {  Button, Flex, List, Input, Space, Avatar} from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  addMyAthlete, delMyAthlete} from '../../API/apiAthlete';
import { IaddAthlete, Idata, imyathelete } from '../../../types/typePage';
import { SearchProps } from 'antd/es/input';
import { getAllAthlete } from '../../API/apiUser';
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from '../../../firebase';
import { useParams } from 'react-router-dom';
import useMyInput from '../../UI/MyInput';

  
interface IListAthlete {
  data: Idata;
  refetch: ()=>unknown;
}

const { Search } = Input;

const ListAthlete: React.FC<IListAthlete> =({data, refetch})=>{

let { userId } = useParams();

const myfilter=useMyInput();

 useEffect(()=>{
    const starCountRef = ref(database, `trener/${userId}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValue(data); 
    }); 
  },[])

const [togle, setTogle]=useState({search: false, data: true})
const [value, setValue]=useState()


const AllAthlete =useQuery({
    queryKey: ['AllAthlete'],
    queryFn: getAllAthlete,
  })

if(AllAthlete.isPending){<p>Loading....</p>}
if(AllAthlete.isError){<p>Error</p>}


const arrayAthletes=(obj:any): any | null=>{
  let arr = []
  for(let i in obj){
    arr.push(obj[i])
  }
  return arr
}


const searchTogle=()=>{
  if(togle.data){
//все спортсмены
  arrayAthletes(AllAthlete.data)
  ?
  setTogle({ ...togle, search: true})
  :
  <p>Негде искать</p>
  }else{
//только мои
arrayAthletes(data.athelete)
  ?
  setTogle({ ...togle, search: true})
  :
  <p>Добавьте спортсменов</p>
  }
}

const ComponentList=()=>{
  return<>
  <List
          dataSource={arrayAthletes(AllAthlete.data)}
          renderItem={(athlete:any) => <List.Item>
            <List.Item.Meta
            avatar={<Avatar src={athlete.foto}/>}
            title={<>
            {athlete.name}
            &nbsp;
            {athlete.lastname}
            </>}
            />
            <Button
            onClick={()=>{addAthlete.mutate(athlete)}}
            >Добавить себе список</Button>
            </List.Item>}
          />
  </>
}


const addAthlete=useMutation({
  mutationFn: (athlete:any):any=>{
    addMyAthlete({data, athlete})
  }
})
console.log(togle);

const delAthlete=useMutation({
  mutationFn: (athlete:any):any=>{
   delMyAthlete({data, athlete})
  }
})
useEffect(()=>{
  refetch()
},[addAthlete, delAthlete])
    return (<>
    {
      myfilter.input({placeholder: "введите имя для поиска"})
    }
    <Button onClick={()=>{searchTogle()}}>Найти</Button>
    <Button onClick={()=>{setTogle({search: false, data: false})}}>Показать только моих спортсменов</Button>
    <Button onClick={()=>{setTogle({search: false, data: true})}}>Показать всех</Button>
    {
    togle.search 
    ?
    <p>результат поиска</p>
    :
      togle.data 
      ?
      arrayAthletes(AllAthlete.data) 
          ?
          ComponentList()
          :
          <p>спортсменов вообще нет</p>
      :
      data.athelete 
          ?
          <List
          dataSource={arrayAthletes(data.athelete)}
          renderItem={(athlete:any) => <List.Item>
            <List.Item.Meta
            avatar={<Avatar src={athlete.foto}/>}
            title={<>
            {athlete.name}
            &nbsp;
            {athlete.lastname}
            </>}
            />
            <Button
            onClick={()=>{delAthlete.mutate(athlete)}}
            >Удалить</Button>
            </List.Item>}
          />
          :
          <p>добавте спортсменов</p>
    }
    </>);
}





export default ListAthlete;