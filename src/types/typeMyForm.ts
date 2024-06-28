export type FieldType = {
    username?: string;
    password?: number;
    remember?: string;
  };

export type InputAge={

}  
export interface igender {
    label: string;
    value: string;
    disabled: boolean;
 }

interface iMyAthlete {
  id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    age: any;
    roles: string;
    gender:string,
    date: any,
    auth: boolean,
}

export  interface iobjReg  {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    age: any;
    roles: string;
    gender:string,
    date: any,
    auth: boolean,
    myathlete: []
  }