import {createSlice} from "@reduxjs/toolkit"
import { initiate } from "../board/boardSlice";



const initial = {
    isinside : 0,
    isgameon : 0,
    waitmode : null,
    prevgamended : null,
    gamemode : null,
    remtime : null,
    onlineusers : [],
    competitors : [],
    finishedplayers : []
}

const gamesSlice = createSlice({
    name: "games",
    initialState : initial,
    reducers: {
        isinside : state => {
            state.isinside = 1
        },
        waitmode : (state) => {
            state.waitmode = 1
            state.prevgamended = 0
            state.gamemode = 0
        },
        prevgamended : (state) => {
            state.prevgamended = 1
        },
        gamemode : (state) => {
            state.waitmode = 0
            state.gamemode = 1
        },


        remtime : (state,action) => {
            if(action.payload == 0)
                state.isinside = 1
            state.remtime = action.payload
        },
        isgameon : (state) => {
            state.isgameon = 1
        },
        onlineusers : {
            reducer : (state, action) => {
                state.onlineusers = action.payload
            },
            prepare : (allusers) => {
                var allplayers =  Object.values(allusers)
                allplayers = allplayers.filter(e => {
                    return e != null
                })

                return {
                    payload : allplayers
                }
            }
        },
        competitors : (state, action) => {
            state.competitors = Object.values(action.payload)
            state.isgameon = 1
        },
        finishedplayers : (state, action) => {
            state.finishedplayers = Object.values(action.payload)
        }
    }
});

export default gamesSlice.reducer;
export const {isgameon, isinside, onlineusers, competitors, finishedplayers, remtime, waitmode, gamemode, prevgamended} = gamesSlice.actions;