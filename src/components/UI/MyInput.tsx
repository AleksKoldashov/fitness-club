import { Input } from "antd";
import React, { useState } from "react";



export default function useMyInput(){

    const [valueInput, setValueInput]=useState('')

    const onChangeInput: React.ChangeEventHandler<HTMLInputElement>=(e)=>{
        setValueInput(e.currentTarget.value);  
    } 

    const input=({...props}:any)=>{
       return <>
       <Input 
       onChange={onChangeInput} 
       value={valueInput}
       {...props}
       />
       </>
    }
    return {input, valueInput}
}



