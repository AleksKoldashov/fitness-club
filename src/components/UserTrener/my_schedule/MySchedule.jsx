import React from 'react';
import { Badge, Calendar } from 'antd';




const getListData = (value) => {
  let listData = []; // Specify the type of listData
  if(value.date() === 1){
    listData = [
      {
        type: 'warning',
        content: 'This is warning event.',
      },
      {
        type: 'success',
        content: 'This is usual event.',
      },
    ];
  }
  return listData || [];
};

// console.log(Date.now('Thu Jul 04 2024 18:11:16 GMT+0400 (GMT+04:00)'));
const getMonthData = (value) => {
  if (value.month()===8) {
    return 500;
  }
};

export default function MySchedule () {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
 
    const listData = getListData(value);//
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    // console.log(Date.now(current.$d))

    if (info.type === 'date') return dateCellRender(current);//
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

 console.log('aaaaaaaaaaaaaa',new Date('06-28-2024'));
  return <Calendar 
  onSelect={(date)=>{console.log(date.date());}}
  // cellRender={(data)=>{
  //   if(new Date(data).getDate()===1){
  //     return<p>day</p>
  //   }
  // }}
  // fullCellRender={(data)=>{
  //   if(new Date(data).getDate()===new Date().getDate()){
  //     return<p>day</p>
  //   }
  // }}
  dateCellRender={
    (data)=>{
      if(new Date(data).getDate()===new Date().getDate()){
        return<p>day</p>
      }
    }
  }
  fullscreen={true}
  
  />;
};

