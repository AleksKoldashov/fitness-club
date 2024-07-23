import React, { useEffect, useState } from 'react';
import {  Button, Input} from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  addMyAthlete, delMyAthlete} from '../../API/apiAthlete';
import { Idata } from '../../../types/typePage';
import { getAllAthlete } from '../../API/apiUser';
import {  ref, onValue } from "firebase/database";
import { database } from '../../../firebase';
import { useParams } from 'react-router-dom';
import useMyInput from '../../UI/MyInput';
import { arrayAthletes } from '../../UI/Utilits';
import ComponentsList from './ComponentsList';



  
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

const filterAthlete=(arr:any)=>{
    const a = arr.filter((item:any)=>item.name.toLowerCase()===myfilter.valueInput.toLowerCase())
    return a
}

const searchTogle=()=>{
  if(myfilter.valueInput!==''){
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
  }else{
    alert('поле поиска не должно быть пустым')
  }
 
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
    <Button onClick={()=>{searchTogle()}}>Найти по имени</Button>
    <Button onClick={()=>{setTogle({search: false, data: false})}}>Показать только моих спортсменов</Button>
    <Button onClick={()=>{setTogle({search: false, data: true})}}>Показать всех</Button>
    {
      togle.data 
      ?
      arrayAthletes(AllAthlete.data) 
          ?
          togle.search
          ?
          ComponentsList({data: filterAthlete(arrayAthletes(AllAthlete.data)), funmut: addAthlete, btntitle: 'Добавить себе список'})
          :
          ComponentsList({data: AllAthlete.data, funmut: addAthlete, btntitle: 'Добавить себе список'})
          :
          <p>спортсменов вообще нет</p>
      :
      data.athelete 
        ?
        togle.search
        ?
        ComponentsList({data: filterAthlete(arrayAthletes(data.athelete)), funmut: delAthlete, btntitle: 'Удалить из списка'})
        :
        ComponentsList({data: data.athelete, funmut: delAthlete, btntitle: 'Удалить из списка'})
          :
          <p>добавте спортсменов</p>
    }
    </>);
}

export default ListAthlete;