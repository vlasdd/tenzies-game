import React from "react";
import Dot from "./Dot";
import {nanoid} from "nanoid";

export default function Die(props){
    const dots = [];
    for(let i = 0; i < props.value; i++){
        dots.push(
            <Dot 
                key={nanoid()}
            />
        )
    }

    return(
        <div 
            className={`die--component ${props.isHeld && "die--component--held"}`}
            onClick={props.isHeldToggle}
        >
            <div className={`limiting--container limiting--container--${props.value}`}>
                {dots}
            </div>
        </div>
    )
}