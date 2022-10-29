import ErrorsMacaron from '../components/errorsMacaron';
import { render, screen } from '@testing-library/react';
import {react, useContext} from "react";
import ReactDOM from 'react-dom';

const root = document.createElement('div');

    beforeEach(() => {
        document.body.appendChild(root)
        }
    )
    test('errors macaron with no errors', ()=>{
        ReactDOM.render(
            <ErrorsMacaron errors={[]}></ErrorsMacaron>
            ,
            root
            )
        const macaron = document.querySelector(".errors-macaron");
        expect(macaron).not.toBeNull();
        expect(macaron.childElementCount).toBe(0);    
    })
    test('errors macaron with one error', ()=>{
        const errs = [
            {
                error : "simple 1"
            }

        ]
        ReactDOM.render(
            <ErrorsMacaron errors={errs}></ErrorsMacaron>
            ,
            root
            )
        const macaron = document.querySelector(".errors-macaron");
        expect(macaron).not.toBeNull();
        expect(macaron.childElementCount).toBe(1);
        expect(macaron.firstChild.innerHTML).toBe("simple 1")   
    })
    test('errors macaron with multiple error', ()=>{
        const errs = [
            {
                errors : [
                    "multiple 1",
                    "multiple 2"
                ]
            }
    
        ]
        ReactDOM.render(
            <ErrorsMacaron errors={errs}></ErrorsMacaron>
            ,
            root
            )
        const macaron = document.querySelector(".errors-macaron");
        expect(macaron).not.toBeNull();
        expect(macaron.childElementCount).toBe(2);
        expect(macaron.firstChild.innerHTML).toBe("multiple 1")   
        expect(macaron.lastChild.innerHTML).toBe("multiple 2")   
    })

    test('errors macaron with nine mixed errors', ()=>{
        const errs = [
            {
                error : "simple 1"
            },

            {
                errors : [
                    "multiple 1",
                    "multiple 2"
                ]
            },
            {
                error : "simple 1"
            },

            {
                errors : [
                    "multiple 1",
                    "multiple 2"
                ]
            },
            {
                error : "simple 1"
            },

            {
                errors : [
                    "multiple 1",
                    "multiple 2"
                ]
            },

        ]
        ReactDOM.render(
            <ErrorsMacaron errors={errs}></ErrorsMacaron>
            ,
            root
            )
        const macaron = document.querySelector(".errors-macaron");
        expect(macaron).not.toBeNull(); 
        expect(macaron.childElementCount).toBe(9);
    })