/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeroUIProvider } from "@heroui/react";
import TanStackProvider from "./TanStackProvider";
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
        <HeroUIProvider>
            <ReduxProvider>
                <TanStackProvider>
                    <Toaster richColors closeButton />
                    {children}
                </TanStackProvider>
            </ReduxProvider>
        </HeroUIProvider>
    );
}
