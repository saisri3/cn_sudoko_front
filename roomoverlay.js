import React, {useState} from 'react'
import Overlaystyles from "./overlaystyles.module.scss"
import {useDispatch, useSelector} from "react-redux"
import {isinside} from "../gamecontrols/gamesSlice";
import {hitpoint} from "./boardSlice"
import { render } from '@testing-library/react';


export default function Roomoverlay() {

    const iswaitmode = useSelector(state => state.games.waitmode)
    const isprevgamended = useSelector(state => state.games.prevgamended)
    const isgamemode = useSelector(state => state.games.gamemode)
    
    const remtime = useSelector(state => state.games.remtime)
    const handleclick = () => {
        const name = document.getElementById("name").value
        if(!name)
            return;
        window.io.emit("roomentered", name)
    }

    var renderel
    if(iswaitmode){
        var msg = isprevgamended ? "The previous game has ended ! Refresh the page to join the next game" : "The game has already started. You will get notified when the game ends and you can join the next game"
        renderel =  <div className={Overlaystyles.overlayfields}>
            <div className={ isprevgamended ? Overlaystyles.waitmsg : Overlaystyles.waitmsg2}>{msg}</div>
        </div>
    }
    if(iswaitmode == null){
        renderel =  <div className={Overlaystyles.overlayfields}>
            <input placeholder="Your Name" name="name" id="name" type="text" />
            <button onClick={handleclick}>Enter Gameroom</button>
        </div>
    }
    if(isgamemode){
        renderel =  <div className={Overlaystyles.timer}>
            <div>Game Starts in</div>
            <div className={Overlaystyles.time}>{remtime}</div>
        </div>
    }
    return (
        renderel
    )
}
