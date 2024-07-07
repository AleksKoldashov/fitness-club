import React, { useEffect, useState } from 'react';
import {  Button, Flex, List, Input, Space} from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  addMyAthlete, delMyAthlete, getAllAthlete } from '../../API/apiAthlete';
import { IaddAthlete, Idata, imyathlete } from '../../../types/typePage';
import { SearchProps } from 'antd/es/input';

  
interface IListAthlete {
  data: Idata;
  refetch: ()=>unknown;
}

const { Search } = Input;

const ListAthlete: React.FC<IListAthlete> =({data, refetch})=>{
 const queryClient = useQueryClient()


const [togle, setTogle] = useState(false);

const AllAthlete =useQuery({
    queryKey: ['AllAthlete'],
    queryFn: getAllAthlete,
    enabled: togle
  })
 
const addAthlete =useMutation({
  mutationFn:({name, lastname, id}: IaddAthlete):any=>{
    const search = data.myathlete.find((item:imyathlete)=>item.id === id)
    if(!search){
      addMyAthlete({data, name, lastname, id})
    }
  },
  onSuccess: ()=>{
    queryClient.invalidateQueries({queryKey:['trener']})
  }
})

const deleteAthlete=useMutation({
  mutationFn:(id:any):any=>{
    const newArr=data.myathlete.filter((item:any)=>item.id!==id)
    delMyAthlete({data, newArr})
  }
})

const [valueSearch, setValueSearch]=useState([])

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>{ 
  const newArr=AllAthlete.data.filter((item:any)=>item.name.toLowerCase()===value.toLowerCase())
  setValueSearch(newArr)
}

const showAllAthlete =()=>{
  setTogle(true)
}

const onlyMy =()=>{
  setTogle(false)
}

useEffect(()=>{
  refetch()
},[addAthlete, refetch, deleteAthlete])

if(AllAthlete.isPending){<p>Loading....</p>}
if(AllAthlete.isError){<p>Error</p>}
    return (
        <List
          header={<div>
            <h3>Список спортсменов</h3>
            <Space direction='vertical'>
              <Space>
                <Button onClick={()=>showAllAthlete()}>Показать всех спортсменов</Button>
                <Button onClick={()=>onlyMy()}>Показать только моих</Button>
              </Space>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Space>
            </div>}
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={
            togle ?
            valueSearch.length>0 
            ?
            valueSearch
            : 
            AllAthlete.data
            :
            data.myathlete
          }
          renderItem={(item:any) => <List.Item
          >
            <Flex>{item.name} {item.lastname}</Flex>
          
           { 
            togle
            ?
            <Button onClick={()=>{addAthlete.mutate({name:item.name, lastname: item.lastname, id: item.id})}}>Добавить себе</Button>
            :
            <>
            <Button onClick={()=>{}}>Назначить занятие</Button>
            <Button onClick={()=>{deleteAthlete.mutate(item.id)}}>Удалить</Button>
            </>
            }
            </List.Item>} 
        />
      );
}

export default ListAthlete;