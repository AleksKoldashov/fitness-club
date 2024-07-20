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

  
interface IListAthlete {
  data: Idata;
  refetch: ()=>unknown;
}

const { Search } = Input;

const ListAthlete: React.FC<IListAthlete> =({data, refetch})=>{

let { userId } = useParams();

 useEffect(()=>{
    const starCountRef = ref(database, `trener/${userId}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValue(data); 
    }); 
  },[])

const [togle, setTogle]=useState(true)
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

const arrayMyAthlete=(obj:any)=>{
  let arr = []
  for(let i in obj){
    arr.push(obj[i])
  }
  return arr
}

console.log(arrayAthletes(AllAthlete.data));
console.log(data?.athelete);

const addAthlete=useMutation({
  mutationFn: (athlete:any):any=>{
    addMyAthlete({data, athlete})
  }
})

const delAthlete=useMutation({
  mutationFn: (athlete:any):any=>{
   delMyAthlete({data, athlete})
  }
})
useEffect(()=>{
  refetch()
},[addAthlete, delAthlete])

    return (<>
    <Button onClick={()=>{setTogle(false)}}>Показать только моих спортсменов</Button>
    <Button onClick={()=>{setTogle(true)}}>Показать всех</Button>
    {
      togle 
      ?
      arrayAthletes(AllAthlete.data) 
      ?
      <List
      dataSource={arrayAthletes(AllAthlete.data)}
      renderItem={(athlete:any) => <List.Item>
        <List.Item.Meta
        avatar={<Avatar src={athlete.foto}/>}
        title={<>
        {athlete.name}
        {athlete.lastname}
        </>}
        />
        <Button
        onClick={()=>{addAthlete.mutate(athlete)}}
        >Добавить себе список</Button>
        </List.Item>}
      />
      :
      <p>спортсменов вообще нет</p>
      :
      data.athelete 
      ?
      <List
      dataSource={arrayMyAthlete(data.athelete)}
      renderItem={(athlete:any) => <List.Item>
        <List.Item.Meta
        avatar={<Avatar src={athlete.foto}/>}
        title={<>
        {athlete.name}
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