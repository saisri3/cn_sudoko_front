import {createSlice} from "@reduxjs/toolkit"

const initial = {
    mistakes : [],
    issolved : 0,
    showmistake : 0,
    isavailable : 1
}

const resultSlice = createSlice({
    name : "result",
    initialState : initial,
    reducers: {
        mistakes : (state,action) => {
            state.mistakes = action.payload
        },
        showmistake: (state) => {
            state.showmistake++ 
            state.isavailable = 0
        },
        makeavailable : (state) => {
            state.isavailable = 1
        }
      
    }
})

export default resultSlice.reducer
export const {mistakes, showmistake, makeavailable} = resultSlice.actions