/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Play } from "lucide-react";
import React, { useState } from "react";

export type LocaleNode =
    | string
    | {
          [key: string]: string | LocaleNode;
      };

interface Props {
    node: LocaleNode;
    identifier: string | null;
    path: string[];
    formik: { values: any; handleChange: any };
}

const TreeNode = ({ node, formik, path = [], identifier = null }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const currentPath = [...path, ...(identifier ? [identifier] : [])];
    const fieldName = currentPath.join(".");

    const getNode = () => {
        if (!identifier) return null;

        //* render the node that contains the key input
        if (typeof node === "object")
            return (
                <div className="flex items-center gap-2">
                    <Play
                        size={15}
                        fill="black"
                        onClick={() => setIsOpen((prev) => !prev)}
                        style={{
                            cursor: "pointer",
                            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "0.3s ease",
                        }}
                    />

                    <input
                        type="text"
                        className="border p-1 text-sm"
                        name={fieldName}
                        value={identifier}
                        //! onChange={}
                    />
                </div>
            );

        //* render the leaf that contains the language input
        if (typeof node === "string")
            return (
                <div className="flex items-center gap-1 ml-4 pl-4">
                    <label className="font-bold w-6">
                        {`${identifier?.charAt(0)?.toUpperCase()}${identifier?.slice(1)}`}
                    </label>
                    <input
                        type="text"
                        className="border p-1 text-sm"
                        name={fieldName}
                        value={(formik.values as any)[fieldName]}
                        defaultValue={node}
                        onChange={formik.handleChange}
                    />
                </div>
            );

        return null;
    };

    return (
        <div className="flex flex-col gap-3 ml-4 pl-4">
            {/* render the node */}
            {getNode()}

            {/* recursively render new nodes from the children of the current one */}
            {typeof node === "object" &&
                Object.entries(node).map(([subIdentifier, subNode], index) => (
                    <TreeNode
                        key={subIdentifier + index}
                        node={subNode}
                        path={currentPath}
                        formik={formik}
                        identifier={subIdentifier}
                    />
                ))}
        </div>
    );
};

export default TreeNode;
