/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeroUIProvider } from "@heroui/react";
import TanStackProvider from "./TanStackProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ReduxProvider from "./ReduxProvider";
import { Session } from "next-auth";
import { useUserAgent } from "@/lib/hooks";
import LocalInkProvider from "./LocalInkProvider";

export function Providers({
    children,
    userAgent,
}: {
    children: React.ReactNode;
    session: Session | null;
    userAgent: string | null;
}) {
    useUserAgent({ userAgent });

    return (
        <HeroUIProvider>
            <ReduxProvider>
                <SessionProvider>
                    <LocalInkProvider>
                        <TanStackProvider>
                            <Toaster richColors closeButton />
                            {children}
                        </TanStackProvider>
                    </LocalInkProvider>
                </SessionProvider>
            </ReduxProvider>
        </HeroUIProvider>
    );
}
