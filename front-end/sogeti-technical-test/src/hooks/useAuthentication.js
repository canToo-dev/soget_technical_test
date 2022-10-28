import cookies from "../functions/cookies"
import { useState, useContext } from "react";
import BASE_URI from "../constants/baseUri";
import ErrorsContext from "../functions/errorsContextProvider";

export default function useAuthentication(errorsCtx = null){
    const jwt = cookies.getCookie("jwt");
    const [authState, setAuthState] = useState({
        authenticated : jwt ? true : false,
        jwt : jwt
    })
    const setJwt = (jwt) => {
        cookies.setCookie("jwt", jwt, 3650)
        setAuthState({
            authenticated : true,
            jwt : jwt
        })
    }
    const signUp = (obj) =>{
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          };
          fetch('http://localhost:3001/auth', options)
          .then(response => {

            if (!response.ok) { throw response }
            setJwt(response.headers.get('Authorization'))
        })
          .catch((error) => {errorsCtx && errorsCtx.setErrors(error)})
    }
    const signIn = (obj) =>{
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          };
          fetch('http://localhost:3001/auth/sign_in', options)
          .then(response => {
            if (!response.ok) { throw response }
            setJwt(response.headers.get('Authorization'))
            
            })
          .catch((error) => {errorsCtx && errorsCtx.setErrors(error)})
    }
    const logout = () => {
        setAuthState({
            authenticated : false,
            jwt : null
        })
    }
    return {
        methods : {
            signUp,
            signIn,
            logout,
            setJwt
        }
        ,
        authState
    }
}