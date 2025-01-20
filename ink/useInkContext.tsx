import { useContext } from "react";
import { InkContextState } from "./types";
import { InkContext } from "./ink-context";

export function useInkContext(): InkContextState {
    const context = useContext(InkContext);

    if (!context) {
        throw new Error("useInkContext must be used within 'InkProvider'");
    }

    return context;
}
