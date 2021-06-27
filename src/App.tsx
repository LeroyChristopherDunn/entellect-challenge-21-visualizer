// noinspection ExceptionCaughtLocallyJS

import React, {useState} from 'react';
import './App.scss';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {GameTickPayload} from "./Types";
import {AppHeader} from "./components/AppHeader";
import {GameCanvas} from "./components/GameCanvas";

function App() {
    const [gameStates, setGameStates] = useState<GameTickPayload[]>();

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

        }catch (errorLoadingGameFile){
            alert('Error loading game file: ' + errorLoadingGameFile.message);
            console.error('Error loading game file', errorLoadingGameFile);
        }
    }

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
                    />
                    <div className="app-body">
                        <TransformComponent>
                            <GameCanvas/>
                        </TransformComponent>
                    </div>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
}

export default App;
