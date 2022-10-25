import {useEffect, useState} from "react";

export default function useFetch (url, obj){
    const [response, setResponse] = useState(undefined);
    const [errors, setErrors] = useState(undefined);
    const perform = (callback) => {
        fetch(url, obj)
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(json => {
            setResponse(json)
            callback && callback(json)
        })
        .catch(errors => {
            errorsCallback(errors);
        })

    };
    const errorsCallback = obj?.errorsCallback || setErrors
    return [response, errors, useEffect(()=>{
        perform();
    }, [])]
}