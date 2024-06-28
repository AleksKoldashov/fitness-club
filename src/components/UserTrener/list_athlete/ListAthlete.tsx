import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMyAthlete, getAllAthlete } from '../../API/apiAthlete';

interface DataType {
    gender?: string;
    name: {
      title?: string;
      first?: string;
      last?: string;
    };
    email?: string;
    picture: {
      large?: string;
      medium?: string;
      thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
  }
  

export default function ListAthlete ({data, refetch}:any){
 const queryClient = useQueryClient()


const [togle, setTogle] = useState(false);

const AllAthlete =useQuery({
    queryKey: ['AllAthlete'],
    queryFn: getAllAthlete,
    enabled: togle
  })
 
const addAthlete =useMutation({
  mutationFn: ({name, lastname, id}: any):any=>{
    const search = data.myathlete.find((item:any)=>item.id === id)
    if(!search){
      addMyAthlete({data, name, lastname, id})
    }
  },
  onSuccess: ()=>{
    queryClient.invalidateQueries({queryKey:['trener']})
  }
})

const showAllAthlete =()=>{
  setTogle(true)
}

const onlyMy =()=>{
  setTogle(false)
}

useEffect(()=>{
  refetch()
},[addAthlete, refetch])

if(AllAthlete.isPending){<p>Loading....</p>}
if(AllAthlete.isError){<p>Error</p>}
    return (
        <List
          header={<div>
            <h3>Список спортсменов</h3>
            <Button onClick={()=>showAllAthlete()}>Показать всех спортсменов</Button>
            <Button onClick={()=>onlyMy()}>Показать только моих</Button>
            </div>}
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={
            togle ?
            AllAthlete.data
            :
            data.myathlete
          }
          renderItem={(item:any) => <List.Item
          >
            <a>{item.name}</a>
            {item.lastname}
            {item.id}
           { 
            togle
            ?
            <Button onClick={()=>{addAthlete.mutate({name:item.name, lastname: item.lastname, id: item.id})}}>Добавить себе</Button>
            :
            <Button onClick={()=>{}}>Назначить занятие</Button>
            }
            </List.Item>}
    
        />
      );
}