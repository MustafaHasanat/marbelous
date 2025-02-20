/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Dispatch, useMemo } from "react";
import { LocaleNode, useTreeNode } from "./useTreeNode";
import { Grid2x2Plus, Languages, Trash2 } from "lucide-react";
import { createRoot } from "react-dom/client";

interface Params {
    type: "node" | "leaf";
    fieldPath: string;
    identifier: string | null;
    node: LocaleNode;
    setIsExist: Dispatch<React.SetStateAction<boolean>>;
}

const NodeControls = React.memo(({ type, fieldPath, identifier, node, setIsExist }: Params) => {
    const isDeletable = useMemo(() => {
        return typeof node === "object";
    }, [node]);

    const { TreeNode } = useTreeNode({
        node: {},
        identifier: "x123",
        path: fieldPath?.split("."),
        locales: ["en", "ar"],
    });

    const handleDelete = () => {
        setIsExist(false);

        const element = document.getElementById(fieldPath);
        element && element?.remove();
    };

    const handleAddParent = () => {
        const targetElement = document.getElementById(fieldPath);
        if (!targetElement) return;

        const container = document.createElement("div");
        container.setAttribute("id", [fieldPath, "x123"].join("."));
        targetElement.appendChild(container);

        const root = createRoot(container);
        root.render(TreeNode);
    };

    if (!identifier) return;

    return (
        <>
            {type === "node" && (
                <>
                    {isDeletable && (
                        <Trash2
                            size={15}
                            color="crimson"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s ease",
                            }}
                            onClick={handleDelete}
                        />
                    )}

                    <Languages
                        size={15}
                        color="indigo"
                        style={{
                            cursor: "pointer",
                            transition: "0.3s ease",
                        }}
                    />

                    <Grid2x2Plus
                        size={15}
                        color="green"
                        style={{
                            cursor: "pointer",
                            transition: "0.3s ease",
                        }}
                        onClick={handleAddParent}
                    />
                </>
            )}

            <p className="text-[12px] opacity-60 hover:opacity-100">{fieldPath}</p>
        </>
    );
});

export default NodeControls;
