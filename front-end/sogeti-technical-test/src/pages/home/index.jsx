import AuthenticationContext from "../../functions/authenticationContextProvider"
import { useContext, useState } from "react"
import Todos from "../todos"
import Auth from "../auth"
import ErrorsContext from "../../functions/errorsContextProvider"
import ErrorsMacaron from "../../components/errorsMacaron"
export default function Home (){
    const authCtx = useContext(AuthenticationContext)
    const [errors, setErrors] = useState([])
    const pushError = (error) =>{
        setErrors(()=>([...errors, error]))
    }
    return(
            <ErrorsContext.Provider value={{
                errors,
                setErrors : pushError
            }}>
            <ErrorsMacaron errors={errors}/>
            {
                authCtx.authState.authenticated &&
                <Todos/>
                ||
                <Auth/>
            }
            </ErrorsContext.Provider>
    )
}