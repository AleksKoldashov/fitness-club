
export interface imyathelete {
    id: string;
    label: string;
    lastname: string;
    name: string;
    value: string;
}

export interface itasks{
    id: number;
    task: itask []
}

export interface itask {
    time: string;
    type: string;
    name: string;
}
export interface Idata{
    age: number;
    auth: boolean;
    date: any;
    email: string;
    id: string;
    gender: string;
    lastname: string;
    athelete: imyathelete[];
    name: string;
    password: string;
    roles: string;
    tasks: itasks[];
    foto: string;
    skils: [];
    rating: {sum: number, count: number};
}

export interface IaddAthlete{
  name: string;
  lastname: string;
  id: string
}