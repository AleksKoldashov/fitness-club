import { Form, Input } from "antd";
import React, { useState } from "react";



export default function useMyInput(){

    const [valueInput, setValueInput]=useState('')

    const onChangeInput: React.ChangeEventHandler<HTMLInputElement>=(e)=>{
        // e.preventDefault()
        setValueInput(e.currentTarget.value);  
    } 

    const input=({...props}:any)=>{
       return <div>
       <Input 
       onChange={onChangeInput} 
       value={valueInput}
       {...props}
       />
       </div>
    }
    return {input, valueInput}
}



