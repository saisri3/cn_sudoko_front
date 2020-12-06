import {createSlice} from "@reduxjs/toolkit";
import { StaticRouter } from "react-router-dom";
import socket from "socket.io-client";
import object from "./initialarray";

const url = "http://localhost:3001";
const heroku = "https://reduxokubackend.herokuapp.com"
export const hitpoint = (window.location.href.includes("localhost",0)) ? url : heroku ; 

window.io = socket(hitpoint+"/gameplay"); //we have to make this socket instance accessible in all our components. That is why we are using the 'window' work to declare it as a global variable. 



const boardSlice = createSlice({ //learn about createSlice in redux
    name : "board",
    initialState : object, 
    reducers : {
        initiate(state, action){
            state = action.payload;
            return state;
        },
        updateobject : {
            reducer(state, action) {
            state = {...action.payload};
            return state;
            }
            // prepare(object, clientid){
            //     const newobject = {...object, clientid: clientid};
            //     return {
            //         payload : newobject
            //     }
            // } 
        }
        ,
        highlighter : {
            reducer: (state, action) => {
                state.highlightedcell = action.payload
            },
            prepare : (cellid) => {
                return {
                    payload : [{
                        cellid : cellid,
                        clientid : window.io.id
                    }]
                }
            }
        },
        inputnumsetter(state, action){
            const inputnum = parseInt(action.payload);
            if(state.highlightedcell.length == 0)
                return state
            else{
                const cellid = state.highlightedcell[0].cellid
                if(!state.initialarray[Math.floor(cellid/10) - 1][cellid%10 - 1][2])
                    state.filledcount++
                state.initialarray[Math.floor(cellid/10) - 1][cellid%10 - 1][2] = inputnum

                var flag =  state.initialarray[Math.floor(cellid/10) - 1][cellid%10 - 1][3]
                var correctvalue =  state.initialarray[Math.floor(cellid/10) - 1][cellid%10 - 1][0]
                var correctcount = state.correctcount

                if(correctvalue == inputnum){
                    if(flag == 0){
                        state.correctcount++
                        state.initialarray[Math.floor(cellid/10) - 1][cellid%10 - 1][3] = 1
                        if(state.requiredcorrect == correctcount + 1)
                            state.issolved = 1
                    }
                }
                else{
                    if(flag == 1){
                        state.correctcount--
                        state.initialarray[Math.floor(cellid/10) - 1][cellid%10 - 1][3] = 0
                    }
                }
            }
        },

        countincrement(state,action){
            const {sign} = action.payload;
            if(state.correctcount + sign ==state.requiredcorrect)
                state.issolved = 1;
            state.correctcount += sign;
            return state;
        }

    }
});


export default boardSlice.reducer; //export the reducers
export const {highlighter, inputnumsetter, countincrement, updateobject,initiate} = boardSlice.actions; //export the action creators