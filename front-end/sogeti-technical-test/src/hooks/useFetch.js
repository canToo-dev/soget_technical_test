import {useEffect, useState} from "react";

export default function useFetch (url, obj){
    const [response, setResponse] = useState(undefined);
    const [errors, setErrors] = useState(undefined);
    const errorsCallback = obj?.errorsCallback || setErrors
    return [response, errors, useEffect(()=>{
        fetch(url, obj)
        .then(response => response.json())
        .then(json => setResponse(json))
        .catch(errors => {
            errorsCallback(errors);
        })
    }, [])]
}