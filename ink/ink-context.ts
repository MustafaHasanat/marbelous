/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { InkContextState } from "./types";

export const InkContext = createContext<InkContextState>({
    bottle: {},
    locale: "en",
    getBottle: async () => {},
});

