// noinspection ExceptionCaughtLocallyJS

import React, {useEffect, useState} from 'react';
import './App.scss';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {GameResult, GameTickPayload} from "./Types";
import {AppHeader} from "./components/AppHeader";
import {GameCanvas} from "./components/GameCanvas";
import {GameResultDrawer} from "./components/GameResultDrawer";

function App() {
    const [gameStates, setGameStates] = useState<GameTickPayload[]>();
    const [gameResult, setGameResult] = useState<GameResult>();
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
            setGameResult(undefined)

        }catch (errorLoadingGameFile){
            alert('Error loading game file: ' + errorLoadingGameFile.message);
            console.error('Error loading game file', errorLoadingGameFile);
        }
    }

    const handleLoadGameResultFile = async (file?: File) => {

        try {
            if (!file) throw new Error('Error loading game result file: file is undefined');
            const fileText = await file.text();
            const result: GameResult = JSON.parse(fileText);

            if (!result?.TotalTicks
                || !result?.Players
                || !result?.Players?.[0].Id
                || !result?.Players?.[0].Placement
                || !result?.Players?.[0].Score
                || !result?.Players?.[0].Nickname
            ) {
                console.log('result file', result)
                throw new Error('Error parsing game result file');
            }

            setGameResult(result);

        }catch (errorLoadingGameResultFile){
            alert('Error loading game result file: ' + errorLoadingGameResultFile.message);
            console.error('Error loading game result file', errorLoadingGameResultFile);
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
                        gameResultLoaded={!!gameResult}
                        onGameResultLoad={handleLoadGameResultFile}
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
                        <GameResultDrawer gameResult={gameResult}/>
                        <TransformComponent>
                            {!!gameStates && (
                                <GameCanvas
                                    maxWorldRadius={gameStates[0].World.Radius}
                                    state={gameStates[stateIndex]}
                                    gameResult={gameResult}
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
