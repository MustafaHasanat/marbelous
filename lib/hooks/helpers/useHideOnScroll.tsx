"use client";

import { useState, useEffect } from "react";

export const useHideOnScroll = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setIsHidden(true); // Hide by moving up
        } else {
            setIsHidden(false); // Show by moving back to initial state
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY]);

    return { isHidden };
};
