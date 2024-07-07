export const addPosts = async (obj:any)=>{
    const response = await fetch(`http://localhost:3004/posts`,{
        method: "POST",
        body: JSON.stringify(obj)
    })
       
    return response.json() 
}  

export const getPosts = async ()=>{
    const response = await fetch(`http://localhost:3004/posts/`)
    return response.json() 
}



export const addPostsFire = async ({data, obj}:any)=>{
    const response = await fetch(`https://my-project-ts-53910-default-rtdb.europe-west1.firebasedatabase.app/user.json`,{
        method: "PUT",
        body: JSON.stringify({...data, user: [...data.user,obj]})
    })
       
    return response.json() 
}  

export const getPostsFire = async ()=>{
    const response = await fetch(`https://my-project-ts-53910-default-rtdb.europe-west1.firebasedatabase.app/user.json`)
    return response.json() 
}










