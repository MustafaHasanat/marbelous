/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { ReactNode, useCallback } from "react";
import { useInkContext } from "./useInkContext";
import { getBottleDrop } from "./helpers/getBottleDrop";

export function useInk() {
    const { bottle, locale, mode } = useInkContext();
    // const [value, setValue] = useState<string>("");

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.target.value);
    // };

    const ink = useCallback(
        (chain: string): ReactNode => {
            const drop: any = getBottleDrop(bottle, chain);

            if (!drop || !locale) return "";

            const fieldValue = drop[locale] as string;

            // if (mode === "view") return <span id={chain}>{fieldValue}</span>;
            return <span id={chain}>{fieldValue}</span>;

            // if (mode === "edit")
            //     return <input type="text" className="text-black" defaultValue={fieldValue} />;

            // return null;
        },
        [bottle, locale],
    );

    return { ink };
}
