import {ListItem, ListItemText, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React from "react";
import {GameResult, PlayerGameResult} from "../Types";

export function GameResultDrawer(props: {gameResult?: GameResult}) {
    return (
        <div className={"game-result-drawer"}>
            <List component="nav" className="list">
                {props.gameResult?.Players.map((player, index) => (
                    <PlayerResult key={player.Id} player={player} index={index}/>
                ))}
            </List>
        </div>
    )
}

function PlayerResult(props: {player: PlayerGameResult, index: number}){
    return (
        <ListItem button>
            <ListItemIcon color="inherit">
                <Typography variant="subtitle1" className="text">{props.index}</Typography>
            </ListItemIcon>
            <ListItemText className="text">{props.player.Nickname}</ListItemText>
            <ListItemIcon color="inherit">
                <Typography variant="subtitle1" className="text">{props.player.Score}</Typography>
            </ListItemIcon>
        </ListItem>
    )
}
