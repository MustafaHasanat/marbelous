/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Dispatch } from "react";
import { Grid2x2Plus, Languages, Trash2 } from "lucide-react";
import { NodeActionProps } from "./TreeEditor";

interface Params {
    type: "node" | "leaf";
    fieldPath: string;
    identifier: string | null;
    setIsExist: Dispatch<React.SetStateAction<boolean>>;
    handleNodeAction: (props: NodeActionProps) => void;
}

const NodeControls = React.memo(
    ({ type, fieldPath, identifier, handleNodeAction }: Params) => {
        // const handleDelete = () => {
        //     setIsExist(false);

        //     const element = document.getElementById(fieldPath);
        //     element && element?.remove();
        // };

        return (
            <>
                {type === "node" && identifier && (
                    <>
                        <Trash2
                            size={15}
                            color="crimson"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s ease",
                            }}
                            onClick={() =>
                                handleNodeAction({
                                    path: fieldPath,
                                    type: "node",
                                    action: "remove",
                                })
                            }
                        />

                        <Languages
                            size={15}
                            color="indigo"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s ease",
                            }}
                            onClick={() =>
                                handleNodeAction({
                                    path: fieldPath,
                                    type: "leaf",
                                    action: "append",
                                })
                            }
                        />
                    </>
                )}

                {type === "node" && (
                    <Grid2x2Plus
                        size={15}
                        color="green"
                        style={{
                            cursor: "pointer",
                            transition: "0.3s ease",
                        }}
                        onClick={() =>
                            handleNodeAction({
                                path: fieldPath || "",
                                type: "node",
                                action: "append",
                            })
                        }
                    />
                )}

                <p className="text-[12px] opacity-60 hover:opacity-100">{fieldPath}</p>
            </>
        );
    },
);

export default NodeControls;
