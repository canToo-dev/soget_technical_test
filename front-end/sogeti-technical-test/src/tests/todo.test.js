import Todo from "../components/todo";
import { render, screen } from '@testing-library/react';
import {react} from "react";

export default function todosTests(){
    test('todo with all informations, checked : false', ()=>{
        render(
            <Todo todo={{
                title : "title for test",
                description : "description for test",
                checked : false
            }}/>
            )
        const title = document.querySelector(".title");
        expect(title).not.toBeNull();

    })
}