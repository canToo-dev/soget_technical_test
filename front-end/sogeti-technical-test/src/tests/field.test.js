import Field from '../components/field';
import { render, screen } from '@testing-library/react';
import {react, useContext} from "react";
import ReactDOM from 'react-dom';
const root = document.createElement('div');

    beforeEach(() => {
        document.body.appendChild(root)
        }
    )
    test('field', ()=>{
        ReactDOM.render(
            <Field/>
            ,
            root
            )
        const field = document.querySelector(".field");
        expect(field).not.toBe(null);
        expect(field.value).toBe(undefined);


    })
    test('field with value', ()=>{
        ReactDOM.render(
            <Field value="value"/>
            ,
            root
            )
        const field = document.querySelector(".field");
        
        expect(field.querySelector("input[type=text]").value).toBe("value");
    })