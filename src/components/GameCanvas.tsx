import React from "react";
import {GameObject, GameTickPayload} from "../Types";

const CANVAS_RADIUS = 300;

const PLAYER_TYPE = 1;
const FOOD_TYPE = 2;
const WORMHOLE_TYPE = 3;
const GAS_CLOUD_TYPE = 4;
const ASTEROID_TYPE = 5;
const TORPEDO_TYPE = 6; //todo confirm torpedo type id

export function GameCanvas(props: {state: GameTickPayload}) {
    const state = props.state;
    const worldScaleFactor = CANVAS_RADIUS / state.World.Radius;
    const players = Object.keys(state.PlayerObjects).map(id => new GameObject(id, state.PlayerObjects[id]));
    const gameObjects = Object.keys(state.GameObjects).map(id => new GameObject(id, state.GameObjects[id]));
    const foods = gameObjects.filter(obj => obj.type === FOOD_TYPE);
    const wormholes = gameObjects.filter(obj => obj.type === WORMHOLE_TYPE);
    const gasClouds = gameObjects.filter(obj => obj.type === GAS_CLOUD_TYPE);
    const asteroidClouds = gameObjects.filter(obj => obj.type === ASTEROID_TYPE);
    const torpedoes = gameObjects.filter(obj => obj.type === TORPEDO_TYPE);
    return (
        <div className={"game-canvas-wrapper"}>
            <div className="game-canvas">
                <Circle left={0} top={0} radius={CANVAS_RADIUS} className={'object map'}/>
                <DrawObjects gameObjects={gasClouds} worldScaleFactor={worldScaleFactor} className={'gas-cloud'}/>
                <DrawObjects gameObjects={asteroidClouds} worldScaleFactor={worldScaleFactor} className={'asteroid-cloud'}/>
                <DrawObjects gameObjects={wormholes} worldScaleFactor={worldScaleFactor} className={'wormhole'}/>
                <DrawObjects gameObjects={foods} worldScaleFactor={worldScaleFactor} className={'food'}/>
                <DrawObjects gameObjects={torpedoes} worldScaleFactor={worldScaleFactor} className={'torpedo'}/>
                <DrawObjects gameObjects={players} worldScaleFactor={worldScaleFactor} className={'player'}/>
            </div>
        </div>
    )
}

function DrawObjects(props: {gameObjects: GameObject[], worldScaleFactor: number, className: string}){
    return (
        <>
            {props.gameObjects.map(object => {
                const canvasCoords = mapToCanvasCoords(CANVAS_RADIUS, props.worldScaleFactor, object);
                return <Circle
                    key={object.id}
                    left={canvasCoords.left}
                    top={canvasCoords.top}
                    radius={canvasCoords.radius}
                    className={'object ' + props.className}
                />
            })}
        </>
    )
}

function mapToCanvasCoords(canvasRadius: number, worldScaleFactor: number, gameObject: GameObject){
    return {
        left: canvasRadius + (gameObject.x * worldScaleFactor) - (gameObject.size * worldScaleFactor),
        top: canvasRadius - (gameObject.y * worldScaleFactor) - (gameObject.size * worldScaleFactor),
        radius: gameObject.size * worldScaleFactor,
    }
}

function Circle(props: {left: number, top: number, radius: number, className?: string}){
    return (
        <div className={props.className} style={{
            left: props.left,
            top: props.top,
            width: props.radius * 2,
            height: props.radius * 2,
        }}/>
    )
}
