"use client"; // Error boundaries must be Client Components

import { SharedImage, SharedText } from "@/components";
import Logo from "@/public/icons/logo.png";
import { useLocale, useSuperRouter } from "@/lib/hooks";
import { Routs } from "@/lib/enums";
import { Button, Divider } from "@heroui/react";
import React from "react";

export default function NotFoundPage() {
    const { t } = useLocale();
    const { navigate } = useSuperRouter();

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-7 p-10 overflow-hidden">
            <SharedImage src={Logo} alt="logo" width={500} height={300} />

            <SharedText className="text-center w-[400px] text-[30px] font-bold">
                {t.global.default}
            </SharedText>

            <Divider className="w-[400px]" />

            <div className="grid grid-cols-2 w-[300px] gap-5">
                <Button
                    color="primary"
                    onPress={() =>
                        navigate({
                            href: Routs.HOME,
                        })
                    }
                >
                    {t.global.buttons.goToHome}
                </Button>

                <Button
                    color="primary"
                    onPress={() =>
                        navigate({
                            href: Routs.LOGIN,
                        })
                    }
                >
                    {t.global.buttons.goToLogin}
                </Button>
            </div>
        </div>
    );
}
