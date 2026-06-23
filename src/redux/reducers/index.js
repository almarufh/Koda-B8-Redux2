import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";

import todos from "./todos.js";

const persistConfig = {
    key: "data",
    storage
};

const rootReducer = combineReducers({
    todos: todos
});

const reducer = persistReducer(persistConfig, rootReducer);

export default reducer;