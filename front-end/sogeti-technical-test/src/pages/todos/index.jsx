import useFetch from "../../hooks/useFetch"
import BASE_URI from "../../constants/baseUri"
import { useContext, useEffect, useReducer, useState} from "react"
import Todo from "../../components/todo/"
import NewTodo from "../../components/newTodo"
import { useParams } from 'react-router-dom';
import TodoModal from "../../components/todoModal"
import ErrorsContext from "../../functions/errorsContextProvider"
import LogoutBtn from "../../components/logoutBtn"
export default function Todos (){
    const errorsCtx = useContext(ErrorsContext)
    const { slug } = useParams();
    const [todosState, setTodosState] = useState([]);
    const [response, errors, perform] = useFetch(BASE_URI+"/todos", {
        onStart: true,
        errorsCallback : errorsCtx.setErrors
    });
    const setSortedTodoState = (arr) => {
        if(!Array.isArray(arr))
            return;
        const paramClone = [...arr];
        
        const checked = [...paramClone].filter(todo => todo.checked === true);
        const unChecked = [...paramClone].filter(todo => todo.checked !== true);
        const r = [...unChecked, ...checked];
        setTodosState(r) 
    }
    const append = (obj) => {
        const stateClone = [obj, ...todosState];
        setSortedTodoState(stateClone);
    }
    const update = (obj) => {
        const stateClone = [...todosState];
        const index = stateClone.findIndex(td => td.id === obj.id);
        stateClone[index] = obj;
        setSortedTodoState(stateClone);

    }
    useEffect(()=>{
        if(response){
            setSortedTodoState(response);
        }
    }, [response])
    return(
        <div className="todos">
            <LogoutBtn/>
            <NewTodo/>
            {
            todosState?.map(
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