/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { NextUIProvider } from "@nextui-org/react";
import TanStackProvider from "./TanStackProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ReduxProvider from "./ReduxProvider";
import { Session } from "next-auth";
import { useUserAgent } from "@/lib/hooks";

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
        <NextUIProvider>
            <ReduxProvider>
                <SessionProvider>
                    <TanStackProvider>
                        <Toaster richColors closeButton />
                        {children}
                    </TanStackProvider>
                </SessionProvider>
            </ReduxProvider>
        </NextUIProvider>
    );
}
