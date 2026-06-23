import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers"
import persistStore from "redux-persist/es/persistStore";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export const persistor = persistStore(store)