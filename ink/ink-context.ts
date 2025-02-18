/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { InkContextState } from "./types";

export const InkContext = createContext<InkContextState>({
    bottle: {},
    components: {},
    locale: "en",
    mode: "view",
    currentComponentKey: null,
    setMode: async () => {},
    setCurrentComponentKey: async () => {},
    getBottle: async () => {},
});
