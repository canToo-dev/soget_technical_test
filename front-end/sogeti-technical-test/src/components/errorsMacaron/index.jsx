export default function ErrorsMacaron(props){
    const errorsCtx = {
        errors : props.errors
    }
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