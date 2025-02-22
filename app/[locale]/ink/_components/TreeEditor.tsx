/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FormEvent, useState } from "react";
import { useTreeNode } from "./useTreeNode";

export type NodeActionProps = { path: string; type: "node" | "leaf"; action: "append" | "remove" };

const TreeEditor = () => {
    const [objectData, setObjectData] = useState({
        auth: {
            login: {
                welcome: { en: "Welcome", ar: "مرحبا" },
                email: { en: "Email", ar: "البريد الإلكتروني" },
                pass: { en: "Password", ar: "كلمة المرور" },
                btn: { en: "Login", ar: "سجل الدخول" },
                new: { en: "Create new account", ar: "افتح حساب جديد" },
            },
            register: {
                welcome: { en: "Welcome", ar: "مرحبا" },
                name: { en: "Username", ar: "اسم المستخدم" },
                email: { en: "Email", ar: "البريد الإلكتروني" },
                pass: { en: "Password", ar: "كلمة المرور" },
                confirm: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
                btn: { en: "Register", ar: "تسجيل" },
                old: { en: "Login", ar: "سجل الدخول" },
            },
        },
    });

    const handleNodeAction = ({ path, type, action }: NodeActionProps) => {
        if (action === "remove") {
            setObjectData((preObj) => {
                const newObj = path.split(".").reduce((acc, curr) => {
                    if (curr && acc[curr]) return acc[curr];
                    return acc
                }, preObj as any);

                return newObj;
            });
        }
    };

    const { TreeNode, subTree } = useTreeNode({
        node: objectData,
        identifier: null,
        path: [],
        locales: ["en", "ar"],
        handleNodeAction,
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(typeof subTree === "object" && subTree["root"]);
    };

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-2 p-8 gap-6">
            <h1 className="text-2xl font-bold me-auto">Inter-localization Tree Editor</h1>

            <button
                type="submit"
                className="bg-primary text-white font-bold p-2 rounded-xl px-4 w-fit ms-auto"
            >
                Save Changes
            </button>

            <div className="w-full col-span-2 h-full max-h-[75vh] border px-2 py-5 rounded-xl">
                <div className="w-full col-span-2 h-full overflow-scroll">{TreeNode}</div>
            </div>
        </form>
    );
};

export default TreeEditor;
