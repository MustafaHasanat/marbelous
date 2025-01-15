import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const HomePage = dynamic(() => import("@/app/[locale]/(guest)/_components/HomePage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <HomePage />;
}
