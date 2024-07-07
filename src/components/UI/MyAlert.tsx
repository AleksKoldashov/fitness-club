import { message, Popconfirm, PopconfirmProps } from "antd"


interface iuseAlert {
    children?: any;
    title?: string;
    description?: any;
}

const useAlert: React.FC<iuseAlert>=({...props})=>{
    
    
const confirm: PopconfirmProps['onCancel'] = (e) => {
      message.success('Click on Yes');
    };
const cancel: PopconfirmProps['onCancel'] = (e) => {
      message.error('Click on No');
    };
    
    return  <>
    <Popconfirm
    title="Загрузка фото"
    description={
    <div>
      <p>{props.title}</p>
      {props.description}
    </div>
    }
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
    >
   {props.children}
   </Popconfirm>
    </>
    
}

export default useAlert;