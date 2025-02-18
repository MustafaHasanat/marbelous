/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, ReactNode, SetStateAction } from "react";

export type BottleType = { [key: string]: any };
export type BottleDropType = { en: string; ar: string };
export type InkMode = "view" | "edit";

export type InkProviderComponents = {
    [componentName: string]: {
        label: string;
        node: ReactNode;
    };
};

export type InkContextState = {
    bottle: BottleType;
    components: InkProviderComponents;
    currentComponentKey: string | null;
    locale?: string;
    mode: InkMode;
    getBottle: () => Promise<void>;
    setMode: Dispatch<SetStateAction<InkMode>>;
    setCurrentComponentKey: Dispatch<SetStateAction<string | null>>;
};

export type InkConfig = {
    backendUrl: string;
    locale: string;
    endpoints: {
        getOne: string;
        create: string;
        update: string;
        delete: string;
    };
};
