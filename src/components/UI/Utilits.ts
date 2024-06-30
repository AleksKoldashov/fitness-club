// const now = new Date()
// const month = now.getMonth()

// получаем id дня   

// const addDay=(i:any)=>{ new Date(`${month}-${i}-2024`).getDate()}

// const tomorowtime = new Date(`${month}-1-2024`)
// const nowtime = new Date(`${month+1}-1-2024`)
// const uptime = new Date(`${month+2}-1-2024`)

//апрель, июнь, сентябрь, ноябрь
export const fn1=(month:any)=>{
    const addIdDayLast=(i:any)=>{new Date(`${month-1}-${i}-2024`).getTime()}
    const addIdDay=(i:any)=>{new Date(`${month}-${i}-2024`).getTime()}
    const addIdDayNext=(i:any)=>{new Date(`${month+1}-${i}-2024`).getTime()}
    const now = new Date(`${month}-1-2024`)
    const week = now.getDay()
    // console.log(now);
    
    // console.log(week);
    
    const arr:any = []

   
    switch (week){
        case 0://восересенье
        for(let i=26;i<31;i++){
         arr.push( {
            id: addIdDayLast(i), 
            day: i
        })  
        }
        if(arr.length<2){
            for(let k=1;k<31;k++){
                arr.push({
                    id: addIdDay(k), 
                    day: k
                })
               }  
         }
        if(arr.length<32){
            for(let j=1;arr.length<35;j++){
                arr.push({
                    id: addIdDayNext(j), 
                    day: j
                })
               } 
           }
        break;
        case 1://понедельник
            for(let k=1;k<31;k++){
                   arr.push({
                       id: addIdDay(k), 
                       day: k
                   })
                  }  
            
           if(arr.length<32){
               for(let j=1;arr.length<35;j++){
                   arr.push({
                       id: addIdDayNext(j), 
                       day: j
                   })
                  } 
              }
           break;
        case 2://вторник
            for(let i=31;arr.length<1;i++){
             arr.push( {
                id: addIdDayLast(i), 
                day: i
            })  
            }
            if(arr.length<2){
                for(let k=1;k<31;k++){
                    arr.push({
                        id: addIdDay(k), 
                        day: k
                    })
                   }  
             }
            if(arr.length<32){
                for(let j=1;arr.length<35;j++){
                    arr.push({
                        id: addIdDayNext(j), 
                        day: j
                    })
                   } 
               }
            break;
        case 3://среда
            for(let i=30;arr.length<2;i++){
                arr.push( {
                    id: new Date(`${month}-${i}-2024`).getTime(), 
                    day: new Date(`${month}-${i}-2024`).getDate()
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<32;k++){
                    arr.push( {
                        id: new Date(`${month+1}-${k}-2024`).getTime(), 
                        day: new Date(`${month}-${k}-2024`).getDate()
                    })
                   }
               }
               if(arr.length<33){
                for(let j=1;arr.length<35;j++){
                    arr.push( {
                        id: new Date(`${month+2}-${j}-2024`).getTime(), 
                        day: new Date(`${month}-${j}-2024`).getDate()
                    })
                   }
               }
            break;
            case 6://суббота
            for(let i=27;arr.length<5;i++){
                arr.push( {
                    id: addIdDayLast(i), 
                    day: i
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<35;k++){
                    arr.push( {
                        id: addIdDay(k), 
                        day: k
                    })
                   }
               }
            break;
        default:
    }
    return arr   
}

//июль, май, октябрь, декабрь
export const fn2=(month:any)=>{
    const addIdDayLast=(i:any)=>{new Date(`${month-1}-${i}-2024`).getTime()}
    const addIdDay=(i:any)=>{new Date(`${month}-${i}-2024`).getTime()}
    const addIdDayNext=(i:any)=>{new Date(`${month+1}-${i}-2024`).getTime()}
    const now = new Date(`${month}-1-2024`)
    const week = now.getDay()
    console.log(now);
    
    console.log(week);
    
    const arr:any = []

   
    switch (week){
        case 0://восересенье
        for(let i=25;i<30;i++){
         arr.push( {
            id: addIdDayLast(i), 
            day: i
        })  
        }
        if(arr.length<2){
            for(let k=1;k<31;k++){
                arr.push({
                    id: addIdDay(k), 
                    day: k
                })
               }  
         }
        if(arr.length<32){
            for(let j=1;arr.length<35;j++){
                arr.push({
                    id: addIdDayNext(j), 
                    day: j
                })
               } 
           }
        break;
        case 1://понедельник
            for(let k=1;arr.length===32;k++){
                   arr.push({
                       id: addIdDay(k), 
                       day: k
                   })
                  }  
            
           if(arr.length<32){
               for(let j=1;arr.length<35;j++){
                   arr.push({
                       id: addIdDayNext(j), 
                       day: j
                   })
                  } 
              }
           break;
        case 2://вторник
            for(let i=29;arr.length<1;i++){
             arr.push( {
                id: addIdDayLast(i), 
                day: i
            })  
            }
            if(arr.length<2){
                for(let k=1;k<31;k++){
                    arr.push({
                        id: addIdDay(k), 
                        day: k
                    })
                   }  
             }
            if(arr.length<32){
                for(let j=1;arr.length<35;j++){
                    arr.push({
                        id: addIdDayNext(j), 
                        day: j
                    })
                   } 
               }
            break;
        case 3://среда
            for(let i=30;arr.length<2;i++){
                arr.push( {
                    id: new Date(`${month}-${i}-2024`).getTime(), 
                    day: new Date(`${month}-${i}-2024`).getDate()
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<32;k++){
                    arr.push( {
                        id: new Date(`${month+1}-${k}-2024`).getTime(), 
                        day: new Date(`${month}-${k}-2024`).getDate()
                    })
                   }
               }
               if(arr.length<33){
                for(let j=1;arr.length<35;j++){
                    arr.push( {
                        id: new Date(`${month+2}-${j}-2024`).getTime(), 
                        day: new Date(`${month}-${j}-2024`).getDate()
                    })
                   }
               }
            break;
            case 6://суббота
            for(let i=27;arr.length<5;i++){
                arr.push( {
                    id: addIdDayLast(i), 
                    day: i
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<35;k++){
                    arr.push( {
                        id: addIdDay(k), 
                        day: k
                    })
                   }
               }
            break;
        default:
    }
    return arr   
}
// август, январь
export const fn3=(month:any)=>{
    const addIdDayLast=(i:any)=>{new Date(`${month-1}-${i}-2024`).getTime()}
    const addIdDay=(i:any)=>{new Date(`${month}-${i}-2024`).getTime()}
    const addIdDayNext=(i:any)=>{new Date(`${month+1}-${i}-2024`).getTime()}
    const now = new Date(`${month}-1-2024`)
    const week = now.getDay()
    // console.log(now);
    
    // console.log(week);
    
    const arr:any = []

   
    switch (week){
        case 2://вторник
            for(let i=31;i<32;i++){
             arr.push( {
                id: addIdDayLast(i), 
                day: i
            })  
            }
            if(arr.length<2){
                for(let k=1;k<31;k++){
                    arr.push({
                        id: addIdDay(k), 
                        day: k
                    })
                   }  
             }
            if(arr.length<32){
                for(let j=1;arr.length<35;j++){
                    arr.push({
                        id: addIdDayNext(j), 
                        day: j
                    })
                   } 
               }
            break;
        case 3://среда
            for(let i=30;arr.length<2;i++){
                arr.push( {
                    id: new Date(`${month}-${i}-2024`).getTime(), 
                    day: new Date(`${month}-${i}-2024`).getDate()
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<32;k++){
                    arr.push( {
                        id: new Date(`${month+1}-${k}-2024`).getTime(), 
                        day: new Date(`${month}-${k}-2024`).getDate()
                    })
                   }
               }
               if(arr.length<33){
                for(let j=1;arr.length<35;j++){
                    arr.push( {
                        id: new Date(`${month+2}-${j}-2024`).getTime(), 
                        day: new Date(`${month}-${j}-2024`).getDate()
                    })
                   }
               }
            break;
            case 4://четверг
            for(let i=29;arr.length<3;i++){
                arr.push( {
                    id: addIdDayLast(i), 
                    day: i
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<32;k++){
                    arr.push( {
                        id: addIdDay(k), 
                        day: k
                    })
                   }
               }
               if(arr.length<33){
                for(let j=1;arr.length<35;j++){
                    arr.push( {
                        id: addIdDayNext(j), 
                        day: j
                    })
                   }
               }
            break;
            case 6://суббота
            for(let i=27;arr.length<5;i++){
                arr.push( {
                    id: addIdDayLast(i), 
                    day: i
                })
               }
               if(arr.length<6){
                for(let k=1;arr.length<35;k++){
                    arr.push( {
                        id: addIdDay(k), 
                        day: k
                    })
                   }
               }
            break;
        default:
    }
    return arr   
}