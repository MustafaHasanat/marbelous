"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: ReactNode;
    portalNode: string;
}

export const Portal: React.FC<Props> = React.memo(({ children, portalNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const portalElement = document.getElementById(portalNode);

    if (!portalElement) return null;

    return createPortal(children, portalElement);
});
