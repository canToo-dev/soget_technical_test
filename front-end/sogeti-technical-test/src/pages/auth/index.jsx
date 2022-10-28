import { useId } from "react";
import { useState, useContext } from "react"
import Field from "../../components/field";
import AuthenticationContext from "../../functions/authenticationContextProvider";
export default function Auth(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const checkboxID = useId();
    const authCtx = useContext(AuthenticationContext);
    const handleChecked = (e)=>{
        setNewAccount(e.target.checked)
    }

    const submit = () => {
        newAccount ?
        authCtx.methods.signUp(
            {
                email,
                password,
                password_confirmation : passwordConfirmation
            }
        )
        :
        authCtx.methods.signIn(
            {
                email,
                password
            }
        )
    }
    
    return(
        <div className="auth">
            <div className="auth-container">

                <div className="form">
                    <h1>
                        connectez-vous
                    </h1>
                    <p>
                        <input type="checkbox" id={checkboxID} onClick={handleChecked}/> <label htmlFor={checkboxID}> je souhaite m'inscrire </label>
                    </p>
                    <Field callback={setEmail} value={email}/>
                    <Field callback={setPassword} value={password} password/>
                    {
                        newAccount &&
                        <Field callback={setPasswordConfirmation} value={passwordConfirmation}/>
                    }
                </div>
                <button onClick={submit}>submit</button>
            </div>
        </div>
    )
}