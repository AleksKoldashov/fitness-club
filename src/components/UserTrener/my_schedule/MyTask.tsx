import React, { useState } from 'react';
import { Space, Table, Tag, Button,Select  } from 'antd';
import type { TableProps } from 'antd';
import { Option } from 'antd/es/mentions';
import { BaseOptionType } from 'antd/es/select';



interface DataType {
    time: string;
    type: string;
    name: string;
  }

export default function MyTask ({setTogle, togle}:any){


const [change, setChange] = useState({type: true})

const [value, setValue] = useState( {
    time: '',
    type: '',
    name:'' 
  },)

const handleChangeType = (val: string) => {
    if(val==='индивидуальный'){
        console.log(`sel ${val}`);
        setChange({type:false})
        setValue({...value, type: val})
    }else if(val==='груповой'){
        console.log(`sel ${val}`);
        setChange({type:true})
        setValue({...value, type: val})
    }  
      };

const handleChangeName = (val: string) => {
    console.log(`sel ${val}`);
    // setValue({...value, name: val.name})
      };
const handleChangeTime = (val: string) => {
    console.log(`sel ${val}`);
    setValue({...value, time: val})
};

const arrName=[
    // {value: 'Костян', label: 'Костян'},
    {
        name: "ben",
        lastname: "gur",
        id: "R24kX8ADVeQuSRezOtx5uLu39Qn1"
      }
]
  
   

console.log(togle.idDay);
const arr = [
    {time: '9-00:10-00', id: 1},
    {time: '10-00:11-00', id: 2}
]
const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time',
      render: () => (
        <Space size="middle">
              <Select
                    defaultValue="выбрать время"
                    disabled={false}
                    style={{ width: 220 }}
                    onChange={handleChangeTime}
                    options={[
                        { value: '9-11', label: '9-11',  },
                        { value: '12-14', label: '12-14', },
                        { value: '15-17', label: '15-17', },
      ]}
    />
        </Space>
      ),
    },
    {
      title: 'Тип тренировки',
      dataIndex: 'type',
      key: 'type',
      render: () => (
        <Space size="middle">
              <Select
                    defaultValue="выбрать тип"
                    disabled={false}
                    style={{ width: 220 }}
                    onChange={handleChangeType}
                    options={[
                        { value: 'индивидуальный', label: 'индивидуальный',  },
                        { value: 'груповой', label: 'груповой', },
      ]}
    />
        </Space>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: () => (
        <Space size="middle">
              <Select
                    defaultValue="Выберите спортсмена"
                    disabled={change.type}
                    style={{ width: 220 }}
                    onChange={(e:any)=>handleChangeName(e)}
                    title='kk'
                    labelInValue={true}
                    // options={arrName}
                    // optionRender={(Oroption: FlattenOptionData <optionType>, info: { index: number; })=>{

                    // }}
                   
    >
        {
            arrName.map((item:any)=><Option key={item.id}>{item.name}</Option>)
        }
           </Select>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <p onClick={()=>[setdata2Update([...data2Update,value]), setValue({time: '',type: '',name:''})]}>Добавить {record.name}</p>
          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];
  const columns2: TableProps<DataType>['columns'] = [
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time',
    //   render: (text) => <a>{text}</a>,
    },
    {
      title: 'Тип тренировки',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.time}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    value,
  ];

  const data2: DataType[] = [
 
  ];
  const [data2Update, setdata2Update]=useState(data2)
    return<>
    <Button onClick={()=>{setTogle({tog:true})}}>Back</Button>
    
    <Table columns={columns} dataSource={data} />
    <Table columns={columns2} dataSource={data2Update} />
    </>
    }