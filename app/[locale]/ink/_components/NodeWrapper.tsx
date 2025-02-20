"use client";

import React, { ReactNode } from "react";

interface Params {
    id: string;
    children: ReactNode;
}

const NodeWrapper = React.memo(({ id, children }: Params) => {
    return (
        <div id={id} className="flex flex-col gap-3 ml-4 pl-4">
            {children}
        </div>
    );
});

export default NodeWrapper;
