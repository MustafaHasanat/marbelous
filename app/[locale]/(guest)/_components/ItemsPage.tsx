"use client";

import { ItemsListing } from "@/components";
import React from "react";

const ItemsPage = React.memo(() => {
    return (
        <div className="w-full p-10">
            <ItemsListing />
        </div>
    );
});

export default ItemsPage;
