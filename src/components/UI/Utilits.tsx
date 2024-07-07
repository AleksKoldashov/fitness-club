export const valid=(o:any)=>{
    let t=0
    let f=0    
    for(let i in o){
        if(!!o[i]){
            t=t+1
        }else{
            f=f+1
        }
    }
    if(f===0){
        return true
    }
    return false   
}

export const ParseArr=(arr:any)=>{
    const newarr = []
    for(let i in arr){
      newarr.push(JSON.parse(arr[i]))
    }
    return newarr
    }