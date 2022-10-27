import { useState } from "react"
import NewTodoBtn from "../newTodoBtn"
import Todo from "../todo"

export default function NewTodo(){
    const [showModal, setShowModal] = useState(false)
    return(
        <>
            <NewTodoBtn/>
        </>
    )
}