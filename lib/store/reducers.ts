/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { appSlice } from "./app-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

const appPersistConfig = {
    key: "app",
    storage,
    whitelist: [],
};

const appPersistReducer = persistReducer(appPersistConfig, appSlice.reducer);

const reducers = combineReducers({
    app: appPersistReducer,
});

export default reducers;
