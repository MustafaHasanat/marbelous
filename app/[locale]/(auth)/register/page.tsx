import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const RegisterPage = dynamic(() => import("@/app/[locale]/(auth)/_components/RegisterPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <RegisterPage />;
}
