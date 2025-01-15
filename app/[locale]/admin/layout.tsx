"use server";

import React from "react";
import { AdminGuard } from "@/components/guards";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <AdminGuard>{children}</AdminGuard>;
}
