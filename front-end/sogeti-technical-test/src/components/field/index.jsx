export default function Field (props){
    const change = (e) => {
        props.callback(e.target.value);
    }
    return(

        <div className="field">
            <input type={props.password ? "password" : "text"} placeholder=" " onChange={change} value={props.value}/>
            <label>{props.label}</label>
        </div>
    )
}