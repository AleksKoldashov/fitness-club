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













