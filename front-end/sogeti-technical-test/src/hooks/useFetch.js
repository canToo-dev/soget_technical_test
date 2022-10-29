import {useEffect, useState, useContext} from "react";
import AuthenticationContext from "../functions/authenticationContextProvider";
import { useNavigate } from "react-router-dom";

export default function useFetch (url, obj){
    const authCtx = useContext(AuthenticationContext);
    const [response, setResponse] = useState(undefined);
    const [errors, setErrors] = useState(undefined);
    const errorsCallback = obj?.errorsCallback || setErrors //if a callback is given for errors, 
                               //useFetch will use it.
    const navigateTo = useNavigate();
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
        jwt && authCtx.methods.setJwt(jwt)
    }

    const goRoot = ()=>{
        navigateTo("/")
    }
    const perform = (obj) => {
        const options = {
            ...buildOptions(),
            ...obj
        }
        fetch(url, options)
        .then(response => {
            if (!response.ok) { throw response }
            handleJWTRefresh(response.headers.get('Authorization'));
            return response.json()
        })
        .then(json => {
            setResponse(json)
        })
        .catch(errors => {
            return errors.json();
        }).then(json => {
            if(
                (json.errors?.filter(errorMsg => errorMsg.includes("You need to sign")).length > 0)
            ){
                authCtx.methods.logout()
            }
            errorsCallback(json)
            goRoot();
        }
        )

    };
    useEffect(()=>{
        obj?.onStart && perform();
    }, [])
    return [response, errors, perform, {
        setResponse
    }]
}