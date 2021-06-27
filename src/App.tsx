// noinspection ExceptionCaughtLocallyJS

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {GameTickPayload} from "./Types";
import {AppHeader} from "./components/AppHeader";

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
                    <TransformComponent>
                        <div className="App">
                            <header className="App-header">
                                <img src={logo} className="App-logo" alt="logo"/>
                                <p>
                                    Edit <code>src/App.tsx</code> and save to reload.
                                </p>
                                <a
                                    className="App-link"
                                    href="https://reactjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Learn React
                                </a>
                            </header>
                        </div>
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
}

export default App;
