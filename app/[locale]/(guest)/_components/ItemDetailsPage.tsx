"use client";

import { useParams } from "next/navigation";
import React from "react";

const ItemDetailsPage = React.memo(() => {
    const { id } = useParams();

    return <>ItemDetailsPage {id}</>;
});

export default ItemDetailsPage;
