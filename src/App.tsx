// noinspection ExceptionCaughtLocallyJS

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {AppBar, Divider, IconButton, Toolbar, Tooltip} from "@material-ui/core";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import BackupIcon from '@material-ui/icons/Backup';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {GameTickPayload} from "./Types";
import {UnderlineStatus} from "./components/UnderlineStatus";

function App() {
    const [gameStates, setGameStates] = useState<GameTickPayload[]>();

    const loadGameStates = async (file?: File) => {

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
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <UnderlineStatus pass={!!gameStates}>
                                <label htmlFor="btn-upload">
                                    <input
                                        id="btn-upload"
                                        name="btn-upload"
                                        style={{display: 'none'}}
                                        type="file"
                                        accept=".json"
                                        onChange={event => loadGameStates(event?.target?.files?.[0])}
                                    />
                                    <Tooltip title="Select game file">
                                        <IconButton
                                            color="inherit"
                                            component={"span"}
                                        >
                                            <BackupIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </label>
                            </UnderlineStatus>
                            {/*<div style={{borderBottomWidth: 4, borderBottomStyle: "solid", borderBottomColor: "red", ...!!gameStates && {borderBottomColor: "lime"}}}>*/}
                            {/*    */}
                            {/*</div>*/}

                            <Divider orientation="vertical" flexItem />

                            <IconButton color="inherit" onClick={() => zoomIn()}>
                                <ZoomInIcon/>
                            </IconButton>
                            <IconButton color="inherit" onClick={() => zoomOut()}>
                                <ZoomOutIcon/>
                            </IconButton>
                            <IconButton color="inherit" onClick={() => resetTransform()}>
                                <ZoomOutMapIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
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
