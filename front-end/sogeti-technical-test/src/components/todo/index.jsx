import { useMemo, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URI from "../../constants/baseUri";
import { Link } from "react-router-dom";
import createID from "../../functions/createID";
import ErrorsContext from "../../functions/errorsContextProvider";
import { useContext } from "react";

export default function Todo(props){
    const errorsCtx = useContext(ErrorsContext)
    const propCheck = props.todo.checked ? true : false;
    const [response, errors, perform] = useFetch(`${BASE_URI}/todos/${props.todo.id}`,{
        errorsCallback : errorsCtx.setErrors
    });
    const change = () => {
        perform({
            method : "PUT",
            body : JSON.stringify({
                    todo : {
                        checked : !propCheck,
                    }
            })
        })
    }
    //const checkboxId = useId() <== DON'T DO THAT :
    /*
        useID is a mess in this case.
        useID returns incremental_based ID
        so, when you check a todo, the container updates,
        the next todo which has a id like : ":n:",
        after update has now id like ":n-1:"
        this creates display bug.
        even if the state says that the todo is unchecked,
        it will be displayed has checked :/
        (I honestly took a while to understand what was going on)
        do this instead :
    */
    var checkboxId = createID(7);
    useEffect(()=>{
        if(response){
            props.update(response);
        }
    }, [response])
    return(
        <div className="todos-container">
            <div className="todo">
                <div className="title">
                    <input type="checkbox" className={propCheck ? "checked" : ""} id={checkboxId} checked={propCheck} onChange={change}/>
                    <label className="check" htmlFor={checkboxId}>
                        
                    </label>

                    <Link to={`/${props.todo.id}`}>
                        <h2 className={propCheck ? "checked" : ""}>{props.todo.title}</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}