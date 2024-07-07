import { IaddAthlete, Idata } from "../../types/typePage"
import { IaddMyTask } from "./apiTrener"

export interface IresMyAth extends IaddAthlete{
    data: Idata
}

export const addUserAthlete = async ({obj, uid}:any)=>{
    const response = await fetch(`http://localhost:3004/athelete`,{
        method: "POST",
        body: JSON.stringify({...obj, id: uid})
    })
       
    return response.json() 
} 

export const getAthleteId = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/athelete/${obj}`,)
    return response.json() 
} 

export const getAllAthlete = async () =>{
    const response = await fetch(`http://localhost:3004/athelete`)
    return response.json()
}

export const addMyAthlete = async ({data, name, lastname, id}:IresMyAth) =>{
    const response = await fetch(`http://localhost:3004/trener/${data.id}`,{
        method: 'PUT',
        body: JSON.stringify({...data, myathlete: [...data.myathlete, 
            {
                name,
                lastname,
                id
        }
    ]})
    })
    return response.json()
}

export const delMyAthlete=async ({data, newArr}:any)=>{
    const response = await fetch(`http://localhost:3004/trener/${data.id}`,{
        method:'PUT',
        body: JSON.stringify({...data, myathlete: newArr})
    })
    return response.json()
}

export const addMyTaskA = async ({data, value, idDay,a,b, day, month, year}:IaddMyTask) =>{  
    const response = await fetch(`http://localhost:3004/athelete/${data.id}`,{
        method: 'PUT',
        body: JSON.stringify({...data, tasks: [...a,{
            id: idDay,
            day,
            month,
            year,
            task :[
                ...b.task,
                {idDay,
            ...value}
            ]
        }
      
        ]})
    })
    return response.json()
}

export const addMyTaskNewA = async ({data, value, idDay, day, month, year}:any) =>{
    const response = await fetch(`http://localhost:3004/athelete/${data.id}`,{
        method: 'PUT',
        body: JSON.stringify({...data, tasks: [...data.tasks,{
            id: idDay,
            day, 
            month, 
            year,
            task :[
                {idDay,
                ...value}
            ]
        }
      
        ]})
    })
    return response.json()
}

export const delMyTaskA = async ({data,newArr, Obj, newObj}:any) =>{
if(newObj.length===0){
    const response = await fetch(`http://localhost:3004/athelete/${data.id}`,{
        method: 'PUT',
        body: JSON.stringify({...data, tasks: [...newArr]})
    })
    return response.json()
}
    const response = await fetch(`http://localhost:3004/athelete/${data.id}`,{
        method: 'PUT',
        body: JSON.stringify({...data, tasks: [...newArr, {...Obj, task: newObj}]})
    })
    return response.json()
}


