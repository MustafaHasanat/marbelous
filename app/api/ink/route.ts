/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = {
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

        return NextResponse.json(
            {
                data,
                error: null,
                status: true,
            },
            { status: 200 },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                data: [],
                error: error.message || "An unexpected error occurred.",
                status: false,
            },
            { status: 500 },
        );
    }
}
