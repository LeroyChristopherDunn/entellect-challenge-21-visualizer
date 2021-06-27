import logo from "../logo.svg";
import React from "react";

export function GameCanvas() {
    return (
        <div className={"game-canvas-wrapper"}>
            <div className="game-canvas">
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
        </div>
    )
}