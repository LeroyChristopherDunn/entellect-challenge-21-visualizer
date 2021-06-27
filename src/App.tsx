// noinspection ExceptionCaughtLocallyJS

import React, {useEffect, useState} from 'react';
import './App.scss';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {GameTickPayload} from "./Types";
import {AppHeader} from "./components/AppHeader";
import {GameCanvas} from "./components/GameCanvas";

function App() {
    const [gameStates, setGameStates] = useState<GameTickPayload[]>();
    const [stateIndex, setStateIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleLoadGameFile = async (file?: File) => {

        try {
            if (!file) throw new Error('Error loading game file: file is undefined');
            const fileText = await file.text();
            const states: GameTickPayload[] = JSON.parse(fileText);

            if (!states?.[0].World?.CenterPoint
                || !states?.[0].World?.Radius
                || !states?.[0].PlayerObjects
                || !states?.[0].GameObjects
            ) {
                console.log('states[0]', states?.[0]);
                throw new Error('Error parsing game file');
            }

            setGameStates(states);
            setStateIndex(0);
            setIsPlaying(false);

        }catch (errorLoadingGameFile){
            alert('Error loading game file: ' + errorLoadingGameFile.message);
            console.error('Error loading game file', errorLoadingGameFile);
        }
    }

    const handleStateDecrement = () => {
        if (!!gameStates && stateIndex > 0)
            setStateIndex(prevState => prevState-1);
    }

    const handleStateIncrement = () => {
        if (!!gameStates && stateIndex < gameStates.length - 1)
            setStateIndex(prevState => prevState+1);
    }

    const handleSetStateIndex = (newStateIndex: number) => {
        if (!!gameStates && newStateIndex >= 0 && newStateIndex < gameStates.length - 1)
            setStateIndex(newStateIndex);
    }

    useEffect(() => {
        if (isPlaying) setTimeout(() => handleStateIncrement(), 30)
    }, [isPlaying, stateIndex]);

    return (
        <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
        >
            {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                <React.Fragment>
                    <AppHeader
                        gameFileLoaded={!!gameStates}
                        onGameFileLoad={handleLoadGameFile}
                        onZoomIn={() => zoomIn()}
                        onZoomOut={() => zoomOut()}
                        onRestZoom={() => resetTransform()}
                        stateIndex={stateIndex}
                        onPrevState={handleStateDecrement}
                        onNextState={handleStateIncrement}
                        onStateIndexChange={handleSetStateIndex}
                        isPlaying={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                    <div className="app-body">
                        <TransformComponent>
                            {!!gameStates && (
                                <GameCanvas
                                    maxWorldRadius={gameStates[0].World.Radius}
                                    state={gameStates[stateIndex]}
                                />
                            )}
                        </TransformComponent>
                    </div>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
}

export default App;
