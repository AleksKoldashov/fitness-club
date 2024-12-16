import { Avatar, Button, List } from "antd"
import { arrayAthletes } from "../../UI/Utilits"

export default function ComponentsList ({data, funmut, btntitle}:any){
  if(typeof data === 'object'){
    return<>
    <List
      dataSource={arrayAthletes(data)}
      renderItem={(athlete:any) => <List.Item>
        <List.Item.Meta
        avatar={<Avatar src={athlete.foto}/>}
        title={<>
        {athlete.name}
        &nbsp;
        {athlete.lastname}
        </>}
        />
        <Button
        onClick={()=>{funmut.mutate(athlete)}}
        >{btntitle}</Button>
        </List.Item>}
      />
    </>
  }else{
    return<>
    <List
      dataSource={data}
      renderItem={(athlete:any) => <List.Item>
        <List.Item.Meta
        avatar={<Avatar src={athlete.foto}/>}
        title={<>
        {athlete.name}
        &nbsp;
        {athlete.lastname}
        </>}
        />
        <Button
        onClick={()=>{funmut.mutate(athlete)}}
        >{btntitle}</Button>
        </List.Item>}
      />
    </>
  }

}