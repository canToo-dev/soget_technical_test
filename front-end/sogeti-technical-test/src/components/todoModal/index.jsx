import { useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import BASE_URI from "../../constants/baseUri";
import { useEffect, useState } from "react";
import Field from "../field";
import { useContext } from "react";
import ErrorsContext from "../../functions/errorsContextProvider";
export default function TodoModal(props){
    /*
        I just wanted to create ONE component for both update and create
        But I realized that the logic is quite complex
        I'll explain few things :
    */
    const newTodo = props.slug == "new"; /* check if this is a create or post context */
    const requestUrl = BASE_URI + "/todos/" + (newTodo ? "" : props.slug)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const submit = () => {
        requestPerform({
            method: newTodo ? 
            "POST" :  /* if it's a new todo, uses post, otherwise : uses put */
            "PUT",
            body : JSON.stringify({
                todo : {
                    title,
                    description
                }
            })
        })
    }
    
     /* if the slug format does'nt match, redirects to root page
                                                                                might create an error toast display */
        props.checkSlug(props.slug);
    useEffect(()=>{
            newTodo ? props.append(requestResponse) : props.update(requestResponse); /* if it is a new todo, appends it. Otherwise, updates it */
            props.goRoot();
    }, [])
    useEffect(()=>{
        if(response){
            setTitle(response.title);
            setDescription(response.description)
        }
    }, [])
    return(
        <div className="todo-modal" onClick={props.goRoot}>
            <div className="wrapper" onClick={(e)=>{e.stopPropagation()}}>
                <div className="title">
                    <h1>
                        {
                            newTodo ? 
                            "Create todo" :
                            "Edit todo"
                        }
                    </h1>
                    <div className="form">
                        <Field value={title} callback={setTitle} label="titre"/>
                        <Field value={description} callback={setDescription} label="description"/>
                    </div>
                    <button onClick={submit}>

                        {
                            newTodo ? 
                            "Create" :
                            "Edit"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
} 