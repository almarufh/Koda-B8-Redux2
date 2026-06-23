import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage"

import todos from "./todos.js"

const persistConfigTodos = {
    key: "data",
    storage

};

const reducer = combineReducers({
    todos: persistReducer(persistConfigTodos, todos)
})

export default reducer;
