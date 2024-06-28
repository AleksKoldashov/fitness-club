export const getAllAthlete = async () =>{
    const response = await fetch(`http://localhost:3004/athelete`)
    return response.json()
}

export const addMyAthlete = async ({data, name, lastname, id}:any) =>{
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