import { Card } from "antd"
import useMyInput from "../UI/MyInput"
import { useMutation, useQuery } from "@tanstack/react-query"
import { addPosts, addPostsFire, getPosts, getPostsFire } from "../API/apiPost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

export default function Posts (){

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    const post =useMyInput()
    const {postId}=useParams()
    console.log(postId);
    
    const {data, isPending, isError, refetch}=useQuery({queryKey:['post'], queryFn: getPostsFire})
    
    const add=useMutation({
        mutationFn: ():any=>{
            const obj = {
                id: postId,
                body: post.valueInput,
                date: new Date(),
            }
            if(obj.body!==''){
                addPostsFire({data, obj})
               
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
 <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {post.input({placeholder:"напишите пост", onKeyUp: (e:any)=>{fn1(e)}, type:'text'})}
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button 
      type="primary" 
      htmlType="submit"
      onClick={()=>add.mutate()}
      >
        Submit
      </Button>
    </Form.Item>
  </Form>



    </div>
    <div>
            {
                isPending ? <p>Loading</p>
                :
                isError ? <p>Error</p>
                :
                data.obj && <p>{data.obj.body}</p>
                // null
                // data.map((i:any)=>i.id===postId ? <Card key={i.id} title={i.date}>{i.body}</Card>:null)
            }
    </div>
    </>
}