// * override the Session type in next-auth to extend its attributes

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        expires: string;
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            job_title?: string | null;
            is_staff?: boolean;
            image?: string | null;
            phone_number?: string | null;
            backendSubdomain?: string | null;
            tokens: {
                access?: string;
                refresh?: string;
            };
            exp?: number;
            iat?: number;
            jti?: string;
        };
    }
}
