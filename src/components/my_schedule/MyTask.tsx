import {  useEffect, useState } from 'react';
import { Space, Table, Button} from 'antd';
import type {  TableProps } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMyTask, addMyTaskNew, delMyTask, itask } from '../API/apiTrener';
import { addMyTaskA, addMyTaskNewA, delMyTaskA} from '../API/apiAthlete';
import TabelForm from './TabelForm';

interface DataType {
    time: string;
    type: string;
    name: string;
  }

export default function MyTask ({setTogle, togle, data}:any){
const queryClient = useQueryClient()


const idDay = new Date(togle.day.format(`MM-DD-YYYY`)).getTime();
const day = new Date(togle.day.format(`MM-DD-YYYY`)).getDate();
const month = new Date(togle.day.format(`MM-DD-YYYY`)).getMonth();
const year = new Date(togle.day.format(`MM-DD-YYYY`)).getFullYear();

const [value, setValue] = useState<itask>(
  {
    time: '',
    type: '',
    name:'',
    idTask: 0
  })

const addTask = useMutation({
  
  mutationFn: ():any=>{
 
    if(data.roles==='trener'){
      const a = data.tasks.filter((item:any)=>item.id !== idDay)
      const b = data.tasks.find((item:any)=>item.id === idDay)
      if(b!==undefined){
        const idTask = Math.random()*100000
        addMyTask({data, value:{...value, idTask: Math.floor(idTask)}, idDay,a, b, day, month, year}) 
      }else{
        const idTask = Math.random()*100000
        addMyTaskNew({data, value: {...value, idTask: Math.floor(idTask)}, idDay, day, month, year}) 
      }
    }else{
      const a = data.tasks.filter((item:any)=>item.id !== idDay)
      const b = data.tasks.find((item:any)=>item.id === idDay)
      if(b!==undefined){
        const idTask = Math.random()*100000
        addMyTaskA({data, value: {...value, idTask: Math.floor(idTask)}, idDay,a, b, day, month, year}) 
      }else{
        const idTask = Math.random()*100000
        addMyTaskNewA({data, value: {...value, idTask: Math.floor(idTask)}, idDay, day, month, year}) 
      }
    }
    
  }
})

const delTask=useMutation({
  mutationFn: (record:any):any=>{
    if(data.roles==='trener'){
      let newArr = data.tasks.filter((item:any)=>item.id!==record.idDay)  
      const Obj = data.tasks.find((item:any)=>item.id===record.idDay)
      const newObj = Obj.task.filter((item:any)=>item.idTask!==record.idTask)
      delMyTask({data, newArr, Obj, newObj})
    }else{
      let newArr = data.tasks.filter((item:any)=>item.id!==record.idDay)
      const Obj = data.tasks.find((item:any)=>item.id===record.idDay)
      const newObj = Obj.task.filter((item:any)=>item.idTask!==record.idTask)
      delMyTaskA({data, newArr, Obj, newObj})
    }
  }
})

  const columns2: TableProps<DataType>['columns'] = [
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Тип тренировки',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle" key={index}>
          <Button onClick={()=>{delTask.mutate(record)}}>Delete</Button>
        </Space>
      ),
    },
  ];

useEffect(()=>{
  if(data?.roles==='trener'){
    queryClient.invalidateQueries({queryKey:['trener']})
  }
  queryClient.invalidateQueries({queryKey:['athlete']})
},[addTask, queryClient, delTask, data])
    return<>
    <h2>{togle.day.format(`DD MMMM YYYY`)}</h2>
    <Button onClick={()=>{setTogle({tog:true})}}>Back</Button>
    <TabelForm
    data={data}
    value={value}
    setValue={setValue}
    addTask={addTask}
    />
   {data.tasks?.map((item:any, index:any)=>item.id===idDay
   ?
   <div key={index}>
    <Table 
          columns={columns2} 
          dataSource={item.task}
          pagination={false}
      />
   </div>
   
   : null)}
    </>
    }