/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormik } from "formik";
import React from "react";
import TreeNode from "./TreeNode";

export type LocaleNode = {
    [key: string]: string | LocaleNode;
};

const TreeEditor = () => {
    const objectData = {
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
    };

    const onSubmit = (data: LocaleNode) => {
        console.log("Updated Data:", data);
    };

    const formik = useFormik({
        initialValues: objectData,
        onSubmit: (values) => onSubmit(values),
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-4">
            <TreeNode
                node={objectData}
                path={[]}
                identifier={null}
                formik={{ values: formik?.values, handleChange: formik?.handleChange }}
            />

            <button type="submit" className="mt-4 bg-blue-500 text-black p-2 rounded">
                Save
            </button>
        </form>
    );
};

export default TreeEditor;
