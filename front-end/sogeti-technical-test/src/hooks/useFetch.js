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
    const buildOptions = () => {
        return authCtx.authState.jwt ? {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authCtx?.authState?.jwt && `Bearer ${authCtx.authState.jwt}`
            },
            ...obj
        }
        :
        obj; // if authenticated : add the jwt to the header, 
            //otherwise : just pass the obj.
    }
    const handleJWTRefresh = (jwt) => {
        jwt ? authCtx.methods.setJwt(jwt)
        :
        authCtx.methods.logout();
    }
    const perform = (obj) => {
        const options = {
            ...buildOptions(),
            ...obj
        }
        console.log(options);
        fetch(url, options)
        .then(response => {
            handleJWTRefresh(response.headers.get('Authorization'));
            return response.json()
        })
        .then(json => {
            setResponse(json)
        })
        .catch(errors => {
            errorsCallback(errors);
        })

    };
    useEffect(()=>{
        obj?.onStart && perform();
    }, [])
    return [response, errors, perform]
}