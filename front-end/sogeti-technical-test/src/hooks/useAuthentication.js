import cookies from "../functions/cookies"
import { useState, useContext } from "react";
import BASE_URI from "../constants/baseUri";

export default function useAuthentication(){
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
          console.log(JSON.stringify(obj));
          fetch('http://localhost:3001/auth', options)
          .then(response => {setJwt(response.headers.get('Authorization'))})
    }
    const signIn = (obj) =>{
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          };
          console.log(JSON.stringify(obj));
          fetch('http://localhost:3001/auth', options)
          .then(response => {setJwt(response.headers.get('Authorization'))})
    }
    return {
        methods : {
            signUp,
            signIn
        }
        ,
        authState
    }
}