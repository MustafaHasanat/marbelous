"use client";

import React from "react";
import { useTreeNode } from "./useTreeNode";

interface Params {
    subIdentifier;
    subNode;
    currentPath;
    locales;
    handleNodeAction;
}

const RecursionWrapper = React.memo(
    ({ currentPath, handleNodeAction, locales, subIdentifier, subNode }: Params) => {
        const { subTree, TreeNode } = useTreeNode({
            identifier: subIdentifier,
            node: subNode,
            path: currentPath,
            locales,
            handleNodeAction,
        });
    },
);

export default RecursionWrapper;
