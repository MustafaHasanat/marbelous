/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useCallback } from "react";
import { useInkContext } from "./useInkContext";
import { getBottleDrop } from "./helpers/getBottleDrop";

export function useInk() {
    const { bottle, locale } = useInkContext();

    const ink = useCallback(
        (chain: string) => {
            const drop: any = getBottleDrop(bottle, chain);

            if (!drop || !locale) return "";

            return <span id={chain}>{drop[locale] as string}</span>;
        },
        [bottle, locale],
    );

    return { ink };
}
