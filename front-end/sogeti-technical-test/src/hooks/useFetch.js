import {useEffect, useState, useContext} from "react";
import AuthenticationContext from "../functions/authenticationContextProvider";

export default function useFetch (url, obj){
    const authCtx = useContext(AuthenticationContext);
    const [response, setResponse] = useState(undefined);
    const [errors, setErrors] = useState(undefined);
    const errorsCallback = obj?.errorsCallback || setErrors //if a callback is given for errors, 
                                                            //useFetch will use it.
    /*
        devise_token_auth gem automaticaly refreshes
        the JWT for each authentication-based request.
    */
    const options = authCtx.authState.autheticated ? {
        headers: {
            Authorization: authCtx?.authState?.jwt && `Bearer ${authCtx.authState.jwt}`, //passes
                                                                                        //jwt if exists
            'Content-Type': 'application/json'
        },
        ...obj
    }
    :
    obj; // if authenticated : add the jwt to the header, 
        //otherwise : just pass the obj.
    const handleJWTRefresh = (response) => {
        const jwt = response.headers.get('Authorization');
        jwt ? authCtx.methods.setJwt(jwt)
        :
        authCtx.methods.logout();
    }
    const perform = () => {
        fetch(url, obj)
        .then(response => {
            handleJWTRefresh(response);
            return response.json()
        })
        .then(json => {
            setResponse(json)
        })
        .catch(errors => {
            errorsCallback(errors);
        })

    };
    return [response, errors, useEffect(()=>{
        perform();
    }, [])]
}