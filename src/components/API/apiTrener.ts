import { Idata } from "../../types/typePage";

interface itasks{
    id: number;
    task: itask []
}

export interface itask {
    time: string;
    type: string;
    name: string;
    idTask: number;
}

export interface IaddMyTask{
    data: Idata;
    value: itask;
    idDay: number;
    a: itasks[];
    b: itasks;
    day: number;
    month: number;
    year: number;
}

export const addUserTrener = async ({obj, uid}:any)=>{
    const response = await fetch(`http://localhost:3004/trener`,{
        method: "POST",
        body: JSON.stringify({...obj, id: uid})
    })
       
    return response.json() 
} 

export const getTrenerId = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/trener/${obj}`,)
    return response.json() 
} 

export const getTrener = async ()=>{
    const response = await fetch(`http://localhost:3004/trener/`,)
    return response.json() 
} 

export const addMyTask = async ({data, value, idDay,a,b, day, month, year}:IaddMyTask) =>{
    const response = await fetch(`http://localhost:3004/trener/${data.id}`,{
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

export const addMyTaskNew = async ({data, value, idDay, day, month, year}:any) =>{
    const response = await fetch(`http://localhost:3004/trener/${data.id}`,{
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

export const delMyTask = async ({data,newArr, Obj, newObj}:any) =>{
    console.log('click');
        const response = await fetch(`http://localhost:3004/trener/${data.id}`,{
            method: 'PUT',
            body: JSON.stringify({...data, tasks: [...newArr, {...Obj, task: newObj}]})
        })
        return response.json()
    }


export const putAddFoto = async ({data, foto}:any) =>{
        console.log('click');
            const response = await fetch(`http://localhost:3004/${data.roles}/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify({...data, foto})
            })
            return response.json()
        }

export const removeUser = async (data:any) =>{
                const response = await fetch(`http://localhost:3004/${data.roles}/${data.id}`,{
                    method: 'DELETE',
                })
                return response.json()
            }

export const putNewName = async ({data, name, lastname, age}:any) =>{
                    const response = await fetch(`http://localhost:3004/${data.roles}/${data.id}`,{
                        method: 'PUT',
                        body: JSON.stringify({...data, name, lastname, age})
                    })
                    return response.json()
                }

 export const putSkils = async ({data,skils}:any) =>{
        const response = await fetch(`http://localhost:3004/${data.roles}/${data.id}`,{
            method: 'PUT',
            body: JSON.stringify({...data, skils})
        })
        return response.json()
    }

export const putRating = async ({item,rating}:any) =>{
        const response = await fetch(`http://localhost:3004/${item.roles}/${item.id}`,{
            method: 'PUT',
            body: JSON.stringify({...item, rating})
        })
        return response.json()
    }


