/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { InkConfig } from "../types";

interface Props {
    config: InkConfig;
    axiosConfig?: AxiosRequestConfig<any>;
}

export async function getBottleData({ config, axiosConfig }: Props) {
    try {
        return {
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

        const response = await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: `${config.backendUrl}${config.endpoints.getOne}`,
            ...axiosConfig,
        });

        if (!response?.data || response?.status !== 200) return null;

        return JSON.parse(response?.data?.string_normal as string);
    } catch (error) {
        console.error(error as string);
        return null;
    }
}
