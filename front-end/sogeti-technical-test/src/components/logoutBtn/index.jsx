import AuthenticationContext from "../../functions/authenticationContextProvider";
import { useContext } from "react";
export default function LogoutBtn(){
    const authCtx = useContext(AuthenticationContext);
    return(
        <button className="logout" onClick={
            authCtx.methods.logout
        }>
            Logout
        </button>
    )
}