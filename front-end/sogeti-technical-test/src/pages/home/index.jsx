import AuthenticationContext from "../../functions/authenticationContextProvider"
import { useContext } from "react"
import Todos from "../todos"
import Auth from "../auth"
export default function Home (){
    const authCtx = useContext(AuthenticationContext)
    return(
        <>
        gyikonjbhikl
            {
                authCtx.authState.authenticated &&
                <Todos/>
                ||
                <Auth/>
            }
        </>
    )
}