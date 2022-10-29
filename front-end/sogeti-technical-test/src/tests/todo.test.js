import Todo from "../components/todo";
import { render, screen } from '@testing-library/react';
import {react, useContext} from "react";
import ReactDOM from 'react-dom';
import errorsContextProvider from "../functions/errorsContextProvider";

const root = document.createElement('div');

    beforeEach(() => {
        document.body.appendChild(root)
        }
    )
    test('todo with all informations, checked : false', ()=>{
        ReactDOM.render(
            <errorsContextProvider.Provider value={{setErrors:()=>{}}}>
                <Todo todo={{
                    title : "title for test",
                    description : "description for test",
                    checked : false
                }}/>
                
            </errorsContextProvider.Provider>,
            root
            )
        const title = document.querySelector(".title");
        expect(title).not.toBeNull();
        expect(title.querySelector("h2").innerHTML).toBe('title for test')
        expect(title.querySelector('input[type=checkbox]').checked).toBe(false)
    
    })

    test('todo with all informations, checked : true', ()=>{
        ReactDOM.render(
            <errorsContextProvider.Provider value={{setErrors:()=>{}}}>
                <Todo todo={{
                    title : "title for test 2",
                    description : "description for test",
                    checked : true
                }}/>
                
            </errorsContextProvider.Provider>,
            root
            )
        const title = document.querySelector(".title");
        expect(title).not.toBeNull();
        expect(title.querySelector("h2").innerHTML).toBe('title for test 2')
        expect(title.querySelector('input[type=checkbox]').checked).toBe(true)
    
    })
        
    test('empty todo, checked : true', ()=>{
        ReactDOM.render(
            <errorsContextProvider.Provider value={{setErrors:()=>{}}}>
                <Todo todo={{
                    title : "",
                    description : "description for test",
                    checked : true
                }}/>
                
            </errorsContextProvider.Provider>,
            root
            )
        const title = document.querySelector(".title");
        expect(title).not.toBeNull();
        expect(title.querySelector("h2").innerHTML).toBe('')
        expect(title.querySelector('input[type=checkbox]').checked).toBe(true)
    
    })
        