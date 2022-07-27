import React from "react";
import Dot from "./Dot";
import { nanoid } from "nanoid";

export default function Die(props) {
    const dots = [];
    for (let i = 0; i < props.value; i++) {
        dots.push(<Dot key={nanoid()} />)
    }

    return (
        <div
            className={`dies-container__component ${props.isHeld && "dies-container__component_held"}`}
            onClick={props.isHeldToggle}
        >
            <div className={`dies-container__wrapper dies-container__wrapper_${props.value}`}>
                {dots}
            </div>
        </div>
    )
}