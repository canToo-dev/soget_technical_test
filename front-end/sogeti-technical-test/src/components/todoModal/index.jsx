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
    const errorsCtx = useContext(ErrorsContext);
    const newTodo = props.slug == "new"; /* check if this is a create or post context */
    const requestUrl = BASE_URI + "/todos/" + (newTodo ? "" : props.slug)

    const [response, errors, perform] = useFetch(requestUrl,{
        errorsCallback : errorsCtx.setErrors
    }); /* this useFetch is used to fetch data from server in 
        update context */
    const [requestResponse, requestErrors, requestPerform] = useFetch(requestUrl,{
        errorsCallback : errorsCtx.setErrors
    }) /* this one is for submission request */

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const navigateTo = useNavigate();
    const goRoot = ()=>{
        navigateTo("/")
    }

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
    useEffect(()=>{
        if((props.slug.toLowerCase() !== "new" ) && (isNaN(parseInt(props.slug)))){ /* if the slug format does'nt match, redirects to root page
                                                                                    might create an error toast display */
            goRoot();
        }
        !newTodo && perform();
    }, [])
    useEffect(()=>{
        if(requestResponse){
            newTodo ? props.append(requestResponse) : props.update(requestResponse); /* if it is a new todo, appends it. Otherwise, updates it */
            goRoot();
        }
    }, [requestResponse])
    useEffect(()=>{
        if(response){
            setTitle(response.title);
            setDescription(response.description)
        }
    }, [response])
    return(
        <div className="todo-modal" onClick={goRoot}>
            <div className="wrapper" onClick={(e)=>{e.stopPropagation()}}>
                <div className="title">
                    <h1>
                        {
                            newTodo ? 
                            "Creer un todo" :
                            "Editer un todo"
                        }
                    </h1>
                    <div className="form">
                        <Field value={title} callback={setTitle}/>
                        <Field value={description} callback={setDescription}/>
                    </div>
                    <button onClick={submit}>

                        {
                            newTodo ? 
                            "Creer" :
                            "Editer"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
} 