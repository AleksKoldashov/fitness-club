export const getRates = async ()=>{
    const response = await fetch(`http://localhost:3004/rates/`)
    return response.json() 
}