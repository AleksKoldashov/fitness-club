export const getUser = async ()=>{
    const response = await fetch(`http://localhost:3004/user/`)
    return response.json() 
}
   
export const postUser = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/user`,{
        method: "POST",
        body: JSON.stringify(obj)
    })
       
    return response.json() 
}  

export const AddUser = async ({obj, uid}:any)=>{
    const response = await fetch(`http://localhost:3004/user`,{
        method: "POST",
        body: JSON.stringify({...obj, id: uid})
    })
       
    return response.json() 
} 



export const addUserAthlete = async ({obj, uid}:any)=>{
    const response = await fetch(`http://localhost:3004/athelete`,{
        method: "POST",
        body: JSON.stringify({...obj, id: uid})
    })
       
    return response.json() 
} 


export const addUserTrener = async ({obj, uid}:any)=>{
    const response = await fetch(`http://localhost:3004/trener`,{
        method: "POST",
        body: JSON.stringify({...obj, id: uid})
    })
       
    return response.json() 
} 


export const getUserId = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/user/${obj}`,)
    return response.json() 
} 

export const getAthleteId = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/athelete/${obj}`,)
    return response.json() 
} 

export const getTrenerId = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/trener/${obj}`,)
    return response.json() 
} 