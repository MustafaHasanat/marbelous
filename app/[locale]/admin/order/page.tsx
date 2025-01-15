import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const OrderDetailsPage = dynamic(() => import("@/app/[locale]/admin/_components/OrderDetailsPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <OrderDetailsPage />;
}
