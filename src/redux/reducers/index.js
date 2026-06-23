import { combineReducers } from "@reduxjs/toolkit";

import todos from "./todos.js"

const reducer = combineReducers({
    todos
})

export default reducer;
