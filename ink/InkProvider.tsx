/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { InkContext } from "./ink-context";
import { getBottleData } from "./helpers/getBottleData";
import {
    BottleType,
    InkConfig,
    InkContextState,
    InkMode,
    InkProviderComponents,
} from "./types";
import { useRunOnce } from "@/lib/hooks";

interface Props {
    children: ReactNode;
    config: InkConfig;
    components: InkProviderComponents;
}

export const InkProvider = ({ children, config, components }: Props) => {
    const [bottle, setBottle] = useState<BottleType>({});
    const [mode, setMode] = useState<InkMode>("view");
    const [currentComponentKey, setCurrentComponentKey] = useState<string | null>(null);

    const getBottle = useCallback(async () => {
        const bottle = await getBottleData({ config });

        if (bottle) {
            setBottle(bottle);
        }
    }, [config]);

    useRunOnce({
        fn: getBottle,
    });

    const inkProvider: InkContextState = useMemo(
        () => ({
            bottle,
            components,
            locale: config?.locale,
            mode,
            currentComponentKey,
            getBottle,
            setMode,
            setCurrentComponentKey,
        }),
        [
            bottle,
            components,
            config?.locale,
            mode,
            currentComponentKey,
            getBottle,
            setMode,
            setCurrentComponentKey,
        ],
    );

    return <InkContext.Provider value={inkProvider}>{children}</InkContext.Provider>;
};
