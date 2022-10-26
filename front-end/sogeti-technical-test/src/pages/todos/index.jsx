import useFetch from "../../hooks/useFetch"
import BASE_URI from "../../constants/baseUri"
import { useEffect } from "react"
import Todo from "../../components/todo/"
export default function Todos (){
    const [response, errors, perform] = useFetch(BASE_URI+"/todos", {
        onStart: true
    });
    return(
        <div className="todos">
            {
            response?.map(
                (todo,i) => (
                    <Todo todo={todo} key={i} />
                )
            )
            }
        </div>
    )
}