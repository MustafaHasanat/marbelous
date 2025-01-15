declare module "auth" {
    interface LoginReturns {
        token: string;
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            phone_number?: string | null;
        };
    }
}
