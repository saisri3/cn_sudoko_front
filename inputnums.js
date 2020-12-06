import React from 'react'
import Inputnumsstyles from "./inputnums.module.scss";
import {useSelector, useDispatch} from "react-redux"
import {inputnumsetter} from "../board/boardSlice";

export default function Inputnums() {

    const dispatch = useDispatch();

    const handleclick = (e) => {
        const value = e.target.innerHTML;
        // window.io.emit("inputnum", value);
        dispatch(inputnumsetter(value))
        // window.io.emit("check", value );
    }
    var nums = [];
    for(var i=1;i<10;i++)
        nums.push(<div key={i} className={Inputnumsstyles.onenum} onClick={handleclick}>{i}</div>)
    return (
        <div className={Inputnumsstyles.allnums} >
            {nums}
        </div>
    )
}
