import { useQuery } from "@tanstack/react-query";
import { getTrenerIdNew } from "../components/API/apiTrener";

export default function Contacts(){
    const {data,isPending, isError, refetch} = useQuery({
        queryKey: ['user'], 
        queryFn: getTrenerIdNew})
    console.log(data);





if(isPending){<p>Loading</p>}
if(isError){<p>error</p>}

const fn1=(obj:any)=>{
    const arr = []
    for(let i in obj){
        arr.push(obj[i])
    }
return arr
}
console.log(fn1(data));

    return <div className="contacts">
    <h1>Мой телеграмм: @/AlekseyKoldashov</h1>
    <h1>Почта: kapahdalli88@gmail.com</h1>
    <h1>GitHub проекта: https://github.com/AleksKoldashov/fitness-club</h1>
        {
            fn1(data).map((item:any)=><p>{item.name}</p>)
        }
      

    </div>
}