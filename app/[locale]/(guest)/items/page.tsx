import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const ItemsPage = dynamic(() => import("@/app/[locale]/(guest)/_components/ItemsPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <ItemsPage />;
}
