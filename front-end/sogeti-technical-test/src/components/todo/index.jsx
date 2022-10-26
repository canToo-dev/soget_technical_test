import { useId, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URI from "../../constants/baseUri";

export default function Todo(props){
    const [checked, setChecked] = useState(props.todo.checked ? true : false);
    const [response, errors, perform] = useFetch(`${BASE_URI}/todos/${props.todo.id}`);
    const change = () => {
        perform({
            method : "PUT",
            body : JSON.stringify({
                    todo : {
                        checked : !checked,
                    }
            })
        })
        setChecked(!checked)
    }
    const checkboxId = useId()
    useEffect(()=>{
        if(response){
            setChecked(response.checked);
        }
    }, [response])
    return(
        <div className="todos-container">
            <div className="todo">
                <div className="title">
                    <input type="checkbox" id={checkboxId} checked={checked} onChange={change}/>
                    <label className="check" htmlFor={checkboxId}>
                        
                    </label>
                    <h2>{props.todo.title}</h2>
                </div>
            </div>
        </div>
    )
}