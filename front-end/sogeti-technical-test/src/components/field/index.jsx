import { useId } from "react";
export default function Field (props){
    const id = useId();
    const change = (e) => {
        props.callback(e.target.value);
    }
    return(

        <div className="field">
            <input id={id} type={props.password ? "password" : "text"} placeholder=" " onChange={change} value={props.value}/>
            <label htmlFor={id}>{props.label}</label>
        </div>
    )
}