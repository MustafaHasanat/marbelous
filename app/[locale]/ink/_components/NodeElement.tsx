/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Dispatch, ReactNode, useId, useState } from "react";
import NodeWrapper from "./NodeWrapper";
import { Play } from "lucide-react";
import NodeInput from "./NodeInput";
import NodeControls from "./NodeControls";
import { LocaleNode } from "./useTreeNode";

interface Params {
    fieldPath: string;
    identifier: string | null;
    node: LocaleNode;
    value: string;
    type: "node" | "leaf";
    localTreeNodes: ReactNode[];
    setValue: Dispatch<React.SetStateAction<string>>;
    setIsExist: Dispatch<React.SetStateAction<boolean>>;
}

const NodeElement = ({
    fieldPath,
    identifier,
    node,
    type,
    setValue,
    localTreeNodes,
    setIsExist,
    value,
}: Params) => {
    const uniqueId = useId();
    const [isOpen, setIsOpen] = useState<boolean>(type === "node");

    return (
        <NodeWrapper key={uniqueId} id={fieldPath}>
            <div
                className={
                    type === "node"
                        ? "flex items-center gap-2"
                        : "flex items-center gap-1 ml-4 pl-4"
                }
            >
                {type === "node" ? (
                    <>
                        <Play
                            size={15}
                            fill="lightGray"
                            onClick={() => setIsOpen((prev) => !prev)}
                            style={{
                                cursor: "pointer",
                                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                                transition: "0.3s ease",
                            }}
                        />

                        {identifier ? (
                            <>
                                <NodeInput setValue={setValue} value={value} />

                                <NodeControls
                                    type={type}
                                    fieldPath={fieldPath}
                                    identifier={identifier}
                                    node={node}
                                    setIsExist={setIsExist}
                                />
                            </>
                        ) : (
                            <p className="font-bold">Root</p>
                        )}
                    </>
                ) : (
                    <>
                        <label className="font-bold w-6">
                            {identifier?.charAt(0)?.toUpperCase()}
                            {identifier?.slice(1)}
                        </label>

                        <NodeInput setValue={setValue} value={value} />

                        <NodeControls
                            type="leaf"
                            fieldPath={fieldPath}
                            identifier={identifier}
                            setIsExist={setIsExist}
                            node={node}
                        />
                    </>
                )}
            </div>

            {isOpen && <>{localTreeNodes?.map((Node) => Node)}</>}
        </NodeWrapper>
    );
};

export default NodeElement;
