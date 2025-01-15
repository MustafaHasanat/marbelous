"use client";

import { RefObject, useEffect, useRef, useState } from "react";

interface useBoxSizeReturns<RefElementType> {
    ref: RefObject<RefElementType>;
    width: number;
    height: number;
}

/**
 * This hook is used to get up-to-date values for the width and height
 * of a targeted component.
 *
 * Example:
 *
 * const { ref, width, height } = useBoxSize<HTMLDivElement>();
 *
 * <div ref={ref}>
 *     This is my width: {width}
 *     This is my height: {height}
 * </div>
 *
 * @returns {RefObject<RefElementType>} ref    A reference object to be given to the targeted component.
 * @returns {number}                   width   The width of the targeted component.
 * @returns {number}                   height  The height of the targeted component.
 */
export function useBoxSize<
    RefElementType extends HTMLElement,
>(): useBoxSizeReturns<RefElementType> {
    const boxRef = useRef<RefElementType>(null);
    const [boxSize, setBoxSize] = useState([0, 0]);

    useEffect(() => {
        const handleResize = () => {
            if (boxRef.current) {
                setBoxSize([boxRef.current.offsetWidth, boxRef.current.offsetHeight]);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { ref: boxRef, width: boxSize[0], height: boxSize[1] };
}
