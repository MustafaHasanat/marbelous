import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/locales/i18n.config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const hostname = request.headers.get("host"); //* accord.com, subdomain.accord.com, localhost, subdomain.localhost,
    const isDevEnv = process.env.NODE_ENV === "development";
    const userAgent = request.headers.get("user-agent"); //* user-agent: what is the device opening the website

    const parts = hostname ? hostname.split(".") : []; // 'subdomain' | none

    if (isDevEnv && (parts.length > 2 || parts.length === 0))
        return new Response("502 Bad Gateway", { status: 502 });
    if (!isDevEnv && (parts.length > 3 || parts.length < 2))
        return new Response("502 Bad Gateway", { status: 502 });

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        const url = new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
            request.url,
        );

        const response = NextResponse.redirect(url);
        response.headers.set("X-User-Agent", userAgent || "unknown");

        return response;
    }

    const response = NextResponse.next();
    response.headers.set("X-User-Agent", userAgent || "unknown");

    return response;
}

export const config = {
    matcher: ["/((?!.*\\.|api|_next/static|_next/image|favicon.ico).*)"],
};
