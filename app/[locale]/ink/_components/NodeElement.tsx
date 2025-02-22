/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Dispatch, ReactNode, useId, useState } from "react";
import NodeWrapper from "./NodeWrapper";
import { Play } from "lucide-react";
import NodeInput from "./NodeInput";
import NodeControls from "./NodeControls";
import { NodeActionProps } from "./TreeEditor";

interface Params {
    fieldPath: string;
    identifier: string | null;
    value: string;
    type: "node" | "leaf";
    localTreeNodes: ReactNode[];
    setValue: Dispatch<React.SetStateAction<string>>;
    setIsExist: Dispatch<React.SetStateAction<boolean>>;
    handleNodeAction: (props: NodeActionProps) => void;
}

const NodeElement = ({
    fieldPath,
    identifier,
    type,
    setValue,
    localTreeNodes,
    setIsExist,
    value,
    handleNodeAction,
}: Params) => {
    const uniqueId = useId();
    const [isOpen, setIsOpen] = useState<boolean>(type === "node");

    return (
        <NodeWrapper key={uniqueId} id={fieldPath}>
            <div className={"flex items-center gap-2"}>
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
                            <NodeInput setValue={setValue} value={value} />
                        ) : (
                            <p className="font-bold">Root</p>
                        )}

                        <NodeControls
                            type={type}
                            fieldPath={fieldPath}
                            identifier={identifier}
                            setIsExist={setIsExist}
                            handleNodeAction={handleNodeAction}
                        />
                    </>
                ) : (
                    <>
                        <label className="font-bold w-6">
                            {identifier?.charAt(0)?.toUpperCase()}
                            {identifier?.slice(1)}
                        </label>

                        <NodeInput setValue={setValue} value={value} />

                        <NodeControls
                            type={type}
                            fieldPath={fieldPath}
                            identifier={identifier}
                            setIsExist={setIsExist}
                            handleNodeAction={handleNodeAction}
                        />
                    </>
                )}
            </div>

            {isOpen && <>{localTreeNodes?.map((Node) => Node)}</>}
        </NodeWrapper>
    );
};

export default NodeElement;
