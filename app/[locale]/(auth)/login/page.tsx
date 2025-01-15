import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const LoginPage = dynamic(() => import("@/app/[locale]/(auth)/_components/LoginPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <LoginPage />;
}
