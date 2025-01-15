"use client";

import { cn } from "@nextui-org/theme";
import React, { CSSProperties } from "react";

interface Props {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "p" | "span";
    className?: string;
    styles?: CSSProperties;
}

export const SharedText: React.FC<React.HTMLAttributes<HTMLParagraphElement> & Props> = ({
    children,
    className = "",
    styles = {},
    variant = "p",
    ...rest
}: Props) => {
    if (variant === "h1")
        return (
            <h1
                className={cn(`${className}`, "text-[60px] font-bold capitalize")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h1>
        );

    if (variant === "h2")
        return (
            <h2
                className={cn(`${className}`, "text-[40px] font-bold capitalize")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h2>
        );

    if (variant === "h3")
        return (
            <h3
                className={cn(`${className}`, "text-[30px] font-bold capitalize")}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </h3>
        );

    if (variant === "span")
        return (
            <span
                className={`${className}`}
                style={{
                    ...styles,
                }}
                {...rest}
            >
                {children}
            </span>
        );

    return (
        <p
            className={`${className}`}
            style={{
                ...styles,
            }}
            {...rest}
        >
            {children}
        </p>
    );
};
