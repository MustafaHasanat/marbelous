/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState } from "react";
import React from "react";
import NodeElement from "./NodeElement";

export type LocaleNode =
    | string
    | {
          [key: string]: string | LocaleNode;
      };

interface Props {
    node: LocaleNode;
    identifier: string | null;
    path: string[];
    locales: string[];
}

export const useTreeNode = ({
    node,
    identifier = null,
    path,
    locales,
}: Props): {
    TreeNode: JSX.Element;
    subTree: LocaleNode;
} => {
    const [isExist, setIsExist] = useState<boolean>(true);
    const [value, setValue] = useState(
        identifier !== null
            ? typeof node === "object"
                ? identifier // Key for object nodes
                : typeof node === "string"
                ? node // Value for leaf nodes
                : ""
            : "root",
    );

    const currentPath = [...path, ...(identifier ? [identifier] : [])];
    const fieldPath = currentPath.join(".");
    const localSubTree: LocaleNode = {};
    const localTreeNodes: ReactNode[] = [];

    if (typeof node === "object") {
        Object.entries(node).map(([subIdentifier, subNode]) => {
            const { subTree, TreeNode } = useTreeNode({
                identifier: subIdentifier,
                node: subNode,
                path: currentPath,
                locales,
            });

            if (typeof subTree === "object" && subTree !== null) {
                Object.assign(localSubTree, subTree);
            } else {
                localSubTree[subIdentifier] = subTree;
            }
            localTreeNodes.push(TreeNode);
        });
    }

    return {
        TreeNode: (
            <NodeElement
                type={typeof node === "object" ? "node" : "leaf"}
                localTreeNodes={localTreeNodes}
                fieldPath={fieldPath}
                identifier={identifier}
                node={node}
                setIsExist={setIsExist}
                setValue={setValue}
                value={value}
            />
        ),
        subTree: typeof node === "object" ? (isExist ? { [value]: localSubTree } : {}) : value,
    };
};
