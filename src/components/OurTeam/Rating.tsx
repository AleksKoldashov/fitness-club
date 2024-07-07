import { StarTwoTone } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { putRating } from '../API/apiTrener';

export default function Rating ({item, refetch}:any){
    
   const resultRating = item.rating.count>0 ? item.rating.sum/item.rating.count : 0
   const [selectedStars, setSelectedStars] = useState(resultRating);

    const createArray = (length:any) => [...Array(length)];

    const Star = ({ selected = false, onSelect = (f:any) => f }) => (
        <StarTwoTone twoToneColor={selected ? "gold" : "grey"} onClick={onSelect} />
      );

    const addRating=useMutation({
        mutationFn: ():any=>{
            const rating={
                sum: item.rating.sum+selectedStars,
                count: item.rating.count+1
            }
                putRating({item, rating})
        }
    })
useEffect(()=>{
    refetch()
}, [addRating, refetch])
    return <>
     {
        createArray(5).map((item:any, index)=>
        <Star 
        onSelect={() => setSelectedStars(index+1)}  
        key={index}
        selected={selectedStars > index}
        />)   
     }
     {Math.round(resultRating)} of {5} stars
     <Button onClick={()=>{addRating.mutate()}}>Проголосовать</Button>
    </>
} 