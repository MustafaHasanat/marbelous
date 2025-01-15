/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/lib/hooks";
import { join } from "path";
import { useCallback, useMemo } from "react";
import { Routs } from "@/lib/enums";

const simpleRouts: Routs[] = [];

const publicRouts: Routs[] = [];

export type SuperNavigatorType = {
    href: string;
    replacements?: { [key: string]: string | number | null | undefined };
    params?: { [key: string]: string };
    isNewPage?: boolean;
    isFullPath?: boolean;
};

export function useSuperRouter() {
    const pathName = usePathname();
    const router = useRouter();
    const { locale } = useLocale();
    const searchParams = useSearchParams();

    const navigate = useCallback(
        ({
            href,
            replacements,
            params,
            isNewPage = false,
            isFullPath = false,
        }: SuperNavigatorType) => {
            let newHref: string = href;

            replacements &&
                Object.entries(replacements).forEach(([key, value]) => {
                    newHref = newHref.replace(key, (value || "").toString());
                });

            const convertedParams = params ? "?" + new URLSearchParams(params).toString() : "";

            newHref = `${newHref}${convertedParams}`;

            if (isNewPage) {
                window.open(newHref, "_blank");
            } else if (isFullPath) {
                window.location.href = newHref;
            } else {
                const localizedHref = "/" + join(locale, newHref);
                router.push(localizedHref);
            }
        },
        [locale, router],
    );

    const setSearchParam = useCallback(
        ({ key, value }: { key: string; value: string | number }) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(key, value?.toString());
            const newPath = `${window.location.pathname}?${params.toString()}`;
            router.push(newPath); // Updates the URL
        },
        [router, searchParams],
    );

    const currentRout: Routs = useMemo(() => {
        for (let index = 0; index < simpleRouts.length; index++) {
            const rout = simpleRouts[index];
            if (pathName.indexOf(rout) !== -1) return rout;
        }

        return Routs.HOME;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName, locale]);

    return {
        /** navigate with consideration of the locale */
        navigate,
        setSearchParam,
        /** get the current route from the enum object */
        currentRout,
        publicRouts,
    };
}
