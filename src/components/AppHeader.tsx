import {AppBar, Box, Divider, IconButton, TextField, Toolbar, Tooltip} from "@material-ui/core";
import {UnderlineStatus} from "./UnderlineStatus";
import BackupIcon from "@material-ui/icons/Backup";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HistoryIcon from '@material-ui/icons/History';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import React from "react";

export function AppHeader(props: {
    gameFileLoaded: boolean,
    onGameFileLoad: (file: File | undefined) => any,
    gameResultLoaded: boolean,
    onGameResultLoad: (file: File | undefined) => any,
    onZoomIn: () => any,
    onZoomOut: () => any,
    onRestZoom: () => any,
    stateIndex: number,
    onPrevState: () => any,
    onNextState: () => any,
    onStateIndexChange: (stateIndex: number) => any,
    isPlaying: boolean,
    onPlay: () => any,
    onPause: () => any,
}) {
    return (
        <AppBar position="static" className={'header'}>
            <Toolbar variant="dense" className={'header'}>
                <UnderlineStatus pass={props.gameFileLoaded}>
                    <label htmlFor="game-file-upload">
                        <input
                            id="game-file-upload"
                            name="game-file-upload"
                            style={{display: 'none'}}
                            type="file"
                            accept=".json"
                            onChange={event => props.onGameFileLoad(event?.target?.files?.[0])}
                        />
                        <Tooltip title="Select game file">
                            <IconButton size={"small"} color="inherit" component={"span"} >
                                <BackupIcon/>
                            </IconButton>
                        </Tooltip>
                    </label>
                </UnderlineStatus>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <UnderlineStatus pass={props.gameResultLoaded}>
                    <label htmlFor="game-result-upload">
                        <input
                            id="game-result-upload"
                            name="game-result-upload"
                            style={{display: 'none'}}
                            type="file"
                            accept=".json"
                            onChange={event => props.onGameResultLoad(event?.target?.files?.[0])}
                        />
                        <Tooltip title="Select game result">
                            <IconButton size={"small"} color="inherit" component={"span"} >
                                <BackupIcon/>
                            </IconButton>
                        </Tooltip>
                    </label>
                </UnderlineStatus>

                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <Divider orientation="vertical" flexItem/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>

                <IconButton size={"small"} color="inherit" onClick={props.onZoomIn}>
                    <ZoomInIcon/>
                </IconButton>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <IconButton size={"small"} color="inherit" onClick={props.onZoomOut}>
                    <ZoomOutIcon/>
                </IconButton>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <IconButton size={"small"} color="inherit" onClick={props.onRestZoom}>
                    <ZoomOutMapIcon/>
                </IconButton>

                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <Divider orientation="vertical" flexItem/>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <HorizontalSpace/>

                <IconButton size={"small"} color="inherit" onClick={() => props.onStateIndexChange(0)}>
                    <HistoryIcon/>
                </IconButton>
                <HorizontalSpace/>
                <HorizontalSpace/>
                {!props.isPlaying ? (
                    <IconButton size={"small"} color="inherit" onClick={props.onPlay}>
                        <PlayArrowIcon/>
                    </IconButton>
                ) : (
                    <IconButton size={"small"} color="inherit" onClick={props.onPause}>
                        <PauseIcon/>
                    </IconButton>
                )}
                <HorizontalSpace/>
                <HorizontalSpace/>
                <IconButton size={"small"} color="inherit" onClick={props.onPrevState}>
                    <ChevronLeftIcon/>
                </IconButton>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <div className={'input-wrapper'}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type={'number'}
                        size={"small"}
                        value={props.stateIndex}
                        onChange={e => props.onStateIndexChange(parseInt(e.target.value))}
                    />
                </div>
                <HorizontalSpace/>
                <HorizontalSpace/>
                <IconButton size={"small"} color="inherit" onClick={props.onNextState}>
                    <ChevronRightIcon/>
                </IconButton>
                <HorizontalSpace/>

            </Toolbar>
        </AppBar>
    )
}

function HorizontalSpace(){return (<Box mx={0.25}/>)}