import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import langsReducer from "./langsReducer";

const rootReducer = combineReducers({
    data: dataReducer,
    langs: langsReducer
})

export default rootReducer
