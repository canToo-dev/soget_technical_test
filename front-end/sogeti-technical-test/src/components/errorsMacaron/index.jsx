
import { useContext } from "react"
import ErrorsContext from "../../functions/errorsContextProvider"
export default function ErrorsMacaron(){
    const errorsCtx = useContext(ErrorsContext)
    console.log(errorsCtx); 
    return(
        <div className="errors-macaron">
            {
                errorsCtx.errors.map(error => (
                    error.errors ? error.errors.map(msg => (
                            <div className="error">
                                {msg}
                            </div>
                        )
                    ) :
                    <div className="error">
                        {error.error}
                    </div>
                )
                )
            }
        </div>
    )
}