import { useQuery } from "@tanstack/react-query"
import { getRates } from "../components/API/apiRates"
import { Button} from "antd";




export default function Rates (){

const {data,isPending, isError} = useQuery({queryKey: ['rating'], queryFn: getRates})

    return<>
   {
    isPending ? <p>Loading</p>
    :
    isError ? <p>Error</p>
    :
    <div className="wrapper_rates">
        {
        data?.map((item:any)=>
        <div key={item.id} className="card_rates">
        <img alt="logo" src={item.icon} className="item1"/>
        <h2 className="item2">
            {item.title}
        </h2>
        <h4 className="item3">
            {item.time}
        </h4>
        <h3 className="item4">от{item.price} {item.description}</h3>
        <Button className="item5">Оформить</Button>
        </div>
            )
        }
    </div>
   }
    </>
}