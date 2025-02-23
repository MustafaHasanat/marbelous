"use client";

import { Grid2x2Plus, Languages, Pencil, Play, Trash2 } from "lucide-react";
import { useId, useMemo, useState } from "react";
import React from "react";
import { NodeActionProps } from "./TreeEditor";
import { LocaleNode } from "./TreeEditor";

interface Props {
    identifier: string | null;
    handleNodeAction: (props: NodeActionProps) => void;
    node: LocaleNode;
    path: string[];
    locales: string[];
    isLocaleContainer: boolean;
}

const TreeNode = ({
    handleNodeAction,
    node,
    identifier = null,
    path,
    locales,
    isLocaleContainer,
}: Props) => {
    const uniqueId = useId();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [value, setValue] = useState(
        identifier !== null
            ? typeof node === "object"
                ? identifier // Key for object nodes
                : typeof node === "string"
                ? node // Value for leaf nodes
                : ""
            : "root",
    );

    const { currentPath, fieldPath } = useMemo(() => {
        const currentPath = [...path, ...(identifier ? [identifier] : [])];
        return {
            currentPath,
            fieldPath: currentPath.join("."),
        };
    }, [path, identifier]);

    return (
        <div key={uniqueId} id={fieldPath} className="flex flex-col gap-3 ml-8">
            <div className={"flex items-center gap-2"}>
                {typeof node === "object" ? (
                    <Play
                        size={15}
                        fill="lightGray"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="min-w-[13px] min-h-[13px]"
                        style={{
                            cursor: "pointer",
                            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "0.3s ease",
                        }}
                    />
                ) : (
                    <label className="font-bold w-6">
                        {identifier?.charAt(0)?.toUpperCase()}
                        {identifier?.slice(1)}
                    </label>
                )}

                {identifier ? (
                    <>
                        <input
                            type="text"
                            className="border p-1 text-sm rounded-md"
                            value={value}
                            readOnly
                            onChange={(e) => {
                                setValue(e.target.value);

                                handleNodeAction({
                                    path: fieldPath || "",
                                    action: "change",
                                    value: e.target.value,
                                });
                            }}
                        />

                        <Pencil
                            size={15}
                            color="blue"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s ease",
                            }}
                            className="min-w-[13px] min-h-[13px]"
                        />
                    </>
                ) : (
                    <p className="font-bold">Root</p>
                )}

                {typeof node === "object" && identifier && (
                    <>
                        <Trash2
                            size={15}
                            color="crimson"
                            className="min-w-[13px] min-h-[13px]"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s ease",
                            }}
                            onClick={() =>
                                handleNodeAction({
                                    path: fieldPath,
                                    action: "remove",
                                    value: value,
                                })
                            }
                        />

                        {!isLocaleContainer && Object.keys(node).length === 0 && (
                            <Languages
                                size={15}
                                color="indigo"
                                className="min-w-[13px] min-h-[13px]"
                                style={{
                                    cursor: "pointer",
                                    transition: "0.3s ease",
                                }}
                                onClick={() =>
                                    handleNodeAction({
                                        path: fieldPath,
                                        action: "append-leaf",
                                        value: value,
                                    })
                                }
                            />
                        )}
                    </>
                )}

                {typeof node === "object" && !isLocaleContainer && (
                    <Grid2x2Plus
                        size={15}
                        color="green"
                        className="min-w-[13px] min-h-[13px]"
                        style={{
                            cursor: "pointer",
                            transition: "0.3s ease",
                        }}
                        onClick={() =>
                            handleNodeAction({
                                path: fieldPath || "",
                                action: "append-node",
                                value: value,
                            })
                        }
                    />
                )}

                <p className="text-[12px] opacity-60 hover:opacity-100">{fieldPath}</p>
            </div>

            {isOpen &&
                typeof node === "object" &&
                Object.entries(node).map(([subIdentifier, subNode]) => {
                    const nodeKeys = Object.keys(subNode);
                    const isLocaleContainer: boolean =
                        nodeKeys.length === locales.length &&
                        nodeKeys.filter((key) => locales.includes(key?.toLowerCase())).length > 0;

                    return (
                        <TreeNode
                            key={subIdentifier}
                            identifier={subIdentifier}
                            node={subNode}
                            handleNodeAction={handleNodeAction}
                            locales={locales}
                            path={currentPath}
                            isLocaleContainer={isLocaleContainer}
                        />
                    );
                })}
        </div>
    );
};

export default TreeNode;
