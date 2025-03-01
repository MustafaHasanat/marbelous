import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const ItemDetailsPage = dynamic(() => import("@/app/[locale]/(guest)/_components/ItemDetailsPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <ItemDetailsPage />;
}
