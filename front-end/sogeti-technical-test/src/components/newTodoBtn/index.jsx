import { Link } from "react-router-dom"
export default function NewTodoBtn(props){
    return(
        <Link to={"/new"}>
            <div className="new-todo-btn" onClick={props.callback}>
                Add a todo +
            </div>
        </Link>
    )
}