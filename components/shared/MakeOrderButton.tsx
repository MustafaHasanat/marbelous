/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { FC } from "react";
import { useLocale, useWindowSize } from "@/lib/hooks";
import { Button, ButtonProps, cn } from "@heroui/react";
import { ShoppingCart } from "lucide-react";

interface Props {
    className?: string;
    isIconOnly?: boolean;
}

export const MakeOrderButton: FC<Props & ButtonProps> = ({
    className,
    isIconOnly = true,
    ...rest
}) => {
    const { t } = useLocale();
    const { currentScreen } = useWindowSize();

    const initialMessage = "مرحبا, حاب استفسر عن خدمة ماربيلوس و اطلب تصميم معين"

    const openWhatsApp = () => {
        const url = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${initialMessage}`;
        window.open(url, "_blank");
    };

    return (
        <Button
            color="primary"
            className={cn("font-bold", className)}
            isIconOnly={currentScreen === "mobile" && isIconOnly}
            endContent={<ShoppingCart className="w-[18px] aspect-square" />}
            onPress={openWhatsApp}
            {...rest}
        >
            {(currentScreen !== "mobile" || !isIconOnly) && t.guest.header.makeOrder}
        </Button>
    );
};
