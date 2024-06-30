import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { ArrMonth } from './constantsCalendar';
import { fn1, fn2, fn3 } from './Utilits';





export default function MyCalendar () {
    const now = new Date('6-25-2024')
    const month = now.getMonth()
    const yaer = now.getFullYear()
    const week = now.getDay()
    const day = now.getDate()

   const [togleMonth, setTogleMonth]= useState<any>(month+1)
    
    return (
        <>
    <Button onClick={()=>{setTogleMonth(togleMonth-1)}}>Add-</Button>
    {togleMonth}
    <Button onClick={()=>{setTogleMonth(togleMonth+1)}}>Add+</Button>
    <div className="calendar">
      {
    
      togleMonth === 4
         ?
         fn1( togleMonth)?.map((item:any)=>
           <Card style={{ width: '175px' }} key={item.id}>
           <p>{item.day}</p>
           </Card>
         )
         :
      togleMonth === 5 
        ?
        fn2( togleMonth)?.map((item:any)=>
          <Card style={{ width: '175px' }} key={item.id}>
          <p>{item.day}</p>
          </Card>
        )
        :
      togleMonth === 6
      ?
      fn1( togleMonth)?.map((item:any)=>
        <Card style={{ width: '175px' }} key={item.id}>
        <p>{item.day}</p>
        </Card>
      )
      :
      togleMonth === 7 
      ?
      fn2( togleMonth)?.map((item:any)=>
        <Card style={{ width: '175px' }} key={item.id}>
        <p>{item.day}</p>
        </Card>
      )
      :
      togleMonth === 8 
      ?
      fn3( togleMonth)?.map((item:any)=>
        <Card style={{ width: '175px' }} key={item.id}>
        <p>{item.day}</p>
        </Card>
      )
      :
      togleMonth === 9
      ?
      fn1( togleMonth)?.map((item:any)=>
        <Card style={{ width: '175px' }} key={item.id}>
        <p>{item.day}</p>
        </Card>
      )
      :
      togleMonth === 10
        ?
      fn2( togleMonth)?.map((item:any)=>
          <Card style={{ width: '175px' }} key={item.id}>
          <p>{item.day}</p>
          </Card>
        )
      :
      togleMonth === 11
      ?
      fn1( togleMonth)?.map((item:any)=>
        <Card style={{ width: '175px' }} key={item.id}>
        <p>{item.day}</p>
        </Card>
      )
      :
      togleMonth === 12
      ?
      fn2( togleMonth)?.map((item:any)=>
        <Card style={{ width: '175px' }} key={item.id}>
        <p>{item.day}</p>
        </Card>
      )
      :
      null
      }
     
    
    </div>
        </>
   
    )
}