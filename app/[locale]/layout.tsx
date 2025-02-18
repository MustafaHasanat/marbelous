/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { i18n } from "@/lib/locales/i18n.config";
import { Locale } from "@/lib/types";
import { Providers } from "@/components/providers/providers";
import "@/lib/styles/globals.css";
import { getServerSession } from "next-auth";
import { appMetadata } from "@/lib/constants";
import { headers } from "next/headers";
import { authOptions } from "@/lib/configs/auth-options";

/**
 * Setup te website metadata
 */
export const metadata: Metadata = appMetadata;

/**
 * Generate all the available locales in the server
 * before the client renders the pages
 */
export async function generateStaticParams() {
    return i18n.locales?.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    const session = await getServerSession(authOptions);
    const headersList = headers();

    return (
        <html lang={locale} className="light">
            <body
                style={{
                    direction: locale === "en" ? "ltr" : "rtl",
                }}
            >
                <Providers
                    session={session || null}
                    userAgent={headersList.get("user-agent") || null}
                >
                    {children}
                </Providers>
            </body>
        </html>
    );
}
