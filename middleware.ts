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

    return matchLocale(languages, locales, i18n.defaultLocale);
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const hostname = request.headers.get("host");
    const isDevEnv = process.env.NODE_ENV === "development";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // **Exit early for API routes to prevent interference**
    if (pathname.indexOf("/api/") !== -1) {
        return NextResponse.next();
    }
    
    const parts = hostname ? hostname.split(".") : []; // e.g., 'subdomain' | none

    if (isDevEnv && (parts.length > 2 || parts.length === 0)) {
        return new Response("502 Bad Gateway", { status: 502 });
    }
    if (!isDevEnv && (parts.length > 3 || parts.length < 2)) {
        return new Response("502 Bad Gateway", { status: 502 });
    }

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
        response.headers.set("X-User-Agent", userAgent);

        return response;
    }

    const response = NextResponse.next();
    response.headers.set("X-User-Agent", userAgent);

    return response;
}

export const config = {
    matcher: ["/((?!api/|_next/static|_next/image|favicon.ico).*)"],
};
