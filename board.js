


import React , {useState, useEffect} from 'react'
import Cell from "./cell";
import Boardstyles from "./board.module.scss"  //'scss module', not a normal scss file. Learn difference between scss/css file and scss/css module in react
import {useSelector,useDispatch} from "react-redux"; //we need these two hooks to use Redux inside react components

export default function Board() {

    
    const initialarray = useSelector(state => state.board.initialarray) //selecting data from redux store
    const clientid = useSelector(state=> state.board.clientid)


    useEffect(() => {
            window.io.emit("initiateme"); //Emit event to get the initial object from server
    },[]) // the [] will make sure this hook will run exactly once that is after the component mounts
    

    var allcells = [], key=0;
    for(var i=1;i<10;i++)
        for(var j=1;j<10;j++){
        var borderinfo = {
            right : 0,
            bottom : 0
        };
        if(i==3 || i==6) //this logic is used to create borders for all the nine 3x3 squares
             borderinfo.bottom = 1; //cells which has 3 or 6 as index values should have right/bottom border
        if(j==3 || j==6)    
            borderinfo.right = 1;
        allcells.push(<Cell cellinfo = {initialarray[i-1][j-1]} borderinfo={borderinfo} key={key++} i={i} j={j} />); //list rendering in React
    }

    

    return (
        //learn about css/scss modules and how to use them in react
        <div className={Boardstyles.board} >
            {allcells} 
        </div>
        // learn about list rendering in react
    )
}
