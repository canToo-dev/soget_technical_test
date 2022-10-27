import useFetch from "../../hooks/useFetch"
import BASE_URI from "../../constants/baseUri"
import { useReducer, useState} from "react"
import Todo from "../../components/todo/"
import NewTodo from "../../components/newTodo"
import { useParams } from 'react-router-dom';
import TodoModal from "../../components/todoModal"
export default function Todos (){
    const [ignored, forceUpdate] = useState([]);
    const { slug } = useParams();
    const [response, errors, perform, {setResponse}] = useFetch(BASE_URI+"/todos", {
        onStart: true
    });
    const sorted = response && [...response].sort((x, y)  => {
        return (x.id > y.id)
    }).sort((x, y) => {
        return (x.checked === y.checked)? 0 : x.checked? 1 : -1;
    }) || []; 
    const update = (obj) => {
        console.log(obj);
        const index = sorted.findIndex(item => item.id === obj.id);
        sorted[index] = {...sorted[index], ...obj};
        setResponse(sorted);
    }
    const append = (obj) => {
        sorted.push(obj);
        setResponse(sorted);
    }
    return(
        <div className="todos">
            <NewTodo/>
            {
            sorted?.map(
                (todo,i) => (
                    <Todo todo={todo} key={i} update={update}/>
                )
            )
            }
            {
                slug
                &&
                <TodoModal slug={slug} update={update} append={append}/>
            }
            
        </div>
    )
}