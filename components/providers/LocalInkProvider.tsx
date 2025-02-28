"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginPage from "@/app/[locale]/(auth)/_components/LoginPage";
import RegisterPage from "@/app/[locale]/(auth)/_components/RegisterPage";
import { useLocale } from "@/lib/hooks";
import { InkProvider, InkProviderComponents } from "@kaiserleap/ink/react-ink";

const LocalInkProvider = ({ children }: { children: JSX.Element }) => {
    const { locale } = useLocale();

    const axiosConfig = {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYzYxN2VmYi1lNDY0LTRmY2EtYTZhMy1mOGFiZTY1NzJiNTAiLCJ1cGRhdGVkQXQiOiIyMDI1LTAyLTI4VDE3OjU3OjE2LjM5MVoiLCJjcmVhdGVkQXQiOiIyMDI1LTAyLTI4VDE3OjU3OjE2LjM5MVoiLCJ1c2VybmFtZSI6Im11c3RhZmE5OSIsImVtYWlsIjoibXVzdGFmYUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImZpcnN0TmFtZSI6Ik11c3RhZmEiLCJsYXN0TmFtZSI6IkFsaGFzYW5hdCIsImlhdCI6MTc0MDc2NTQ1NiwiZXhwIjoxNzQwODUxODU2fQ.WHyCZi3IeYuO0vNqS8GGLWYi8PJp77kYorVKeobKOr0",
        },
    };

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
                backendUrl: "https://mass-dorette-kaiser-leap-4e5c4911.koyeb.app/",
                locales: ["en", "ar"],
                currentLocale: locale,
                getConfig: {
                    endpoint: "ink/ecb78227-43f6-4f7a-9d30-9b080f86f126",
                    responsePathToBottle: ["payload", "trans"],
                    axiosConfig,
                },
                updateConfig: {
                    endpoint: "ink/ecb78227-43f6-4f7a-9d30-9b080f86f126",
                    responsePathToBottle: ["payload", "newRecord", "trans"],
                    preferredMethod: "patch",
                    requestFormDataKey: "trans",
                    axiosConfig,
                },
                credentials: {
                    email: "example@gmail.com",
                    pass: "XXXXXXX",
                },
            }}
            components={components}
        >
            {children}
        </InkProvider>
    );
};

export default LocalInkProvider;
