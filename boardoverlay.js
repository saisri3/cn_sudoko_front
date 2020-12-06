import React from 'react'
import Overlaystyles from "./overlaystyles.module.scss"
import {useDispatch} from "react-redux"
import {isgameon} from "../gamecontrols/gamesSlice";
import {hitpoint} from "./boardSlice"
import socket from "socket.io-client";


export default function Boardoverlay() {


    const dispatch = useDispatch()

    const handleclick = () => {
        const mode = document.getElementById("gamemode").value
        if(mode === "single"){
            window.io = socket(hitpoint + "/single");
            window.io.on("connect" , () => console.log("connected to server in single player" + window.io.id));
            window.io.on("message" , message => alert(message))
        }
        if(mode === "dual"){
            window.io = socket(hitpoint + "/dual");
            window.io.on("connect" , () => console.log("connected to server in dual player" + window.io.id));
            window.io.on("message" , message => alert(message))
        }
        dispatch(isgameon())
    }
    return (
        <div className={Overlaystyles.overlayfields}>
            <select name="mode" id="gamemode">
                <option value="single">Single Player</option>
                <option value="dual">2-Player Team</option>
            </select>
            <button onClick={handleclick}>START</button>
        </div>
    )
}
