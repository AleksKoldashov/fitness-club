//добавляем нового пользователя
export const addNewUser = async ({obj, uid, role}:any)=>{
    const response = await fetch(`https://fitness-club-bf646-default-rtdb.europe-west1.firebasedatabase.app/${role}/${uid}.json`,{
        method: "PUT",
        body: JSON.stringify({...obj, id: uid})
    })
    return response.json() 
} 
//запрос пользователя
export const getUserId = async ({id, role}:any)=>{
    const response = await fetch(`https://fitness-club-bf646-default-rtdb.europe-west1.firebasedatabase.app/${role}/${id}.json`,)
    return response.json() 
} 
//получить список спортсменов
export const getAllAthlete = async () =>{
    const response = await fetch(`https://fitness-club-bf646-default-rtdb.europe-west1.firebasedatabase.app/athelete.json`)
    return response.json()
}

