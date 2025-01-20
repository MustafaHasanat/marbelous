/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { InkContext } from "./ink-context";
import { getBottleData } from "./helpers/getBottleData";
import { BottleType, InkConfig } from "./types";
import { useRunOnce } from "@/lib/hooks";

interface Props {
    children: ReactNode;
    config: InkConfig;
}

export const InkProvider = ({ children, config }: Props) => {
    const [bottle, setBottle] = useState<BottleType>({});

    const getBottle = useCallback(async () => {
        const bottle = await getBottleData({ config });

        if (bottle) {
            setBottle(bottle);
        }
    }, [config]);

    useRunOnce({
        fn: getBottle,
    });

    const inkProvider = useMemo(
        () => ({
            bottle,
            locale: config?.locale,
            getBottle,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [bottle, setBottle, config],
    );

    return <InkContext.Provider value={inkProvider}>{children}</InkContext.Provider>;
};
