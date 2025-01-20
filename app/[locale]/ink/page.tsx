import React from "react";
import { LoadingSpinner } from "@/components";
import dynamic from "next/dynamic";


const InkBrush = dynamic(() => import("@/ink/InkBrush"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <InkBrush />;
}
