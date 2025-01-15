"use server";

import React from "react";
import { AuthGuard } from "@/components/guards";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <AuthGuard>{children}</AuthGuard>;
        </div>
    );
}
