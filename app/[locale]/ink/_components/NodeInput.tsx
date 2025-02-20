/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Dispatch } from "react";

interface Params {
    value: string;
    setValue: Dispatch<React.SetStateAction<string>>;
}

const NodeInput = React.memo(({ value, setValue }: Params) => {
    return (
        <input
            type="text"
            className="border p-1 text-sm rounded-md"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
});

export default NodeInput;
