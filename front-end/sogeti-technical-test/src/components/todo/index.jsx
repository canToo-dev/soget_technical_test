export default function Todo(props){
    return(
        <div className="todo">
            <div className="title">
                {
                    props.title
                }
            </div>
        </div>
    )
}