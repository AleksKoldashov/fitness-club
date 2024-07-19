//добавляем нового пользователя
export const addNewUser = async ({obj, uid, role}:any)=>{
    const response = await fetch(`https://fitness-club-bf646-default-rtdb.europe-west1.firebasedatabase.app/${role}/${uid}.json`,{
        method: "PUT",
        body: JSON.stringify({...obj, id: uid})
    })
    return response.json() 
} 

export const getUserId = async ({obj, role}:any)=>{
    const response = await fetch(`https://fitness-club-bf646-default-rtdb.europe-west1.firebasedatabase.app/${role}/${obj}.json`,)
    return response.json() 
} 