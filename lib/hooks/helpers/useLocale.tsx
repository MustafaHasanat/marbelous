/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale } from "../../types";
import ar from "../../locales/ar";
import en from "../../locales/en";

const redirectedPathName = (locale: string, pathname: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
};

const getLocale = (pathname: string): Locale => {
    if (!pathname) return "en";
    const segments = pathname.split("/");
    return segments[1] as Locale;
};

const getDictLocales = (locale: Locale): typeof ar | typeof en => (locale === "ar" ? ar : en);

export function useLocale() {
    const pathName = usePathname();
    const router = useRouter();
    const dicts = getDictLocales(getLocale(pathName));
    const locale = getLocale(pathName);

    return {
        /** get the current locale */
        locale,
        /** toggle between AR and EN */
        toggleLocale: (locale?: Locale) => {
            const newPath = redirectedPathName(
                locale || (getLocale(pathName) === "en" ? "ar" : "en"),
                pathName,
            );

            router.push(newPath);
        },
        /** get the dictionaries for the current active locale */
        t: dicts,
    };
}
