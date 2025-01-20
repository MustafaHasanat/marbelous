/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeroUIProvider } from "@heroui/react";
import TanStackProvider from "./TanStackProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ReduxProvider from "./ReduxProvider";
import { Session } from "next-auth";
import { useLocale, useUserAgent } from "@/lib/hooks";
import { InkProvider } from "@/ink/InkProvider";

export function Providers({
    children,
    userAgent,
}: {
    children: React.ReactNode;
    session: Session | null;
    userAgent: string | null;
}) {
    useUserAgent({ userAgent });
    const { locale } = useLocale();

    return (
        <HeroUIProvider>
            <ReduxProvider>
                <SessionProvider>
                    <TanStackProvider>
                        <InkProvider
                            config={{
                                backendUrl: "https://jsontest-59qpe.ondigitalocean.app/",
                                locale,
                                endpoints: {
                                    getOne: "trans/mymodels/4",
                                    create: "trans/mymodels/",
                                    update: "trans/mymodels/4",
                                    delete: "trans/mymodels/4",
                                },
                            }}
                        >
                            <Toaster richColors closeButton />
                            {children}
                        </InkProvider>
                    </TanStackProvider>
                </SessionProvider>
            </ReduxProvider>
        </HeroUIProvider>
    );
}
