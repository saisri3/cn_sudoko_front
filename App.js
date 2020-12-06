import React from 'react';
import logo from './logo.svg';
import Board from "./features/board/board";
import Inputnums from "./features/gamecontrols/inputnums"
import Appstyles from "./appstyles.module.scss";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {makeavailable, showmistake} from "./features/board/resultReducer"
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import Header from "./features/header/header"
import Docs from "./features/header/docs.js"
import Instructions from "./features/header/instructions"
import Boardoverlay from "./features/board/boardoverlay"
import Roomoverlay from "./features/board/roomoverlay"
import Onlineusers from "./features/gamecontrols/onlineusers"
import Competitors from "./features/gamecontrols/competitors"
import Finishedplayers from "./features/gamecontrols/finishedplayers"
import { wait } from '@testing-library/react';



function App() {
  const dispatch = useDispatch()
  var waittime = 10000
  const handleclick = () => {
    setTimeout(makevisible, waittime)
    dispatch(showmistake())
  }
   const makevisible = () => {
     dispatch(makeavailable())
   }

  // const isgameon = useSelector(state => state.games.isgameon)
  const isinside = useSelector(state => state.games.isinside)
  const isavailable  = useSelector(state => state.result.isavailable)
  const isgameon = useSelector(state => state.games.isgameon)
  const issolved = useSelector(state => state.board.issolved); 

  useEffect(() => {
        if(issolved){
          window.io.emit("gamesolved");
        }
  }, [issolved] ); //useEffect hook 

  var boardoverlay, inputnumbers, roomoverlay
  var interval
  useEffect(() => {
    if(isavailable == 0)
      interval = setInterval(reducetime, 1000)
  })
  const reducetime = () => {
    var ele = document.getElementById("mistakebutton")
    var value = ele.innerHTML
    ele.innerHTML = --value 
    if(value == 1)
      clearInterval(interval)
  }

  if(isinside){
    //  boardoverlay = isgameon ? null : (<div className={Appstyles.overlay}>
    //         <Boardoverlay />
    //         </div> )
    inputnumbers = <div className={Appstyles.gamecontrol}>
          <Inputnums/>
  <button id="mistakebutton" class={isavailable ? null : Appstyles.disabledbutton} onClick={ isavailable ? handleclick : null} >{isavailable ? "Show Mistakes": waittime/1000 }</button>
          </div> 

  }
  else {
    roomoverlay = <div className={Appstyles.overlay}>
            <Roomoverlay />
            </div>
  }
  var competitors, finishedplayers
  if(isgameon){
    competitors = <Competitors/>
    finishedplayers = <Finishedplayers/>
  }
  return (
    <Router>
    <Header/>
    <Switch>
    <Route exact path="/">
    <div className={Appstyles.parentcontainer}>
        <div className={Appstyles.secondparent}>
          <div className={Appstyles.gamearea}>
          <div className={Appstyles.boardandoverlay}>
            {roomoverlay}
            <Board/>
          </div>
           <div className={Appstyles.gamecontrol}>
          {inputnumbers}
          </div>
          </div>
          <div className={Appstyles.sidediv}>
           {finishedplayers}
           {competitors}
          </div>
          <Instructions/>
        </div>
    </div>
      </Route>
      <Route path="/documentation">
        <Docs/>
      </Route>
     </Switch>
    </Router>
  );
}

export default App;


