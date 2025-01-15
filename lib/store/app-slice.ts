import { createSlice } from "@reduxjs/toolkit";
import { StorePayload } from "store";

export interface InitialAppStateProps {
    guestDrawerIsOpen: boolean;
}

const initialState: InitialAppStateProps = {
    guestDrawerIsOpen: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setGuestDrawerIsOpen: (
            state: InitialAppStateProps,
            { payload: { guestDrawerIsOpen } }: StorePayload<InitialAppStateProps>,
        ) => {
            state.guestDrawerIsOpen = guestDrawerIsOpen;
        },
        toggleGuestDrawerIsOpen: (state: InitialAppStateProps) => {
            state.guestDrawerIsOpen = !state.guestDrawerIsOpen;
        },
    },
});

export const { setGuestDrawerIsOpen, toggleGuestDrawerIsOpen } = appSlice.actions;

export const selectApp = (state: { app: InitialAppStateProps }) => state.app;
