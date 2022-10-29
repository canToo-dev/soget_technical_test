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
                        {
                            newAccount && 
                            "Signup"
                            ||
                            "Login"
                        }
                    </h1>
                    <p>
                        <input type="checkbox" id={checkboxID} onClick={handleChecked}/> <label htmlFor={checkboxID}> I would like to signup </label>
                    </p>
                    <Field callback={setEmail} value={email} label="Email"/>
                    <Field callback={setPassword} value={password} password label="Password"/>
                    {
                        newAccount &&
                        <Field callback={setPasswordConfirmation} value={passwordConfirmation} password label="Password confirmation"/>
                    }
                </div>
                <button onClick={submit}>submit</button>
            </div>
        </div>
    )
}