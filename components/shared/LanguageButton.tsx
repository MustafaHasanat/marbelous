/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React from "react";
import { useLocale } from "@/lib/hooks";
import { SharedText } from "./SharedText";
import { Button, cn } from "@heroui/react";

interface Props {
    className?: string;
}

export const LanguageButton = React.memo(({ className }: Props) => {
    const { locale, toggleLocale } = useLocale();

    return (
        <Button
            isIconOnly
            className={cn("p-0", className)}
            variant="bordered"
            color="primary"
            onPress={() => toggleLocale()}
            startContent={
                <SharedText className="w-full font-bold">{locale === "ar" ? "En" : "ع"}</SharedText>
            }
        />
    );
});

export default LanguageButton;
