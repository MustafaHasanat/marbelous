import LoginPage from "@/app/[locale]/(auth)/_components/LoginPage";
import RegisterPage from "@/app/[locale]/(auth)/_components/RegisterPage";
import { InkProvider } from "@/ink/InkProvider";
import { InkProviderComponents } from "@/ink/types";
import { BACKEND_BASE } from "@/lib/constants";
import { useLocale } from "@/lib/hooks";

const LocalInkProvider = ({ children }: { children: React.ReactNode }) => {
    const { locale } = useLocale();

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
                locale,
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
