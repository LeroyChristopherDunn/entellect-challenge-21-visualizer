import {AppBar, Divider, IconButton, Toolbar, Tooltip} from "@material-ui/core";
import {UnderlineStatus} from "./UnderlineStatus";
import BackupIcon from "@material-ui/icons/Backup";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import React from "react";

export function AppHeader(props: {
    gameFileLoaded: boolean,
    onGameFileLoad: (file: File | undefined) => any,
    onZoomIn: () => any,
    onZoomOut: () => any,
    onRestZoom: () => any,
}) {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <UnderlineStatus pass={props.gameFileLoaded}>
                    <label htmlFor="btn-upload">
                        <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{display: 'none'}}
                            type="file"
                            accept=".json"
                            onChange={event => props.onGameFileLoad(event?.target?.files?.[0])}
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
                <Divider orientation="vertical" flexItem/>
                <IconButton color="inherit" onClick={props.onZoomIn}>
                    <ZoomInIcon/>
                </IconButton>
                <IconButton color="inherit" onClick={props.onZoomOut}>
                    <ZoomOutIcon/>
                </IconButton>
                <IconButton color="inherit" onClick={props.onRestZoom}>
                    <ZoomOutMapIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}