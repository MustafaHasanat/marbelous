import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const OrdersListingPage = dynamic(() => import("@/app/[locale]/admin/_components/OrdersListingPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <OrdersListingPage />;
}
