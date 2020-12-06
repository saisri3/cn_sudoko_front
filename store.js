import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import resultReducer from "../features/board/resultReducer";
import gamesReducer from "../features/gamecontrols/gamesSlice"

export default configureStore({
  reducer: {
    board: boardReducer,
    result : resultReducer,
    games : gamesReducer
  },
});
