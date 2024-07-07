import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { addPostsFire, getPostsFire } from "../components/API/apiPost"
import { Button } from "antd"

export default function ProfilPage (){
    const [obj, setValue] = useState<any>(
        {
            id:1, 
            name: 'Lit'
        })
        const {data,isPending, isError, refetch} = useQuery({
            queryKey: ['trener'], 
            queryFn: getPostsFire})
        console.log(data);
        
const addPost=useMutation({
    mutationFn: ():any=>{
        addPostsFire({data, obj})
    }
})

    return<>
    <Button onClick={()=>{addPost.mutate()}}>add</Button>
    <h1>Для доступа к данной страницы необходимо зарегестрироватся или авторизироваться</h1>
    </>
}