"use client";

import { cn } from "@nextui-org/theme";
import { ReactNode } from "react";
import { Routs } from "@/lib/enums";
import { useSuperRouter } from "@/lib/hooks";
import { SharedText } from "./SharedText";
import React from "react";
import { SuperNavigatorType } from "@/lib/hooks/helpers/useSuperRouter";

interface Props {
    href: Routs;
    navigatorProps?: Partial<SuperNavigatorType>;
    className?: string;
    children?: ReactNode;
    variant?: "h1" | "h2" | "h3" | "p" | "span";
}

export const TextButtonLink: React.FC<Props> = ({
    href,
    className = "",
    variant = "p",
    children,
    navigatorProps,
    ...rest
}) => {
    const { navigate } = useSuperRouter();

    const handleClick = () => {
        navigate({ href, ...navigatorProps });
    };

    return (
        <SharedText
            className={cn("cursor-pointer hover:underline", className)}
            onClick={handleClick}
            variant={variant}
            {...rest}
        >
            {children}
        </SharedText>
    );
};
