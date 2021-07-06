import { combineReducers } from "redux";
import connectReducer from "./connectReducer";
import taskFormReducer from "./taskFormReducer";
import tasksReducer from "./tasksReducer";
import tokenReducer from "./tokenReducer";
import userLoginReducer from "./userLoginReducer";

const rootReducer = combineReducers ({
    tokenReducer: tokenReducer,
    userLoginReducer: userLoginReducer,
    tasksReducer: tasksReducer,
    connectReducer: connectReducer,
    taskFormReducer: taskFormReducer
})
export default rootReducer