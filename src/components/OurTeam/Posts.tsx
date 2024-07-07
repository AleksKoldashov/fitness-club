import { Card } from "antd"
import useMyInput from "../UI/MyInput"
import { useMutation, useQuery } from "@tanstack/react-query"
import { addPosts, getPosts } from "../API/apiPost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Posts (){
    const post =useMyInput()
    const {postId}=useParams()
    console.log(postId);
    
    const {data, isPending, isError, refetch}=useQuery({queryKey:['post'], queryFn: getPosts})
    
    const add=useMutation({
        mutationFn: ():any=>{
            const obj = {
                id: postId,
                body: post.valueInput,
                date: new Date(),
            }
            if(obj.body!==''){
                addPosts(obj)
               
            }
        }
    })

    const fn1=(e:any)=>{
        if(e.key==='Enter'){
          add.mutate()
        }
        }

    useEffect(()=>{
        refetch()
    },[add, refetch])    
    return <>
    <div>
        {post.input({placeholder:"напишите пост", onKeyUp: (e:any)=>{fn1(e)}})}
    </div>
    <div>
            {
                isPending ? <p>Loading</p>
                :
                isError ? <p>Error</p>
                :
                data.map((i:any)=>i.id===postId ? <Card key={i.id} title={i.date}>{i.body}</Card>:null)
            }
    </div>
    </>
}