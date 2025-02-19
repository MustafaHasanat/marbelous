"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginPage from "@/app/[locale]/(auth)/_components/LoginPage";
import RegisterPage from "@/app/[locale]/(auth)/_components/RegisterPage";
import { BACKEND_BASE } from "@/lib/constants";
import { InkProvider, InkProviderComponents } from "@kaiserleap/ink/react-ink";

const LocalInkProvider = ({ children }: { children: JSX.Element }) => {
    const components: InkProviderComponents = {
        loginPage: {
            label: "Login",
            node: <LoginPage />,
        },
        registerPage: {
            label: "Register",
            node: <RegisterPage />,
        },
    };

    return (
        <InkProvider
            config={{
                backendUrl: BACKEND_BASE,
                locales: ["en", "ar"],
                endpoints: {
                    getOne: "ink",
                    create: "",
                    update: "",
                    delete: "",
                },
            }}
            components={components}
        >
            {children}
        </InkProvider>
    );
};

export default LocalInkProvider;
