"use server";

import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const GuestHeader = dynamic(() => import("@/app/[locale]/(guest)/_components/GuestHeader"), {
    loading: () => <LoadingSpinner />,
});

const GuestFooter = dynamic(() => import("@/app/[locale]/(guest)/_components/GuestFooter"), {
    loading: () => <LoadingSpinner />,
});

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full justify-between">
            <GuestHeader />
            <main className="w-full min-h-[90vh]">{children}</main>
            <GuestFooter />
        </div>
    );
}
