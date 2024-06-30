import React, { useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import MyTask from './MyTask';





const arr =[
  {
    id:1, 
    month: 5, 
    day: 29,
    yaer: 2024, 
    cont: [
    { type: 'warning', content: 'This is warning event.' },
    { type: 'success', content: 'This is usual event.' },
  ]
},
{
  id:2, 
  month: 4, 
  day: 28,
  yaer: 2024, 
  cont: [
    { type: 'success', content: 'This is usual event.' },
  ]
},
]


const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; 

arr.forEach((item)=>{
  switch(value.year()){
    case item.yaer:
      switch (value.month()) {
        case item.month:
          switch (value.date()){
                case item.day:
                  listData = item.cont;
                }
          break;
          default:
  }
  }
})
 



  return listData || [];
};


export default function MySchedule () {
 const [togle, setTogle]=useState<any>({tog:true, idDay: ''})

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <>
        {listData.map((item) => (
          <p 
          key={item.content}
          >
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </p>
        ))}
      </>
    );
  };
console.log(new Date(`06-30-2024`).getTime())

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  // if (source === 'date') {
  //   console.log('Panel Select:', new Date(date.format(`MM-DD-YYYY`)).getTime());
  // }
  return <>

  {
    togle.tog ?
    <Calendar 
  onSelect={(date, { source }) => {
   setTogle({tog:false, idDay: new Date(date.format(`MM-DD-YYYY`)).getTime()})
  }}
  cellRender={cellRender} 
   />
  :
  <MyTask setTogle={setTogle} togle={togle}/>
  }
  </>
};

