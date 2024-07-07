import { Button, Select, Space, Table, TableProps } from "antd";
import { useState } from "react";

interface DataType {
    time: string;
    type: string;
    name: string;
  }

export default function TabelForm ({data, value, setValue, addTask}:any){

    const [change, setChange] = useState({type: true})
    const handleChangeTime = (val: string) => {
        setValue({...value, time: val})
    };

    const newValue=Array(value)

    const handleChangeType = (val: string) => {
        if(val==='privat'){
            setChange({type:false})
            setValue({...value, type: val})
        }else if(val==='group'){
            setChange({type:true})
            setValue({...value, type: val})
        }  
          };
    
    const handleChangeName = (val: string) => {
        setValue({...value, name: val})
          };
    
    
    const test=(arg:any)=>{
      for(let i in arg){
        arg[i].label=arg[i].name;
        arg[i].value=arg[i].name;
      }
      return arg
    }
    
    const optionTime=[
      { value: '9-11', label: '9-11'},
      { value: '12-14', label: '12-14'},
      { value: '15-17', label: '15-17'},
    ] 
    
    const optionType=[
      { value: 'privat', label: 'private'},
      { value: 'group', label: 'group'},
    ]
    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Время',
          dataIndex: 'time',
          key: 'time',
          render: (index) => (
            <Space size="middle" key={index}>
               <Select
                defaultValue="выбрать время"
                disabled={false}
                style={{ width: 220 }}
                onChange={handleChangeTime}
                options={optionTime}
                />
            </Space>
          ),
        },
        {
          title: 'Тип тренировки',
          dataIndex: 'type',
          key: 'type',
          render: (index) => (
            <Space size="middle" key={index}>
              <Select
                defaultValue="выбрать тип"
                disabled={false}
                style={{ width: 220 }}
                onChange={handleChangeType}
                options={optionType}
            />
            </Space>
          ),
        },
        {
          title: 'Имя',
          dataIndex: 'name',
          key: 'name',
          render: (index) => (
            <Space size="middle" key={index}>
                  <Select
                        style={{ width: '200px' }}
                        placeholder="select one country"
                        disabled={change.type}
                        onChange={handleChangeName}
                        options={test(data?.myathlete)}
                        optionRender={(option) => (
                          <Space key={option.data.id}>
                            <span role="img" aria-label={option.data.label}>
                              {option.data.lastname}
                            </span>
                            {option.data.name}
                          </Space>
                        )}
        />
            </Space>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record, index) => (
            <Space size="middle" key={index}>
              <Button onClick={()=>addTask.mutate()}>Добавить</Button>
            </Space>
          ),
        },
      ];    
    
    return<>
    <Table 
      columns={columns} 
      dataSource={newValue} 
      pagination={false}
    />
    </>
}