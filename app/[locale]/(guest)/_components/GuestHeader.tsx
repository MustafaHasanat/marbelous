"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import React from "react";
import Logo from "@/public/images/marbelous-logo.png";
import Image from "next/image";
import { LanguageButton, MakeOrderButton, SharedText } from "@/components";
import { useLocale, useSuperRouter, useWindowSize } from "@/lib/hooks";
import { Routs } from "@/lib/enums";

const GuestHeader = React.memo(() => {
    const { t } = useLocale();
    const { currentScreen } = useWindowSize();
    const { navigate } = useSuperRouter();

    return (
        <Navbar
            isBordered
            classNames={{
                base: "w-full h-[70px] flex items-center overflow-hidden py-2 bg-white",
                wrapper: "!max-w-full",
            }}
        >
            <NavbarBrand
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() =>
                    navigate({
                        href: Routs.HOME,
                    })
                }
            >
                <Image
                    src={Logo}
                    alt="logo"
                    className="w-[50px] h-[50px]"
                    width={100}
                    height={100}
                />

                {currentScreen !== "mobile" && (
                    <SharedText className="text-[24px] font-bold">
                        {t.guest.header.brandName}
                    </SharedText>
                )}
            </NavbarBrand>

            <NavbarContent className="flex items-center gap-3" justify="end">
                <LanguageButton />

                <NavbarItem>
                    <MakeOrderButton />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
});

export default GuestHeader;
