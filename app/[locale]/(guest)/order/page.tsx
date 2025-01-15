import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const OrderPage = dynamic(() => import("@/app/[locale]/(guest)/_components/OrderPage"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <OrderPage />;
}
