import  { useState } from 'react';
import type { CalendarProps } from 'antd';
import {  Calendar, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import MyTask from './MyTask';

export default function MySchedule ({data}:any) {

const [togle, setTogle]=useState<any>({tog:true, idDay: ''})

const getListData = (value: Dayjs) => {
  let listData: { name: string; time: string; type: string; }[] = []; 
  data.tasks?.forEach((item:any)=>{
  switch(value.year()){
    case item.year:
      switch (value.month()) {
        case item.month:
          switch (value.date()){
                case item.day:
                  listData = item.task;
                }
          break;
          default:
  }
  }
})
  return listData || [];
};
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <>
        {listData.map((item, index) => (
          <Space
          key={index}
          >
            <p>{item.type}</p>
          </Space>
        ))}
      </>
    );
  };


  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return <>

  {
  togle.tog ?
    <Calendar 
    onSelect={(date, { source }) => {
    if (source === 'date') {
      setTogle({tog:false, day: date})
    }
    }}
    cellRender={cellRender} 
   />
  :
  <MyTask setTogle={setTogle} togle={togle} data={data}/>
  }
  </>
};

